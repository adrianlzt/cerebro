https://github.com/aphyr/riemann-tools/tree/master/bin

gem install riemann-tools


riemann-health
 sends CPU, Memory and load statistics to Riemann


https://github.com/rasputnik/riemannq
CLI escrita en go para hacer queries contra riemann. Responde JSON

Para ver todo lo que tiene riemann:
./riemannquery -s 192.168.2.2:5555 -q "true" | jq '.'

-q '(host = "pepito")'
