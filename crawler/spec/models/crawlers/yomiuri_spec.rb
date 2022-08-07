# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Crawler::Yomiuri, type: :model do
  describe 'fetch_items' do
    context 'latestnews' do
      let(:crawler) { test_crawler(described_class) }
      let(:attributes) do
        {
          title: '野球殿堂入りの表彰式、高津監督「球宴監督として受けられ選手に感謝」・山本昌氏「栄誉は極まった」',
          description: nil,
          link_url: URI.parse('https://www.yomiuri.co.jp/sports/npb/20220726-OYT1T50232/'),
          updated_at: Time.zone.local(2022, 7, 26, 19, 43)
        }
      end

      subject { crawler.fetch_items.first }

      it { is_expected.to have_attributes(attributes) }
    end

    context 'national' do
      let(:crawler) do
        sample_file = 'spec/fixtures/files/rss/html/yomiuri_national.html'
        test_crawler(described_class, sample_file)
      end
      let(:attributes) do
        {
          title: '中国海警局の２隻、尖閣諸島沖の領海侵入…近海で日本漁船が操業・海保巡視船が警戒',
          description: nil,
          link_url: URI.parse('https://www.yomiuri.co.jp/national/20220807-OYT1T50091/'),
          updated_at: Time.zone.local(2022, 8, 7, 15, 48)
        }
      end

      subject { crawler.fetch_items.first }

      it { is_expected.to have_attributes(attributes) }
    end
  end
end
