# frozen_string_literal: true

# ロイターのクローラー
class Crawler::Reuters < Crawler
  prepend DynamicCrawler

  def fetch_items
    fetch_html.css("div[data-testid='MediaStoryCard']").map do |block|
      title = block.css("*[data-testid='Heading']")
      Item.new(title: title.text.strip,
               link_url: URI.join(root_url, title.attr('href')&.text || title.css('a').attr('href').text),
               updated_at: Time.zone.parse(block.css('time').attr('datetime')))
    end
  end
end
