Un interprete mejor es pry (mirar pry.md)


irb

irb -Ilib -rhola
  -I directory   Used to tell Ruby where to load the library scripts.  Directory path will be added to the load-path variable ($:).
  -r load-module


Para usar gemas instaladas:
# irb
irb(main):001:0> require 'rubygems'
=> true
irb(main):001:0> require 'lagemaquequeramos'


Intento pillar la gema directamente, sino, cargo rubygems y la cojo.
begin
 require 'pg'
rescue LoadError
 require 'rubygems'
 require 'pg'
end



# Inspect
puts var.inspect
  imprime el contenido de la variable, según se haya definido en "inspects()"

puts var.methods
  saca los métodos de la variable/objeto
