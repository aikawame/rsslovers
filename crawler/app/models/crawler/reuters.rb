# frozen_string_literal: true

# ロイターのクローラー
class Crawler::Reuters < Crawler
  prepend DynamicCrawler

  def fetch_items
    selector_str = "div[data-testid='HeroCard'], div[data-testid='BasicCard'], div[data-testid='HubCard']"
    Rails.logger.info('  ' + fetch_html.css(selector_str).to_s)
    fetch_html.css(selector_str).map do |block|
      title = block.css("*[data-testid='Title']")
      Rails.logger.info('  ' + title)
      anchor = title.attr('href')
      Item.new(title: title.text.strip,
               link_url: URI.join(root_url, anchor.text),
               updated_at: Time.zone.parse(block.css('time').attr('datetime')))
    end
  end
end
