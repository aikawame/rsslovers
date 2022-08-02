# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Crawler::Oricon, type: :model do
  describe 'fetch_items' do
    let(:crawler) { test_crawler(described_class) }
    let(:attributes) do
      {
        title: '酒井法子、子どもたちの海洋体験をサポート 「一緒に最高の思い出を作りましょう」と呼び掛け',
        description: nil,
        link_url: URI.parse('https://www.oricon.co.jp/news/2243993/full/'),
        updated_at: Time.zone.local(2022, 8, 2, 15, 55)
      }
    end

    subject { crawler.fetch_items.first }

    it { is_expected.to have_attributes(attributes) }
  end
end
