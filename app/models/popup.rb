class Popup < ActiveRecord::Base

  belongs_to :user
  has_many :feeds

  def self.search_for(query)
    where('name LIKE :query', query: "%#{query}%")
  end

end
