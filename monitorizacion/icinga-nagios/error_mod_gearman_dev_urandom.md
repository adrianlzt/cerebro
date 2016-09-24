El problema es que según se van haciendo reloads a icinga va creciendo el número de file descriptors abiertos a /dev/urandom

Esto es porque la libreria de libuuid tiene una versión vieja.

El workaround es usar restart en vez de reload.
Otros workarounds podrían ser:
  Modificar mod_gearman
  Modificar el código de Icinga para meter el flag RTLD_NODELETE en el dlopen.
  Modificar mod_gearman para cerrar los FDs a /dev/urandom cuando se le ordene hacer un deinit
  Actualizar libuuid (syslinux depende de ella)


https://gist.github.com/06d9a3a88027f4586a430d350720eeed
Pruebas para ver que los FD se quedan abiertos


Resumen del bug:

icinga carga el modulo mod_gearman (https://github.com/Icinga/icinga-core/blob/v1.11.6/base/nebmods.c#L221)
Si se usase el flag RTLD_NODELETE con dlopen se preservarían los static, pero no se que impacto podría tener modificar Icinga a este nivel.


mod_gearman recibe un event handler y pasa la task a libgearman (https://github.com/sni/mod_gearman/blob/v1.5.3/neb_module/mod_gearman.c#L462)

libgearman necesita generar un identificador único para enviarlo al servidor (https://github.com/gearman/gearmand/blob/6d54180c4c8c95ca3ccf0adec8c0d26fbb090cba/libgearman/add.cc#L156)

para generar este identificador único hace uso de libuuid

libuuid usa /dev/urandom para generar estos identificadores únicos, la particularidad es que abre /dev/urandom y lo deja abierto para posteriores usos (almacena el file descriptor en una variable static). (https://github.com/karelzak/util-linux/blob/v2.17.2/shlibs/uuid/src/gen_uuid.c#L139)

La tarea se envia correctamente. Según van llegando más tareas se van generando más uuids con el /dev/urandom ya abierto.

Ahora enviamos un reload a icinga. Este reload descarga mod_geraman (usa dlclose()). dlclose no cierra los FDs que pueda haber abierto mod_gearman, pero si que se fulmina los valores de las variables static. (https://github.com/Icinga/icinga-core/blob/v1.11.6/base/nebmods.c#L372)

Cuando icinga recarga, vuelve a cargar mod_gearman, este llama a libgearman, que llama a libuuid, que vuelve a abrir /dev/urandom, porque ha perdido el FD donde lo tenía abierto
