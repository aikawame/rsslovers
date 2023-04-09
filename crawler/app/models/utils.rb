# frozen_string_literal: true

# ユーティリティー
class Utils
  def self.read_json_db(url)
    JSON.parse(url.open&.read)
        .map { |row| row.deep_transform_keys(&:underscore).deep_symbolize_keys }
        .select { |row| row[:is_active] || Rails.env.development? }
  end

  def self.purge_cdn_cache(target_url)
    return unless Rails.env.production?

    api_url = URI.parse("https://api.cloudflare.com/client/v4/zones/#{CREDENTIALS.cloudflare.zone_id}/purge_cache")

    http = Net::HTTP.new(api_url.host, api_url.port)
    http.use_ssl = true
    headers = {
      'Content-Type' => 'application/json',
      'X-Auth-Email' => CREDENTIALS.cloudflare.email,
      'X-Auth-Key' => CREDENTIALS.cloudflare.api_key
    }
    params = {
      files: [target_url]
    }
    http.post(api_url.path, params.to_json, headers)
  end

  def self.save_to_s3(path:, body:, content_type:)
    client = Aws::S3::Client.new(access_key_id: CREDENTIALS.s3.access_key_id,
                                 secret_access_key: CREDENTIALS.s3.secret_access_key,
                                 region: CREDENTIALS.s3.region,
                                 endpoint: CREDENTIALS.s3.endpoint)
    client.put_object(bucket: CREDENTIALS.s3.bucket_name,
                      key: path,
                      body:,
                      content_type:)
  end
end
