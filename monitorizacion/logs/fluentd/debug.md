http://docs.fluentd.org/v0.12/articles/monitoring#debug-port
https://docs.fluentd.org/v0.12/articles/trouble-shooting#dump-fluentd-internal-information

Expone un puerto donde conectar con "fluent-debug" (dRuby)


Para un container que este corriendo con debug podemos hacer:
docker exec -it 365b8ea6fc9b fluent-debug

irb> Fluent::Engine.methods
cosas que tiene el objeto

irb> Fluent::Engine.flush!
fuerza el flush del buffer

Acceso a los inputs:
irb> Fluent::Engine.root_agent.inputs[0]
 .display para ver que plugin es

Acceso a los inputs:
irb> Fluent::Engine.root_agent.outputs[0]
 .display para ver que plugin es
 .buffer
 .buffer.queue_size (no me cuadra con lo que dice el output del monitoring)
 .buffer.stage_size (esto cuadra con el monitoring buffer_total_queued_size)
 .buffer.queued_num (monitoring buffer_queue_length, aunque aqui nos da un struct dividiendo los mensajes por tag)
 .buffer.queue[0].display (primer elemento de la queue)
 .buffer.queue[0].size
 .buffer.queue[0].bytesize
 .buffer.queue[0].read (lo más aproximado a leer el contenido)


# Arrancar más verboso
fluentd -vv
