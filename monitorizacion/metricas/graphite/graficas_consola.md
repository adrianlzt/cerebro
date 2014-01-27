Muestra gráficas en la consola tipo histograma.

Dat Spark

brew install spark

curl -H 'Accept: application/json' -s "http://graphite/render/?target=foo&format=json&from=-30min" | json_pp | grep ',' | grep -v '\]' | grep -v target | spark
