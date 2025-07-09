require 'swagger_helper'
require File.expand_path('../config/environment', __dir__) unless defined?(Rails)

RSpec.configure do |config|
  config.openapi_root = Rails.root.join('swagger').to_s

  config.openapi_specs = {
    'v1/swagger.yaml' => {
      openapi: '3.0.1',
      info: {
        title: 'Vedic Academy LMS API',
        version: 'v1',
        description: 'API для системы управления обучением Ведической Академии'
      },
      components: {
        securitySchemes: {
          Bearer: {
            type: :http,
            scheme: :bearer,
            bearerFormat: :JWT
          }
        }
      },
      security: [{ Bearer: [] }],
      servers: [
        {
          url: 'https://{defaultHost}',
          variables: {
            defaultHost: {
              default: 'api.yourdomain.com'
            }
          }
        },
        {
          url: 'http://localhost:3000',
          description: 'Local development server'
        }
      ]
    }
  }

  config.openapi_format = :yaml
end
