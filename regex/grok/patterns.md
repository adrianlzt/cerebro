## PATTENRS ##
Para usar los basic patterns, en ubuntu:

program {
  load-patterns: "/usr/share/grok/patterns/base"

Mirar ese fichero para todos los patterns disponibles.
Algunos comunes son:
NUMBER
WORD
HOST
PATH
YEAR MONTH DAY HOUR MINUTE
DATE


Para usarlos
match {
  pattern: "La suma da %{NUMBER}. Operacion hecha por %{WORD:nombre}"
  reaction: "%{nombre} suma %{NUMBER}"


Patterns de logstash: https://github.com/elasticsearch/logstash/tree/master/patterns
