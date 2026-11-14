# frozen_string_literal: true

# カテゴリー
class Category < ApplicationRecord
  has_many :sites, dependent: :destroy
end
