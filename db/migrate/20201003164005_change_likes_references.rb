class ChangeLikesReferences < ActiveRecord::Migration[5.2]
  def change
    remove_reference :likes, :article_id, foreign_key: true
    add_reference :likes, :article, foreign_key: true
  end
end
