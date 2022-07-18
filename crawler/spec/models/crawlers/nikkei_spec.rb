# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Crawler, type: :model do
  describe 'fetch_items' do
    let(:crawler) do
      html = Nokogiri::HTML.parse(File.open('spec/fixtures/files/rss/html/nikkei/news.html'))
      crawler = Crawler::Nikkei.new
      allow(crawler).to receive(:fetch_html).and_return(html)
      allow(crawler).to receive(:root_url).and_return('https://example.com')
      allow(Crawler::Nikkei).to receive(:new).and_return(crawler)
      crawler
    end

    subject do
      crawler.fetch_items.first
    end

    it do
      is_expected.to have_attributes(
        title: '世界陸上女子マラソン、新谷仁美が欠場　コロナで',
        description: nil,
        link_url: URI.parse('https://www.nikkei.com/article/DGXZQOKC180N80Y2A710C2000000/'),
        updated_at: Time.zone.local(2022, 0o7, 18, 10, 49)
      )
    end
  end
end
