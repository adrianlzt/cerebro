Para ejecutar logstash en modo debug.

logstash --log.level=debug
logstash --log.level=trace


Si lo hemos instalado con el .deb
Editar /etc/defaults/logstash
LS_OPTS="--log ${LOG_FILE} --debug"


Si arrancamos a mano:
java -jar logstash.xxx.jar agent -f fichero.conf --debug


Sacar por output lo que estemos procesando
output {
  stdout { codec => rubydebug }
}



# Depurando el plugin input de logstash
mirar tambien en programacion/ruby/elasticsearch.md
https://github.com/logstash-plugins/logstash-input-elasticsearch/blob/master/lib/logstash/inputs/elasticsearch.rb

yum install ruby
gem install elasticsearch

# irb
require 'elasticsearch'
@client = Elasticsearch::Client.new(:hosts => "172.16.1.43", :transport_options => nil)

@size = 1000
@scroll = "1m"
@index = "logstash-iris-telematics-2015.06.09"
@query = '{ "query": { "match": { "offset": "13638288" } } }'

@options = { :index => @index, :body => @query, :scroll => @scroll, :size => @size, :search_type => 'scan' }
@options = { :index => @index, :body => @query, :scroll => @scroll, :size => @size }
  en este metodo (sin search_type) podemos ver los resultados al hacer el client.search
r = @client.search(@options)

