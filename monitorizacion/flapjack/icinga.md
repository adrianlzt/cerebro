https://github.com/flpjck/flapjack/wiki/USING#wiki-configuring_nagios


Opción "vieja" para adquirir evento:

Mediante un fifo, donde icinga escribe los host y service:
/usr/bin/mkfifo --mode=0666 /var/cache/icinga/event_stream.fifo
host_perfdata_file=/var/cache/icinga/event_stream.fifo
service_perfdata_file=/var/cache/icinga/event_stream.fifo

Que se configura en /etc/flapjack/flapjack_config.yaml


Opción nueva:
O mediante un broker de icinga que escribe en una bbdd redis
broker_module=/usr/local/lib/flapjackfeeder.o redis_host=localhost,redis_port=6380
