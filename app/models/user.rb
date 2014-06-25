class User < ActiveRecord::Base
  
  # letsrate gem requirement
  letsrate_rater

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :popups   
  has_many :feeds
  
end
