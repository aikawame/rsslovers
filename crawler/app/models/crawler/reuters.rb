# frozen_string_literal: true

# ロイターのクローラー
class Crawler::Reuters < Crawler
  prepend DynamicCrawler

  def fetch_items
    selector_str = "div[data-testid='HeroCard'], div[data-testid='BasicCard'], div[data-testid='HubCard']"
    fetch_html.css(selector_str).map do |block|
      heading = block.css("*[data-testid='Heading']")
      anchor = heading.attr('href') || heading.css('a').attr('href')
      Item.new(title: heading.text.strip,
               link_url: URI.join(root_url, anchor.text),
               updated_at: Time.zone.parse(block.css('time').attr('datetime')))
    end
  end
end
