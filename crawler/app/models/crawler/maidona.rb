# frozen_string_literal: true

# まいどなニュースのクローラー
class Crawler::Maidona < Crawler
  def fetch_items
    articles = fetch_html.css('.module-list-articles__item').select do |block|
      block.css('time').present?
    end
    articles.map do |block|
      anchor = block.css('a')
      datetime = block.css('time').text.force_encoding(Encoding::UTF_8)
      Item.new(title: block.css('.module-list-articles__item__heading').text,
               link_url: URI.join(root_url, anchor.attr('href')),
               updated_at: Time.zone.parse(datetime))
    end
  end

  def fetch_html
    Nokogiri::HTML.parse(url.open, nil, url.read.charset)
  end
end
