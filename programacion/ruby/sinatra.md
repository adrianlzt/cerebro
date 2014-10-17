http://www.sinatrarb.com

Servidor web en ruby super simple

require 'sinatra'
set :port, 3000
set :bind, '0.0.0.0'
get '/' do
  'Hello world!'
end
get '/foo' do
  status 418
  headers \
    "Allow"   => "BREW, POST, GET, PROPFIND, WHEN",
    "Refresh" => "Refresh: 20; http://www.ietf.org/rfc/rfc2324.txt"
  body "I'm a tea pot!"
end

get '/hello/:name' do
  # matches "GET /hello/foo" and "GET /hello/bar"
  # params[:name] is 'foo' or 'bar'
  "Hello #{params[:name]}!"
end

get '/posts' do
  # matches "GET /posts?title=foo&author=bar"
  title = params[:title]
  author = params[:author]
  # uses title and author variables; query is optional to the /posts route
end

post "/api" do
  request.body.rewind  # in case someone already read it
  data = JSON.parse request.body.read
  "Hello #{data['name']}!"
end

To immediately stop a request within a filter or route use:
halt

gem install sinatra

ruby myapp.rb

http://localhost:3000
