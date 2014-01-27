http://www.mail-archive.com/graphite-dev@lists.launchpad.net/msg00411.html
http://bazaar.launchpad.net/~zirpu/graphite/admob.branch/files/head:/graphite_local_proxy/

Graphite local proxy. Useful to collect metric, install on each server to collect metric from localhost and forward to configured rabbitmq exchange.

This is a generic version of a local proxy being used at AdMob.com
for sending metrics from hosts to the local graphite rabbitmq service.
We use carbon-cache agent to pull only from the rabbitmq service, and
this localhost proxy enables us to scale the graphite service more
easily.

