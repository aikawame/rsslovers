# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Crawler::Reuters, type: :model do
  describe 'fetch_items' do
    let(:crawler) { test_crawler(described_class) }
    let(:attributes) do
      today = Time.zone.now
      {
        title: 'ノルドストリーム用タービン、カナダがドイツに輸送＝ロシア紙',
        description: nil,
        link_url: URI.parse('https://jp.reuters.com/article/ukraine-crisis-russia-gas-nordstream-idJPKBN2OT0BD'),
        updated_at: Time.zone.local(today.year, today.month, today.day, 21, 59)
      }
    end

    subject { crawler.fetch_items.first }

    it { is_expected.to have_attributes(attributes) }
  end
end
