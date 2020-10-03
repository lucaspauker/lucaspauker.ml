Rails.application.routes.draw do
  get 'home/index'
  root 'home#index'

  get '/icme', :to => redirect('/icme.html')

  get '/projects', :to => redirect('/articles')
  get '/projects/:id', :to => redirect('/articles')
  put 'articles/:id/like', to: 'articles#like', as: 'like'

  resources :articles
end
