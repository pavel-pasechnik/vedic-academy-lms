ENV['RAILS_ENV'] = 'test'

def not_blank?(obj)
  # NOTE Rails is not loaded yet
  !obj.nil? && !obj.empty?
end

if not_blank?(ENV['CODECLIMATE_REPO_TOKEN'])
  require 'codeclimate-test-reporter'

  CodeClimate::TestReporter.start
elsif not_blank?(ENV['COVERAGE'])
  require 'simplecov'

  SimpleCov.start 'rails'
end

require 'spec_helper'
require File.expand_path('../../config/environment', __FILE__)
require 'rspec/rails'
require 'capybara/rails'
require 'capybara/rspec'
require 'open3'

ActiveRecord::Migration.maintain_test_schema!

Dir[Rails.root.join('spec/support/**/*.rb')].each { |f| require f }

puts "\nDB configuration: #{Rails.configuration.database_configuration[Rails.env].pretty_inspect}"

RSpec.configure do |config|
  config.before(type: :feature) do
  default_url_options[:host] = 'localhost'
end

  config.filter_rails_from_backtrace!
  config.infer_spec_type_from_file_location!

  config.include FactoryBot::Syntax::Methods
  config.include Capybara::DSL, type: :feature
  config.include HelperMethods
  config.include Rails.application.routes.url_helpers

  config.mock_with :rspec do |mocks|
    mocks.verify_partial_doubles = false
  end

  config.after(:suite) do
    FileUtils.rm_rf(Dir["#{Rails.root}/uploads/test"])
  end

  config.before(:suite) do
    vite_port = 3037
    vite_running = system("lsof -i :#{vite_port}", out: File::NULL, err: File::NULL)
    unless vite_running
      puts "Starting Vite dev server on port #{vite_port} for system tests..."
      @vite_pid = spawn("bin/vite dev --mode test --port #{vite_port}", out: '/dev/null', err: '/dev/null')
      sleep 3
      at_exit do
        puts 'Stopping Vite dev server...'
        Process.kill('TERM', @vite_pid)
      end
    end
  end
end

  Recaptcha.configure do |cfg|
    cfg.site_key  = '11111'
    cfg.secret_key = '22222'
  end

Capybara.server = :puma, { Silent: true }

Capybara.register_driver :selenium_chrome_headless do |app|
  options = Selenium::WebDriver::Chrome::Options.new
  options.add_argument('--headless=new')
  options.add_argument('--disable-gpu')
  options.add_argument('--no-sandbox')
  Capybara::Selenium::Driver.new(app, browser: :chrome, options: options)
end

Capybara.javascript_driver = :selenium_chrome_headless

FactoryBot::SyntaxRunner.include HelperMethods
