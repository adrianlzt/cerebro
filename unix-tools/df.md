df -a
  mostrar sistemas de ficheros virtuales

df -h
  mostrar con unidades human-readable


df /foo/bar
  nos devuelve el filesystem donde está almacenado el fichero


Diferencia entre size-used y avail
http://www.unixtutorial.org/commands/tune2fs/
Los sistemas de ficheros ext* reservan un porcentaje que solo puede escribir root.
Depende de que punto de montaje, podremos reducir este margen, por ejemplo en /home

Para consultar el valor:



Si queremos ver un listado de los sistemas de ficheros:
findmnt
