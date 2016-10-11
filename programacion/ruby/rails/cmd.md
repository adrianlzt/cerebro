rails -> nos muestra opciones
rails new NombreApp
cd NombreApp
rails -> nos muestra opciones de la app. Ejecutar con -h para tener más información de cada comando
  Los más típicos:
  generate g
  console
  server s
  dbconsole
 
rails generate <- genera código, nos muestra opciones de que podemos generar
  scaffold: nos genera el "andamio" para un 'resource' (model, routing, controller, view), tambien el database migrations
    rails g scaffold zombie name:string bio:text age:integer (automáticamente se añade timestamps, con created_at y updated_at)
    Si queremos meter una relación a otro objeto ponemos algo tipo: porject_id:integer
  controller: genera controladores y la vista asociada por cada parámetro que pasemos
    rails g controller node index info detail
      /node/index
      /node/info
      /node/detail
  Un generador mejor (pero no se si vale para rails 4): https://github.com/ryanb/nifty-generators

Tras hacer un scaffold tenemos que aplicar las migraciones de la base de datos (crear las nuevas tablas)
rake db:migrate

Arrancar el servidor web. No hace falta reiniciarlo ante cambios en el código
rails s
rails s -p 3001


Arrancar el terminal rails/ruby
rails c
RAILS_ENV=production rails c
