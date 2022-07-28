# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Crawler::Yonnana, type: :model do
  describe 'fetch_items' do
    let(:crawler) { test_crawler(described_class) }
    let(:attributes) do
      {
        title: 'コロナ「第７波」保健所へとへと　仙台市、自宅療養増「限界近い」　',
        description: nil,
        link_url: URI.parse('https://www.47news.jp/news/8110773.html'),
        updated_at: Time.zone.now.midnight
      }
    end

    subject { crawler.fetch_items.first }

    it { is_expected.to have_attributes(attributes) }
  end
end
