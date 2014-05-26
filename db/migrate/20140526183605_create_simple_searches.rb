class CreateSimpleSearches < ActiveRecord::Migration
  def change
    create_table :simple_searches do |t|

      t.timestamps
    end
  end
end
