class AddProjectParams < ActiveRecord::Migration[5.2]
  def change
    add_column :projects, :title, :string
    add_column :projects, :text, :text
    add_column :projects, :image, :string
    add_column :projects, :date, :datetime
  end
end
