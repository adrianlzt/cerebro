http://www.sinatrarb.com

Servidor web en ruby super simple

require 'sinatra'
set :port, 3000
set :bind, '0.0.0.0'
get '/' do
  'Hello world!'
end


gem install sinatra

ruby myapp.rb

http://localhost:3000
