# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

#Article.delete_all
#Project.delete_all

files = Dir[Rails.root.join('files', 'articles', '*')]
files.each do |file|
  f = File.open(file)
  text = ''
  title = ''
  date= ''
  f.each_with_index do |line, i|
    if i == 0
      date = line
    elsif i == 1
      title = line[1..-1]
    else
      text += line
    end
  end
  unless Article.find_by(title: title).nil?
    a = Article.find_by(title: title)
  else
    a = Article.new
  end
  a.title = title
  a.text = text
  a.date = date
  a.save
end

files = Dir[Rails.root.join('files', 'projects', '*')]
files.each do |file|
  f = File.open(file)
  text = ''
  title = ''
  date= ''
  f.each_with_index do |line, i|
    if i == 0
      date = line
    elsif i == 1
      title = line[1..-1]
    else
      text += line
    end
  end
  unless Project.find_by(title: title).nil?
    p = Project.find_by(title: title)
  else
    p = Project.new
  end
  p.title = title
  p.text = text
  p.date = date
  p.save
end

puts "There are now #{Article.count} rows in the articles table"
puts "There are now #{Project.count} rows in the projects table"
