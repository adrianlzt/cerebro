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



# Conex usando certificado cliente TLS
require 'elasticsearch'
transport_options = {}
transport_options[:ssl] = { :ca_file => "admin-ca", :verify => false, :client_cert  => OpenSSL::X509::Certificate.new(File.read('admin-cert')), :client_key => OpenSSL::PKey::RSA.new(File.read('admin-key')) }
@client = Elasticsearch::Client.new(:hosts => {:host => "elastic.inet", :scheme => "https", :port => 443}, :transport_options => transport_options)
@client.search()
