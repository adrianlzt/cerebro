/usr/share/zookeeper/bin/zkCli.sh
  nos conecta con un cliente java a localhost:2181

ls /
  mostrar znodes
get /zookeeper
  mostrar información almacenada en el znode /zookeeper
  junto con los datos almacenados se nos mostrarán metadatos (tiempo de creacion, modificacion, ids, versiones, etc)
create /mi_nombre mis_datos
set /mi_nombre nuevos_datos
delete /mi_nombre
