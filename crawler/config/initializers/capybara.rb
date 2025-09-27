# frozen_string_literal: true

require 'capybara'
require 'selenium-webdriver'

Capybara.register_driver :crawler do |app|
  options = ::Selenium::WebDriver::Chrome::Options.new.tap do |options|
    options.add_argument('--user-data-dir=/tmp/google-chrome')
    options.add_argument('--headless=new')
    options.add_argument('--no-sandbox')
    options.add_argument('--window-size=800,600')
    options.add_argument('--disable-background-networking')
    options.add_argument('--disable-default-apps')
    options.add_argument('--disable-dev-shm-usage')
    options.add_argument('--disable-extensions')
    options.add_argument('--disable-features=Translate')
    options.add_argument('--disable-gpu')
    options.add_argument('--disable-notifications')
    options.add_argument('--disable-site-isolation-trials')
  end
  Capybara::Selenium::Driver.new(app, browser: :chrome, options:, timeout: 120)
end
