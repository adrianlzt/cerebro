http://docs.fluentd.org/v0.12/articles/monitoring#debug-port
https://docs.fluentd.org/v0.12/articles/trouble-shooting#dump-fluentd-internal-information

Expone un puerto donde conectar con "fluent-debug" (dRuby)


Para un container que este corriendo con debug podemos hacer:
docker exec -it 365b8ea6fc9b fluent-debug

irb> Fluent::Engine.methods
cosas que tiene el objeto

irb> Fluent::Engine.flush!
fuerza el flush del buffer


# Arrancar más verboso
fluentd -vv
