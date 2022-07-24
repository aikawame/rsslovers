# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Crawler::Bloomberg, type: :model do
  describe 'fetch_items' do
    context 'without time' do
      let(:crawler) { test_crawler(described_class) }
      let(:attributes) do
        {
          title: '【米国市況】株が反落、決算や統計に失望－136円ちょうど近辺',
          description: nil,
          link_url: URI.parse('https://www.bloomberg.co.jp/news/articles/2022-07-22/RFFODUDWX2PV01?srnd=cojp-v2'),
          updated_at: Time.zone.now.midnight
        }
      end

      subject { crawler.fetch_items.first }

      it { is_expected.to have_attributes(attributes) }
    end

    context 'with time' do
      let(:crawler) { test_crawler(described_class) }
      let(:attributes) do
        {
          title: '【ウクライナ】オデーサ港にミサイル攻撃、穀物輸出再開の合意翌日',
          description: nil,
          link_url: URI.parse('https://www.bloomberg.co.jp/news/articles/2022-07-23/RFEMV0DWLU6C01?srnd=cojp-v2'),
          updated_at: Time.zone.parse('2022-07-24T02:17:47.874Z')
        }
      end

      subject { crawler.fetch_items.fifth }

      it { is_expected.to have_attributes(attributes) }
    end
  end
end
