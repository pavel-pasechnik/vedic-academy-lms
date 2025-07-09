source 'https://rubygems.org'

# Bundle edge Rails instead: gem "rails", github: "rails/rails", branch: "main"
gem 'rails', '~> 8.0.2'
# The modern asset pipeline for Rails [https://github.com/rails/propshaft]
gem 'propshaft'

gem 'pg'
# Use the Puma web server [https://github.com/puma/puma]
gem 'puma', '>= 5.0'

# Hotwire's SPA-like page accelerator [https://turbo.hotwired.dev]
gem 'turbo-rails'
# Hotwire's modest JavaScript framework [https://stimulus.hotwired.dev]
gem 'stimulus-rails'
# Build JSON APIs with ease [https://github.com/rails/jbuilder]
gem 'jbuilder'

# Use Active Model has_secure_password [https://guides.rubyonrails.org/active_model_basics.html#securepassword]
# gem "bcrypt", "~> 3.1.7"

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: %i[ windows jruby ]

# Use the database-backed adapters for Rails.cache, Active Job, and Action Cable
gem 'solid_cable'
gem 'solid_cache'
gem 'solid_queue'

# Reduces boot times through caching; required in config/boot.rb
gem 'bootsnap', require: false

# Deploy this application anywhere as a Docker container [https://kamal-deploy.org]
gem 'kamal', require: false

# Add HTTP asset caching/compression and X-Sendfile acceleration to Puma [https://github.com/basecamp/thruster/]
gem 'thruster', require: false

# Use Active Storage variants [https://guides.rubyonrails.org/active_storage_overview.html#transforming-images]
# gem "image_processing", "~> 1.2"

gem 'vite_rails'

gem 'devise'
gem 'devise-jwt'          # for JWT tokens
gem 'global_phone'          # add phone validation/normalization if desired
gem 'omniauth'            # Omniauth core
gem 'omniauth-facebook'      # Facebook OAuth2 example
gem 'omniauth-google-oauth2'  # Google OAuth2 example
gem 'pundit'                # if you plan to use access policies
gem 'recaptcha', require: 'recaptcha/rails'  # if you want captcha on the form

gem 'carrierwave'

gem 'paper_trail'

gem 'sidekiq'
gem 'sidekiq-scheduler'

# Debager
gem 'sentry-ruby'
gem 'stackprof'

gem 'simple_form'

# Technical documentation of the project
gem 'rswag'

group :development, :test do
  # See https://guides.rubyonrails.org/debugging_rails_applications.html#debugging-with-the-debug-gem
  gem 'debug', platforms: %i[ mri windows ], require: 'debug/prelude'

  # Static analysis for security vulnerabilities [https://brakemanscanner.org/]
  gem 'brakeman', require: false

  # Omakase Ruby styling [https://github.com/rails/rubocop-rails-omakase/]
  gem 'rubocop-rails-omakase'

  gem 'rspec-rails'

  gem 'bundler-audit'
  gem 'reek'
  gem 'rubycritic', require: false
end

group :development do
  # Use console on exceptions pages [https://github.com/rails/web-console]
  gem 'erb_lint', require: false
  gem 'rubocop', require: false
  gem 'rubocop-capybara'
  gem 'rubocop-erb', require: false
  gem 'rubocop-haml', require: false
  gem 'rubocop-packaging'
  gem 'rubocop-performance'
  gem 'rubocop-rails', require: false
  gem 'rubocop-rspec_rails'
  gem 'rubocop-shopify'
  gem 'rubocop-thread_safety'
  gem 'ruby-lsp'
  gem 'web-console'
  gem 'yard'
end

group :test do
  # Use system testing [https://guides.rubyonrails.org/testing.html#system-testing]
  gem 'capybara'
  gem 'selenium-webdriver'

  gem 'database_cleaner-active_record'
  gem 'factory_bot_rails'
  gem 'ffaker'

  gem 'coveralls', require: false
  gem 'simplecov', require: false

  gem 'fuubar'
  gem 'rspec-given'
  gem 'shoulda-matchers'

  gem 'kaminari'
end

gem 'haml_lint', '~> 0.62.0', group: :development
