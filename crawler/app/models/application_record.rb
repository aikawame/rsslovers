# frozen_string_literal: true

# 基底アクティブレコード
class ApplicationRecord < ActiveYaml::Base
  set_root_path "#{ENV.fetch('SHARED_PATH', 'shared')}/data"

  include ActiveHash::Associations
end
