sudo gem install json

No se donde está el prettify_json.rb
curl -s http://jsonip.com/ | prettify_json.rb


irb(main):005:0> require 'json'
irb(main):005:0> cosa='{"var":"123","otor":"rtrtt"}'
=> "{\"var\":\"123\",\"otor\":\"rtrtt\"}"
irb(main):006:0> JSON.parse(cosa)
=> {"otor"=>"rtrtt", "var"=>"123"}

