http://flood-io.github.io/ruby-jmeter/
https://github.com/flood-io/ruby-jmeter

A Ruby based DSL for building JMeter test plans


Instalación:
gem install ruby-jmeter


Ejemplo:
require 'rubygems'
require 'ruby-jmeter'
test do
  threads count: 10 do
    visit name: 'Google Search', url: 'http://google.com'
  end
end.jmx(file: "/tmp/my_testplan.jmx")


Podemos tambien hacer una ejecucción y obtener los resultados.
require 'rubygems'
require 'ruby-jmeter'
test do
  threads count: 10 do
    visit name: 'Google Search', url: 'http://google.com'
  end
end.run


Para poder ver los resultados en JMeter crearemos un nuevo Listener, y apuntaremos al fichero jtl generado por ruby-jmeter.
Pero antes deberemos convertir ese fichero a csv:
cat jmeter.jtl | tr '|' ',' > jmeter-comas.jtl


Más info en la web.
