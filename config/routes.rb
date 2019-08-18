Rails.application.routes.draw do
  get 'home/index'
  root 'home#index'

  get '/icme', :to => redirect('/icme.html')

  resources :articles
  resources :projects
end
