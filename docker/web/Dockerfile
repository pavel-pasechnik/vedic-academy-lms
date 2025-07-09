# syntax=docker/dockerfile:1

################################################################################
# 1. Common Base Layer #
# Here we install Ruby, system dependencies, Bundler, customize ENV.  #
################################################################################

ARG RUBY_VERSION=3.4.2
FROM ruby:${RUBY_VERSION}-slim AS base


# Install system dependencies (common to any environment: dev/prod)
RUN apt-get update -qq && \
  apt-get install --no-install-recommends -y \
  gnupg \
  ca-certificates \
  git \
  curl \
  build-essential \
  libyaml-dev \
  pkg-config \
  libpq-dev \
  postgresql-client \
  libvips \
  netcat-openbsd && \
  curl -fsSL https://deb.nodesource.com/setup_lts.x | bash - && \
  apt-get install -y nodejs && \
  rm -rf /var/lib/apt/lists/*

RUN npm install -g npm@latest

#
# Create app directory and rails user
RUN mkdir -p /app && \
  groupadd --gid 1000 rails && \
  useradd --uid 1000 --gid 1000 --create-home --shell /bin/bash rails && \
  chown -R rails:rails /app && \
  chown -R rails:rails /usr/local/bundle

# Install the Bundler of the desired version
RUN gem install bundler -v "2.6.9"

# 1.2. Set the working directory. All subsequent COPY/RUNs are performed relative to /app
WORKDIR /app
# USER rails:rails

# 1.4. Customize Bundler: where to stack gems, how many threads, how to reinstall, etc.
ENV BUNDLE_PATH=/usr/local/bundle \
  BUNDLE_JOBS=4 \
  BUNDLE_RETRY=3

################################################################################
# 2. Stage to install the gems #
# Here we just copy the Gemfile/Gemfile.lock and do a `bundle install`.          #
# The result (/usr/local/bundle folder) will then be copied into the final stages. #
################################################################################

FROM base AS gems

# 2.1. Copy only Gemfile and Gemfile.lock (for Docker cache to work properly)
COPY Gemfile Gemfile.lock ./

# 2.2. By default, we skip the :development and :test groups - this is what we need for production builds.
# When building for the development target, we will override the BUNDLE_WITHOUT variable.
ENV BUNDLE_WITHOUT="development test"
RUN bundle install

################################################################################
# 3. Stage for assembling assemblies (production) #
# This stage is only needed for production.                                          #
# This is where the compiled Rails resources (bootsnap + assets) will go.               #
################################################################################

FROM gems AS assets

# 3.1. Copy all the application code (it will be needed for precompile-assets / bootsnap)
COPY . .

# Specify that this is a production environment (so that Rails takes the prod-config)
ENV RAILS_ENV=production

# 3.2. Pre-generate bootsnap (speeds up application loading)
RUN bundle exec bootsnap precompile app/ lib/

# 3.3. Compile Assets (Webpack/Vite => public/assets)
# If you are using Vite, make sure that the `bin/rails assets:precompile` command is set to run in production mode.
# to run Vite in production mode. If you are building via Webpacker, leave precompile as it is.
RUN SECRET_KEY_BASE=placeholder bundle exec rails assets:precompile

################################################################################
# 4. Final production image #
# - From this layer the final image will be fluffed into the production, it is minimal: #
# - Copy only the necessary gems #
# - Copy app to /app #
# - Copy public from assets #
# - User is unprivileged (rails:rails) #
################################################################################

FROM base AS production

# 4.1. Override BUNDLE_WITHOUT to use only production gems
ENV RAILS_ENV=production \
  BUNDLE_WITHOUT="development test"

# 4.2. Copy the gems installed at the gems stage
COPY --from=gems /usr/local/bundle /usr/local/bundle

# 4.3 Copy the entire application source (migrations, app/, config/ etc.)
COPY . .

# 4.4. Copy generated assemblies and bootsnap artifacts from the assets stage
COPY --from=assets /app/public /app/public
COPY --from=assets /app/tmp/cache /app/tmp/cache

# 4.5. Create unprivileged user rails (uid:1000, gid:1000) and give it permissions to /app
# (removed, created in base)

# USER 1000:1000
WORKDIR /app
# USER rails:rails

# 4.6. The port that the Puma will listen to (usually 3000 or 80)
EXPOSE 3000

# 4.7. Entry point: when starting the container we want to:
# 1) Wait for DB/Redis to start (if needed)
# 2) Perform migrations if you want (or leave it to CI)
# 3) Start Puma in production mode
#
# You can substitute your own entrypoint script (e.g. bin/docker-entrypoint),
# which does db:create/migrate, but the following is the most minimal option:
ENTRYPOINT ["bash", "-lc", "bundle exec rails db:create db:migrate && bundle exec puma -C config/puma.rb"]

################################################################################
# 5. Final image for development #
# Here we don't skip the development group, copy all the code "as is", #
# # install dev gems, run Webpacker/Vite in dev mode and Rails server. #
################################################################################

FROM base AS development

# 5.1. Put all gems, including :develop and :test.
ENV RAILS_ENV=development
ENV BUNDLE_WITHOUT=""

# 5.2. Copy Gemfile/Gemfile.lock, package.json/package-lock.json and install all
COPY --chown=rails:rails Gemfile Gemfile.lock ./
COPY --chown=rails:rails package.json package-lock.json ./

RUN bundle install && npm install

# 5.3. Copy all the application code (working on a "fresh" local file, which will most likely still be mounted):
COPY . .

ENV PATH="/app/bin:/usr/local/bundle/bin:${PATH}"

# USER 1000:1000
WORKDIR /app
# USER rails:rails

# 5.6. Open ports: 3000 for Rails and 5173 for Vite (if you are running Vite Dev Server)
EXPOSE 3000 3036 3037

# 5.7. Development entrypoint: wait for DB and Redis, migrate DB, start vite and puma
ENTRYPOINT ["bash", "-lc", "until nc -z db 5432; do echo 'Waiting for Postgres...'; sleep 1; done; until nc -z redis 6379; do echo 'Waiting for Redis...'; sleep 1; done; bundle exec rails db:create db:migrate db:seed; VITE_RUBY_HOST=0.0.0.0 bin/vite dev & bundle exec puma -C config/puma.rb"]
