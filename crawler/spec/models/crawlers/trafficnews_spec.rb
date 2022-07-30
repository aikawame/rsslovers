# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Crawler::Trafficnews, type: :model do
  describe 'fetch_items' do
    let(:crawler) { test_crawler(described_class) }
    let(:attributes) do
      {
        title: '「ウイングレット付きジャンボ貨物機」747-400F、カーゴルクスからも退役へ 「777X」貨物型に更新',
        description: nil,
        link_url: URI.parse('https://trafficnews.jp/post/120824'),
        updated_at: Time.zone.local(2022, 7, 30, 11, 12)
      }
    end

    subject { crawler.fetch_items.first }

    it { is_expected.to have_attributes(attributes) }
  end
end
