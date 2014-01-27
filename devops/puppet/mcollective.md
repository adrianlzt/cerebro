for ssh supervitaminado.

Nosotros enviamos la instrucción a un servidor de colas, y este se encarga de enviar los mensajes a los servidores.
Los mensajes se envían a todos los servidores, y se les puede poner unas condiciones, y solo los que hagan 'match' ejecutarán la instrucción.

mco puppet runonce -F hostname=/test/ -v
Ejecutamos el plugin puppet con mcollective. Existen varios tipos de plugins: puppet, paquetes, etc.
-F define un filtro, en este caso que el hostname tenga la palabra test.
-v verbose


mco rpc rpcutil get_fact fact=memorytotal
Puppet labs ha creado unos cuantos plugins.
Este ejemplo nos da el fact (del facter) de la memoria total.
Nos da el output de cada máquina y luego un resumen general.


mco rpc rpcutil inventory
Información sobre las máquinas. Podemos ver las clases de puppet que tienen cada máquina
