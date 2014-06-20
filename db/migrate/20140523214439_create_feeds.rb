class CreateFeeds < ActiveRecord::Migration
  def change
    create_table :feeds do |t|
      t.string :comment
      t.integer :popup_id
      t.integer :user_id
      t.timestamps
    end
  end
end

