class Popup < ActiveRecord::Base


  belongs_to :user
  has_many :feeds

  validates :image, :presence => { :message => "Image is required" }

  has_attached_file :image, styles: {
      thumb: '100x100>',
      square: '200x200#',
      medium: '300x300>'
     }



  # Validate the attached image is image/jpg, image/png, etc
  validates_attachment_content_type :image, :content_type => /\Aimage\/.*\Z/

  def self.search_for(query)
    where('name LIKE :query', query: "%#{query}%")
  end

end
