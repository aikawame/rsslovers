# frozen_string_literal: true

# サイト
class Site < ApplicationRecord
  belongs_to :category
  has_many :feeds, dependent: :destroy
end
