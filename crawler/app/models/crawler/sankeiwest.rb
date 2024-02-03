# frozen_string_literal: true

# 産経WESTのクローラー
class Crawler::Sankeiwest < Crawler
  prepend DynamicCrawler

  def fetch_items
    selected_blocks = fetch_html.css('.grid__column-left-content article.storycard').select do |block|
      block.css('h2 a, h3 a').text.present?
    end
    selected_blocks.map do |block|
      anchor = block.css('h2 a, h3 a')
      datetime = block.css('time').attr('datetime')
      Item.new(title: anchor.text,
               link_url: URI.join(root_url, anchor.attr('href')),
               updated_at: Time.zone.parse(datetime))
    end
  end
end
