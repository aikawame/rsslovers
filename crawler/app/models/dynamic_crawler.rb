# frozen_string_literal: true

# 動的HTMLを扱うクローラー
module DynamicCrawler
  def fetch_html
    session = Capybara::Session.new(:crawler)
    session.visit(@url)
    result = Nokogiri::HTML.parse(session.html)
    session.quit
    result
  end
end
