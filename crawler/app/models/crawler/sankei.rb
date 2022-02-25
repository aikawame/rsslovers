# frozen_string_literal: true

# 産経新聞のクローラー
class Crawler::Sankei < Crawler
  prepend DynamicCrawler

  def fetch_items
    fetch_html.css('.grid__column-left-content article.storycard').map do |block|
      anchor = block.css('h3 a')
      datetime = block.css('time').attr('datetime')
      Item.new(title: anchor.text,
               link_url: URI.join(root_url, anchor.attr('href')),
               updated_at: Time.zone.parse(datetime))
    end
  end
end
