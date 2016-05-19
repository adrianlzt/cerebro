http://erlang.org/doc/man/mnesia.html

Info del sistema:
rabbitmqctl eval "mnesia:info()."
rabbitmqctl eval "mnesia:system_info()."

Lista de claves de una tabla:
rabbitmqctl eval "mnesia:dirty_all_keys(rabbit_user)."

Dump de todas las tablas a un fichero:
rabbitmqctl eval "mnesia:dump_to_textfile('\/tmp\/test')."

Dump de los usuarios:

rabbitmqctl eval "mnesia:dirty_select(rabbit_user, [{ {internal_user, '\\\$1', '_', '_'}, [], ['\\\$_'] } ])."

Dump de los usuarios sin el user guest
rabbitmqctl eval "mnesia:dirty_select(rabbit_user, [{ {internal_user, '\\\$1', '_', '_'}, [{'/=', '\\\$1', <<\"guest\">>}], ['\\\$_'] } ])."

Permisos de los usuarios:
rabbitmqctl eval "mnesia:dirty_select(rabbit_user_permission, [{ {'_', '_', '_'}, [], ['\\\$_'] } ])."

Asignar cada uno de los elementos (valor, tupla, tupla) a una variable:
rabbitmqctl eval "mnesia:dirty_select(rabbit_user_permission, [{ {'\\\$1', '\\\$2', '\\\$3'}, [{'/=', '\\\$2', <<\"guest\">>}], ['\\\$_'] } ])."

Permisos de los usuarios sin el user guest:
rabbitmqctl eval "mnesia:dirty_select(rabbit_user_permission, [{ {'\\\$1', '\\\$2', '\\\$3'}, [{'/=', '\\\$2', {{user_vhost,<<\"guest\">>,<<\"/\">>}}}], ['\\\$_'] } ])."


mnesia:dirty_select(
   rabbit_user,
              [
                 {
                    {internal_user, '\\\$1', '_', '_'},
                    [
                       {'/=', '\\\$1', <<\"guest\">>}
                    ],
                    ['\\\$_']
                 }
              ]
)."

select(Tab, MatchSpec)

MatchSpec = [{MatchHead, [Guard], [Result]}]
  MatchHead -> donde buscar
  Guard -> Filtramos para sacar solo lo que queremos
  Result -> Que sacar por pantalla


MatchHead = {internal_user, '\\\$1', '_', '_'}
Guard = {'/=', '\\\$1', <<\"guest\">>}
Result = '\\\$_'

$$ gets results as lists
$_ gets the original data objects



{rabbit_user_permission,{user_vhost,<<"tools">>,<<"/">>},
                        {permission,<<".*">>,<<".*">>,<<".*">>}}.

{rabbit_user,<<"tools">>,
             <<208,107,38,130,42,254,38,18,56,222,72,149,80,180,166,212,30,153,
               207,214>>,
             [monitoring]}.



Backup de usuarios y permisos:
rabbitmqctl eval "Users = mnesia:dirty_select(rabbit_user, [{ {internal_user, '\\\$1', '_', '_'}, [{'/=', '\\\$1', <<\"guest\">>}], ['\\\$_'] } ]),file:write_file(\"/tmp/users.erl\", io_lib:fwrite(\"~p.~n\", [Users]))."

rabbitmqctl eval "Users = mnesia:dirty_select(rabbit_user_permission, [{ {'\\\$1', '\\\$2', '\\\$3'}, [{'/=', '\\\$2', {{user_vhost,<<\"guest\">>,<<\"/\">>}}}], ['\\\$_'] } ]),file:write_file(\"/tmp/users_perms.erl\", io_lib:fwrite(\"~p.~n\", [Users]))."


Restaurar backup de users y permisos:
rabbitmqctl eval "{ok, [Users]} = file:consult(\"/tmp/users.erl\"),lists:foreach(fun(X) -> mnesia:dirty_write(rabbit_user, X) end, Users)."

rabbitmqctl eval "{ok, [Users]} = file:consult(\"/tmp/users_perms.erl\"),lists:foreach(fun(X) -> mnesia:dirty_write(rabbit_user_permission, X) end, Users)."
