# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Crawler::Minkabufx, type: :model do
  describe 'fetch_items' do
    let(:crawler) { test_crawler(described_class) }
    let(:attributes) do
      {
        title: 'ナーゲル独連銀総裁　第２四半期に重要なインフレ圧力に関するデータが発表される',
        description: nil,
        link_url: URI.parse('https://fx.minkabu.jp/news/292147'),
        updated_at: Time.zone.local(2024, 2, 23, 19, 18)
      }
    end

    subject { crawler.fetch_items.first }

    it { is_expected.to have_attributes(attributes) }
  end
end
