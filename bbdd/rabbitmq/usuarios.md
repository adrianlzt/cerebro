rabbitmqctl add_user tools PASSWORD
rabbitmqctl set_user_tags tools monitoring
rabbitmqctl set_permissions tools ".*" ".*" ".*"

rabbitmqctl list_users


rabbitmqctl list_permissions


# Hacer backup de usuarios y roles (NO permisos)
mirar mnesia.md

rabbitmqctl eval "Users = mnesia:dirty_select(rabbit_user, [{ {internal_user, '\\\$1', '_', '_'}, [{'/=', '\\\$1', <<\"guest\">>}], ['\\\$_'] } ]),file:write_file(\"/tmp/users.erl\", io_lib:fwrite(\"~p.~n\", [Users]))."                                       

Guarda en /tmp/users.erl :
[{internal_user,<<"tools">>,<<208,107,38,130,42,254,38,18,56,222,72,149,80,180,166,212,30,153,207,214>>,[monitoring]}].
