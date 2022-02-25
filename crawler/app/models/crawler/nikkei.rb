# frozen_string_literal: true

# 日経新聞のクローラー
class Crawler::Nikkei < Crawler
  def fetch_items
    fetch_html.css('.m-miM09, .m-miM32_list .m-miM32_item').map do |block|
      Item.new(title: block.css('.m-miM09_titleL, .m-miM32_itemTitleText a').text,
               link_url: URI.join(root_url, block.css('.m-miM09_title a, .m-miM32_itemTitleText a').attr('href')),
               updated_at: parse_time(block.css('.m-miM09_date, .m-miM32_itemDate').text))
    end
  end

  private

  def parse_time(value)
    time, day = value.split.reverse
    day = day.to_i
    now = Time.zone.now
    if day.positive?
      month = day > now.day ? 1.month.ago.month : now.month
      Time.zone.parse("#{month}/#{day} #{time}")
    else
      Time.zone.parse(time)
    end
  end
end
