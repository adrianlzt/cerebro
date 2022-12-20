https://github.com/jmespath/jp

Parecido a jq.
Usa http://jmespath.org/


# Condicionales
## and
and y obtener solo ciertos valores
people[?age > `20` && name.first == `Bob`].{name: name, age: age}


En files tenemos un array de dicts, filtramos por dos campos y nos quedamos con los otros dos unidos por "/"
log_file: "{{  data['server']['facts']['files'] | json_query(\"[?type=='log' && subtype=='logging config'] | [0] | join('/',[path,name]) \") }}"

