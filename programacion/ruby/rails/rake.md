Para ver todas las opciones:
rake -T

Comunes:
rake db:migrate
rake db:migrate:status
rake db:migrate VERSION=20131230221306 <- aplicará todas las que nos falten

rake db:schema:dump

rake db:rollback

rake assets:precompile <- precompila los ficheros de assets/. Minifies all code.
