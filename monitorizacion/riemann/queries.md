https://github.com/aphyr/riemann/blob/master/test/riemann/query_test.clj
https://github.com/aphyr/riemann/blob/master/resources/query.g4

# Simple equality
state = "ok"

# Wildcards
(service =~ "disk%") or 
(state != "critical" and host =~ "%.trioptimum.com")

# Standard operator precedence applies
metric_f > 2.0 and not host = nil

# Anything with a tag "product"
tagged "product"

# All states
true

# Custom attributes
Usarlos como si fuese un parámetro más. Aunque en el protocolo vayan dentro de la estructura attributes, se llaman directamente en las queries.

'(tagged "icinga" and project = "sm2m")'

# Tiempo
time > 1468410837


