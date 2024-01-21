# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Crawler::Nikkei, type: :model do
  describe 'fetch_items' do
    let(:crawler) { test_crawler(described_class) }
    let(:attributes) do
      {
        title: '100年で30億円節約の計　町のインフラ、捨てて守る',
        description: nil,
        link_url: URI.parse('https://www.nikkei.com/article/DGXZQOUE193FP0Z10C24A1000000/'),
        updated_at: Time.zone.parse('2024-01-19T20:00:00.000Z')
      }
    end

    subject { crawler.fetch_items.first }

    it { is_expected.to have_attributes(attributes) }
  end
end
