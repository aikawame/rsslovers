# frozen_string_literal: true

module CrawlerHelpers
  def test_crawler(crawler_class)
    sample_file = "spec/fixtures/files/rss/html/#{crawler_class.name.split('::').last&.downcase}.html"
    html = Nokogiri::HTML.parse(File.open(sample_file))
    crawler = crawler_class.new
    allow(crawler).to receive(:fetch_html).and_return(html)
    allow(crawler).to receive(:root_url).and_return('https://example.com')
    allow(crawler_class).to receive(:new).and_return(crawler)
    crawler
  end
end
