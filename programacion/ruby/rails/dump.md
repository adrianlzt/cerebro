https://github.com/rroblak/seed_dump

Nos permite hacer un dump de partes de los objetos.
Hace falta meter la linea
gem 'seed_dump'
En el Gemfile.

Luego:
RAILS_ENV=production rake db:seed:dump

Hace un dump en db/seeds.rb


Dump only data from the users table and dump a maximum of 1 record:
$ rake db:seed:dump MODELS=User LIMIT=1


Append to db/seeds.rb instead of overwriting it:
rake db:seed:dump APPEND=true


Use another output file instead of db/seeds.rb:
rake db:seed:dump FILE=db/seeds/users.rb

Exclude name and age from the dump:
rake db:seed:dump EXCLUDE=name,age


Tambien podemos entrar con la consola
RAILS_ENV=production rails c
> puts SeedDump.dump(User)

Nos permite mayor flexibilidad a la hora de que sacar:
> SeedDump.dump(User, file: 'db/seeds.rb', append: true)
