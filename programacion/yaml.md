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
https://stackoverflow.com/questions/3790454/how-do-i-break-a-string-in-yaml-over-multiple-lines/21699210#21699210

Tambien tenemos ">+", "|+"

example: >
  una cosa
  otra cosa
  todo seguido
  y con un salto de línea al final

example: >-
  sin el salto de línea al final

example: |
  en este formato
  se respetan los cambios
  de linea que aqui pongo

example: |-
  sin salto de línea al final


foo:
  bar: |
    el identado tiene que
      ser a partir
    de donde tenemos la
    key donde metemos
        las cosas

# Lint
https://yamllint.readthedocs.io/
