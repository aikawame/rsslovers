# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Crawler::Maidona, type: :model do
  describe 'fetch_items' do
    let(:crawler) { test_crawler(described_class) }
    let(:attributes) do
      {
        title: '先祖は源頼朝に使えた武士！リアル「鎌倉殿の13人」に“登場”していたかも…北条義時役「小栗旬」の名字のルーツ',
        description: nil,
        link_url: URI.parse('https://maidonanews.jp/article/14679152'),
        updated_at: Time.zone.local(2022, 8, 6)
      }
    end

    subject { crawler.fetch_items.first }

    it { is_expected.to have_attributes(attributes) }
  end
end
