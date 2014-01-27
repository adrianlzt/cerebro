http://fnordmetric.io/documentation/downloads

Instalando en ubuntu quantal 12.10
apt-get install ruby1.9.1-dev make g++ redis-server
gem install fnordmetric-1.2.9.gem


cat << FIN > my_fnordmetric.rb
require "fnordmetric"

FnordMetric.namespace :myapp do

  # render a timeseries graph
  widget 'Sales',
    :title => "Sales per Minute",
    :gauges => [:sales_per_minute],
    :type => :timeline,
    :width => 100,
    :autoupdate => 1

end

FnordMetric.standalone
FIN

ruby my_fnordmetric.rb

curl -X POST -d '{ "_type": "_incr", "value": 1, "gauge": "sales_per_minute" }' http://localhost:4242/events


Este ejemplo parece que falla.
Usar mejor el full: http://fnordmetric.io/documentation/examples/fm_classic_full_example/
Aunque este full también da algunos errores.

Si falla, probar la versión de github
