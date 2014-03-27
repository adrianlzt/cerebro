https://github.com/rest-client/rest-client

RestClient.get 'http://192.168.51.2:8080/v3/nodes', {:accept => :json, :params => {:query => '["=", "name", "client.com"]'}}
