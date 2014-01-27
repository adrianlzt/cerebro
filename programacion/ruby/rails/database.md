Se configura en /config/database.yaml

Para producción:
rake db:setup RAILS_ENV=production

Para configurar mysql:
En el Gemfile:
  gem 'mysql2'

En database.yaml
production:
  adapter: mysql2
  encoding: utf8
  reconnect: false
  database: databasename
  pool: 5
  username: root
  password: password
  host: localhost
# socket: /tmp/mysql.sock


Para postgres
gem install pg
production:
  adapter: postgresql
  encoding: unicode
  database: myapp_development
  pool: 5
  username: myapp
  password: password1
  host: ip.addr
  port: 5432
