# frozen_string_literal: true

require 'selenium-webdriver'

# 動的HTMLを扱うクローラー
module DynamicCrawler
  def fetch_html
    driver = Selenium::WebDriver.for(:firefox, options:)
    driver.navigate.to(@url)
    result = Nokogiri::HTML.parse(driver.page_source)
    driver.quit
    result
  end

  private

  def options
    Selenium::WebDriver::Firefox::Options.new.tap do |options|
      options.add_argument('-headless')
    end
  end
end
