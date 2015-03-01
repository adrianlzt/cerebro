Para meter datos de ejemplo en nuestra aplicación lo ponremos en
db/seeds.rb

Ejemplo:
3.times do |x|
  genre  = Genre.find_or_create_by_name(:name => "Genre #{x}")
  3.times do |y|
    artist = Artist.find_or_create_by_name(:name => "Artist #{x}.#{y}", :genre => genre)
    3.times do |z|
      Song.find_or_create_by_title(:title => "Song #{x}.#{y}.#{z}",  :artist => artist)
    end
  end
end


para importar los datos
RAILS_ENV=production rake db:seed


/usr/local/rvm/gems/ruby-1.9.3-p551/gems/rake-10.3.2/lib/rake/trace_output.rb:16:in `block in trace_on': invalid byte sequence in US-ASCII (ArgumentError)
Add
#encoding: utf-8
at the top of the file
