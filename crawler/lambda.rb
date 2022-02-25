# frozen_string_literal: true

require_relative 'config/application'

Rails.application.load_tasks

def handler(*)
  Rake::Task['crawl'].invoke

  { statusCode: 200 }
end
