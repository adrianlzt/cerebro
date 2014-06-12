http://yaml.org/

YAML: YAML Ain't Markup Language

What It Is: YAML is a human friendly data serialization
  standard for all programming languages.

Convertir YAML a JSON
ruby -r json -r yaml -e "yaml = YAML.load(File.read('./stack.yml')); print yaml.to_json" > stack.json
