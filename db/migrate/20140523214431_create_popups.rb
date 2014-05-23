class CreatePopups < ActiveRecord::Migration
  def change
    create_table :popups do |t|
      t.string :name
      t.string :address
      t.string :hours
      t.string :price
      t.string :description
      t.text :image
      t.datetime :expires_at

      t.timestamps
    end
  end
end
