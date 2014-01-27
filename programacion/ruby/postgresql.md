https://bitbucket.org/ged/ruby-pg/wiki/Home
http://deveiate.org/code/pg/ <- API

Instalación:
yum install postgresql-devel-8.4.18-1.el6_4.x86_64
gem install pg


#!/usr/bin/env ruby
  
require 'rubygems'
require 'pg'
  
# Output a table of current connections to the DB
conn = PG.connect( dbname: 'sales' )
conn.exec( "SELECT * FROM pg_stat_activity" ) do |result|
  puts "     PID | User             | Query"
  result.each do |row|
    puts " %7d | %-16s | %s " %
      row.values_at('procpid', 'usename', 'current_query')
  end
end

Más sencillo
res = conn.exec("SELECT * from commands")
res[0] <- hash con los valores de la primera fila


Definir usuario, pass, host, etc
PG.connect(host, port, options, tty, dbname, login, password) 
conn = PG.connect('127.0.0.1', nil, nil, nil, 'puppet', 'puppet', 'puppet')
