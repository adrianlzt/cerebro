Permisos más finos para ficheros.
En ext4 viene por defecto.

Obtener ACL:
getfacl <file> 
  Si nos sale líneas: #effective, es que la máscara de ACL está afectando a la definición de la ACL

Si un fichero tienen definido ACL, al hacer 'ls -la' tendrá un '+' al final de la definición de los permisos.

Definir ACL:
setfacl -m u:nrpe:rw <file>
setfacl -m u:cyclops:r <file>
  Permitimos que el usuario nrpe tenga acceso de escritura y lectura al fichero
setfacl -m g:nrpe:r <file>
  Permitimos que el grupo nrpe tenga acceso de lectura al fichero

Borrar una acl:
  setfacl -x u:nrpe <file>

Borrar todas las acl:
  setfacl -b <file>

Definir máscara:
setfacl -m m::r <file>
  Solo permitimos que las ACL como mucho tengan permiso de lectura
