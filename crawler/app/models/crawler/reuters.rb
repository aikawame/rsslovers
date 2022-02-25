# frozen_string_literal: true

# ロイターのクローラー
class Crawler::Reuters < Crawler
  def fetch_items
    fetch_html.css('.news-headline-list article').map do |block|
      Item.new(title: block.css('h3.story-title').text.strip,
               link_url: URI.join(root_url, block.css('a').attr('href')),
               updated_at: parse_time(block.css('time').text))
    end
  end

  private

  def parse_time(value)
    year, month, day = value.strip.split(/[年月日]/)
    year = year.to_i
    month = month.to_i
    day = day.to_i
    if day.positive?
      Time.zone.parse("#{year}/#{month}/#{day}")
    else
      Time.zone.parse(value.strip)
    end
  end
end
