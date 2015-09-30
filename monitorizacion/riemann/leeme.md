http://riemann.io/

Riemann aggregates events from your servers and applications with a powerful stream processing language. Send an email for every exception raised by your code. Track the latency distribution of your web app. See the top processes on any host, by memory and CPU. Combine statistics from every Riak node in your cluster and forward to Graphite. Send alerts when a key process fails to check in. Know how many users signed up right this second.
Riemann provides low-latency, transient shared state for systems with many moving parts.

La idea es abrir un puerto TCP donde se envian eventos. Cada evento tiene unos campos obligatorios y otros opcionales.
Luego los streams procesan esos eventos para decidir que hacer.


Reinicio lento, necesario al meter cada regla.


Ejemplos:
https://github.com/guardian/riemann-config
https://github.com/jamtur01/riemann.config#other-configurations
