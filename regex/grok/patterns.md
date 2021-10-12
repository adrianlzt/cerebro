Patterns de logstash:
https://github.com/logstash-plugins/logstash-patterns-core/blob/master/patterns/ecs-v1/grok-patterns

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


Apache combined:
COMBINEDAPACHELOG


TIMESTAMP_ISO8601
2015-06-11T23:59:56.489+0200
