# frozen_string_literal: true

# ロイターのクローラー
class Crawler::Reuters < Crawler
  prepend DynamicCrawler

  def fetch_items
    fetch_html.css("div[data-testid='MediaStoryCard'], div[data-testid='TextStoryCard']").map do |block|
      heading = block.css("*[data-testid='Heading']")
      anchor = heading.attr('href') || heading.css('a').attr('href')
      Item.new(title: heading.text.strip,
               link_url: URI.join(root_url, anchor.text),
               updated_at: Time.zone.parse(block.css('time').attr('datetime')))
    end
  end
end
