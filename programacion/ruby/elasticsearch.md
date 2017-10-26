https://github.com/elastic/elasticsearch-ruby
Gema para elasticsearch

Ejemplo de uso: https://github.com/logstash-plugins/logstash-input-elasticsearch/blob/master/lib/logstash/inputs/elasticsearch.rb


# Conex con auth basic
require 'elasticsearch'
require "base64"
token = Base64.strict_encode64("elastic:changeme")
transport_options = {}
transport_options[:headers] = { :Authorization => "Basic #{token}" }
@client = Elasticsearch::Client.new(:hosts => "127.0.0.1", :transport_options => transport_options)
@client.search()
