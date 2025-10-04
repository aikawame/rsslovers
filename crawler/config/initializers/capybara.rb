# frozen_string_literal: true

require 'capybara'
require 'selenium-webdriver'

Capybara.register_driver :scraper do |app|
  version = Capybara::Selenium::Driver.load_selenium
  capabilities_key = Capybara::Selenium::Driver::CAPS_VERSION.satisfied_by?(version) ? :capabilities : :options
  capabilities = ::Selenium::WebDriver::Chrome::Options.new.tap do |options|
    options.add_argument('--headless')
    options.add_argument('--no-sandbox')
    options.add_argument('--window-size=1280x960')
    options.add_argument('--disable-infobars')
    options.add_argument('--disable-extensions')
    options.add_argument('--single-process')
    options.add_argument('--disable-dev-shm-usage')
    options.add_argument('--homedir=/tmp')
  end
  Capybara::Selenium::Driver.new(app,
                                 browser: :chrome,
                                 service: Selenium::WebDriver::Service.chrome,
                                 capabilities_key => capabilities,
                                 timeout: 120)
end
