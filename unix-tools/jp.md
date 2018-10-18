https://github.com/jmespath/jp

Parecido a jq.
Usa http://jmespath.org/


# Condicionales
## and
and y obtener solo ciertos valores
people[?age > `20` && name.first == `Bob`].{name: name, age: age}
