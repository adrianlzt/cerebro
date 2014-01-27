gem install rails
sudo apt-get install libsqlite3-dev
rails new TwitterForZombies
cd TwitterForZombies
vi Gemfile
  Descomentar la linea que tiene 'therubytracer'
rails g scaffold zombie name:string bio:text age:integer

rails s
http://localhost:3000/zombies

En este momento tenemos un CRUD montado sobre el recurso zombies. Podemos crear, ver, editar y borrar zombies.
