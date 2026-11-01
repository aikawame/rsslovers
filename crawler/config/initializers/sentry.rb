# frozen_string_literal: true

if Rails.env.production?
  Sentry.init do |config|
    config.dsn = CREDENTIALS.sentry.dsn
    config.rails.structured_logging.enabled
    config.breadcrumbs_logger = [:active_support_logger, :http_logger]
    config.traces_sample_rate = 0
  end
end
