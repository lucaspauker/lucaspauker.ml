class RemoveImageFromProjectsAndArticles < ActiveRecord::Migration[5.2]
  def change
    remove_column :projects, :image, :string
    remove_column :articles, :image, :string
  end
end
