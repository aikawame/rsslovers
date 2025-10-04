# frozen_string_literal: true

# 動的HTMLを扱うクローラー
module DynamicCrawler
  def fetch_html
    FileUtils.rm_rf('/tmp/*')
    session = Capybara::Session.new(:crawler)
    session.visit(@url)
    result = Nokogiri::HTML.parse(session.html)
    session.quit
    result
  end
end
