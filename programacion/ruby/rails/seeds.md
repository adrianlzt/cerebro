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
