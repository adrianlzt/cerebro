http://yaml.org/

https://github.com/cblp/yaml-sucks/
Cuidado con las respuestas de diferentes librerías.

YAML: YAML Ain't Markup Language

What It Is: YAML is a human friendly data serialization
  standard for all programming languages.

Convertir YAML a JSON
ruby -r json -r yaml -e "yaml = YAML.load(File.read('./stack.yml')); print yaml.to_json" > stack.json

http://jsontoyaml.com/

basic.yml:
--
- key: value



Array:
  "baz": [
    "qux",
    "quxx"
  ],

  baz: 
    - "qux"
    - "quxx"


  "garply": [
    {"foo": "VAR", "cosa": "asd12"},
    {"pepe":"MAR"}
  ],

  garply: 
    - foo: "VAR"
      cosa: "asd12"
    - pepe: "MAR"


  "emptyObject": {
      "uno" : "cpsp",
      "dos" : "http"
  },

  emptyObject: 
    uno: "cpsp"
    dos: "http"



# Multiline
https://yaml-multiline.info/

examle: >
  una cosa
  otra cosa
