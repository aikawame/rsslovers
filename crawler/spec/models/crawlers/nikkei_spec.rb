# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Crawler::Nikkei, type: :model do
  describe 'fetch_items' do
    let(:crawler) { test_crawler(described_class) }
    let(:attributes) do
      today = Time.zone.now
      {
        title: '世界陸上女子マラソン、新谷仁美が欠場　コロナで',
        description: nil,
        link_url: URI.parse('https://www.nikkei.com/article/DGXZQOKC180N80Y2A710C2000000/'),
        updated_at: Time.zone.local(today.year, today.month, today.day, 10, 49)
      }
    end

    subject { crawler.fetch_items.first }

    it { is_expected.to have_attributes(attributes) }
  end
end
