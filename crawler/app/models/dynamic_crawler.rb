# frozen_string_literal: true

require 'selenium-webdriver'

# 動的HTMLを扱うクローラー
module DynamicCrawler
  def fetch_html
    driver = Selenium::WebDriver.for(:chrome, options:)
    driver.navigate.to(@url)
    result = Nokogiri::HTML.parse(driver.page_source)
    driver.quit
    result
  end

  private

  def options
    Selenium::WebDriver::Chrome::Options.new.tap do |options|
      options.add_argument('--headless=new')
      options.add_argument('--no-sandbox')
      options.add_argument('--disable-dev-shm-usage')
      options.add_argument('--disable-blink-features=AutomationControlled')
      options.add_argument('--lang=ja-JP')
      options.add_argument('--window-size=1920,1080')
      options.exclude_switches = ['enable-automation']
    end
  end
end
