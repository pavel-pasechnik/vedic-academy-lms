FROM postgres:17.5-alpine3.22

RUN apk add --no-cache libc6-compat
ENV LANG=uk_UA.UTF-8

COPY ./postgres_ua/postgresql.conf /etc/postgresql/postgresql.conf
