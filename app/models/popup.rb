class Popup < ActiveRecord::Base


  belongs_to :user
  has_many :feeds
  # before_save { |popup| popup.name = name.downcase }

  # before_save do |popup|
  #   if popup.expires_at == nil
  #     popup.expires_at = 10.years.from_now
  #   end
  # end

  # validates :image, :presence => { :message => "Image is required" }

  # validates :geocode, presence: true
  

  # for geocoder gem to convert address into "geocode"(longitude and latitude)
  geocoded_by :address
  after_validation :geocode

  # paperclip image styles
  has_attached_file :image, styles: {
      thumb: '100x100>',
      square: '200x200#',
      medium: '300x300>'
     }

  # Validate the attached image is image/jpg, image/png, etc
  validates_attachment_content_type :image, :content_type => /\Aimage\/.*\Z/


  def self.search_for(query)
    where('name ILIKE :query', query: "%#{query}%")
  end

end
