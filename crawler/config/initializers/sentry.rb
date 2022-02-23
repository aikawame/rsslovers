# frozen_string_literal: true

Sentry.init do |config|
  config.dsn = Rails.application.credentials.sentry.dsn if Rails.env.production?
  config.breadcrumbs_logger = [:active_support_logger, :http_logger]
  config.traces_sample_rate = 0
end
