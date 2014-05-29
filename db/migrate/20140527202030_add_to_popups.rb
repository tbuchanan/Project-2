class AddToPopups < ActiveRecord::Migration
  
  # had to add long & lat for geocode conversion from user address
  def change
    add_column :popups, :latitude, :float
    add_column :popups, :longitude, :float
    add_column :popups, :website, :string
  end
  
end
