https://www.haproxy.com/documentation/hapee/1-8r1/onepage/intro/#3.5
https://cbonte.github.io/haproxy-dconv/2.0/management.html#7
https://cbonte.github.io/haproxy-dconv/2.0/management.html#6

Calculando el uso y parámetros necesarios


Mejor pocos cores muy rápidos:
Having more cores rarely helps (except for TLS) and is even counter-productive due to the lower frequency. In general a small number of high frequency cores is better.

Cuanta más memoria, más conexiones simultáneas aguantará (mirar config "maxconn")
