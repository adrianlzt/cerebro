Administración:
  rabbitmqctl
  rabbitmqadmin (en este dir, no viene con la distrib)
  Lo mas sencillo es hacer las cosas desde la interfaz web

http://www.rabbitmq.com/man/rabbitmqctl.1.man.html

rabbitmqctl status
Saldida JSON de que está corriendo, versiones, memoria, etc

Si reiniciamos el servidor no se pierden los mensajes en la cola.


Creo user: rabbitmqctl add_user graphite amqp-password
Creo vhost: rabbitmqctl add_vhost graphite  
Doy permisos la user en el vhost: rabbitmqctl set_permissions -p graphite graphite ".*" ".*" ".*"
Permisos: conf write read
  todo: .*
  nada: ^$


Cambiar password: rabbitmqctl change_password guest password
Poner un user como administrador: rabbitmqctl set_user_tags tools administrator
Para poder hacer monitoring: rabbitmqctl set_user_tags tools monitoring
  mas perfiles de management plugins: https://www.rabbitmq.com/management.html

Ver permisos:
rabbitmqctl list_permissions

Borrar permisos al user tools en el vhost /
rabbitmqctl clear_permissions -p "/" tools

Lista usuarios:
rabbitmqctl list_users

Borrar usuario:
rabbitmqctl delete_user tools



rabbitmqctl list_vhosts
rabbitmqctl list_exchanges -p graphite
rabbitmqctl list_queues -p graphite
rabbitmqctl list_bindings | column -t
   mostrar relaciones entre exchanges y queues
   Si es de tipo topic veremos:
      NOMBRE_EXCHANGE    exchange    TOPIC_regex    queue   NOMBRE_COLA
rabbitmqctl list_connections -p graphite


## Tools
apt-get install amqp-tools
yaourt -S librabbitmq-c

Creo una cola
amqp-declare-queue -q pepito --vhost=graphite --username=graphite --password=graphite

Le pongo un dato
amqp-publish --vhost="graphite" --username="graphite" --password="graphite" -r "pepito" -b "collectd.metrica 12312 2341312312"

Muestro datos en la cola
rabbitmqctl list_queues -p graphite

Consumo los datos que lleguen a esa cola
amqp-consume --vhost="graphite" --username="graphite" --password="graphite" -q pepito cat

Borrar la cola
amqp-delete-queue -q pepito --vhost=graphite --username=graphite --password=graphite


Para ver datos usar la interfaz web: webinterface.md


# como funciona rabbitmqctl
Ejecuta /usr/lib/rabbitmq/bin/rabbitmqctl como usuario rabbitmq
Esto en realidad ejecuta:
erl -pa /usr/lib/rabbitmq/lib/rabbitmq_server-3.3.5/sbin/../ebin -noinput -hidden -sname rabbitmqctl4312 -boot start_clean -s rabbit_control_main -nodename rabbit@prod-epg-ostkc-01 -extra list_vhosts

Esto usa /usr/lib/rabbitmq/lib/rabbitmq_server-3.3.5/ebin/rabbit_control_main.beam
https://github.com/rabbitmq/rabbitmq-server/blob/e6a555e438adc6b5106f5cab3d56a208569e768a/src/rabbit_control_main.erl

call(Node, {rabbit_vhost, info_all, []}) https://github.com/rabbitmq/rabbitmq-server/blob/rabbitmq_v3_3_5/src/rabbit_control_main.erl#L387
rpc_call(Node, Mod, Fun, lists:map(fun list_to_binary_utf8/1, Args)). rpc_call(Node, Mod, Fun, lists:map(fun list_to_binary_utf8/1, Args)).
rpc:call(Node, Mod, Fun, Args, ?RPC_TIMEOUT). https://github.com/rabbitmq/rabbitmq-server/blob/rabbitmq_v3_3_5/src/rabbit_control_main.erl#L728

Pregunta a epmd donde esta rabbit corriendo
Luego conecta con rabbit
