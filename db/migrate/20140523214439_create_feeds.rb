class CreateFeeds < ActiveRecord::Migration
  def change
    create_table :feeds do |t|
      t.string :comment

      t.timestamps
    end
  end
end
