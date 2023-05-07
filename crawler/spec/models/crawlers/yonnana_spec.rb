# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Crawler::Yonnana, type: :model do
  describe 'fetch_items' do
    let(:crawler) { test_crawler(described_class) }
    let(:attributes) do
      {
        title: '為替相場　　　3日（日本時間11時）',
        description: nil,
        link_url: URI.parse('https://www.47news.jp/news/8523053.html'),
        updated_at: Time.zone.now.midnight
      }
    end

    subject { crawler.fetch_items.first }

    it { is_expected.to have_attributes(attributes) }
  end
end
