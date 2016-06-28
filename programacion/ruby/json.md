http://ruby-doc.org/stdlib-2.0.0/libdoc/json/rdoc/JSON.html

sudo gem install json

No se donde está el prettify_json.rb
curl -s http://jsonip.com/ | prettify_json.rb


irb(main):005:0> require 'json'
irb(main):005:0> cosa='{"var":"123","otor":"rtrtt"}'
=> "{\"var\":\"123\",\"otor\":\"rtrtt\"}"
irb(main):006:0> JSON.parse(cosa)
=> {"otor"=>"rtrtt", "var"=>"123"}

# Exportar en json
Los tipos corrientes saben como pasarse a json, pero si tenemos un objeto propio tendremos que definir la funcion as_json donde devolveremos un ash con los valores que queremos:

def as_json
  {
    "coso": self.bla,
    "otro": 3
  }
end

Luego lo usaremos como:
objeto.as_json.to_json

## Hash
Podemos usar :only y :except para limitar que queremos exportar:

  { :name => "Konata Izumi", 'age' => 16, 1 => 2 }.to_json(:only => [:name, 'age'])
  # => {"name": "Konata Izumi", "age": 16}

  { :name => "Konata Izumi", 'age' => 16, 1 => 2 }.to_json(:except => 1)
  # => {"name": "Konata Izumi", "age": 16}

# Escribir en un fichero

require 'json'
tempHash = {
    "key_a" => "val_a",
    "key_b" => "val_b"
}
File.open("public/temp.json","w") do |f|
  f.write(tempHash.to_json)
end

# Leer fichero
file = File.read('file-name-to-be-read.json')
data_hash = JSON.parse(file)

