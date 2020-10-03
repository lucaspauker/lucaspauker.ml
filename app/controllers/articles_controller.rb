class ArticlesController < ApplicationController
  def index
    @articles = Article.all
  end

  def show
    @article = Article.find(params[:id])
  end

  def new
    @article = Article.new
  end

  def create
    @article = Article.new(article_params)

    if @article.save
      redirect_to @article
    else
      render 'new'
    end
  end

  def like
    @article = Article.find(params[:id])
    puts params
    Like.create(article_id: @article.id)
    redirect_to article_path(@article, :anchor => "like")
  end

  private
    def article_params
      params.require(:article).permit(:title, :text, :image, :date)
    end
end
