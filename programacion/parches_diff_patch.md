Mirar quilt como opción.
Es lo que usa debian para sus pkgs
http://www.shakthimaan.com/downloads/glv/quilt-tutorial/quilt-doc.pdf



# http://www.cyberciti.biz/faq/appy-patch-file-using-patch-command/

diff -Naur standard_moodle my_moodle > patch.txt

patch < /path/to/file
  para hacerlo así el fichero debe decir a quien va a patchear
  En principio buscará ficheros definidos desde root /dir/fichero
  Si nuestros ficheros estan definidos tipo a/direct/fichero, para que ignore ese "a/" pondremos patch -p1

Otra opción
patch fichero_a_parchear < parche


patch -N -r - fichero < parche
  para hacer la operacion idempotente
  -N permite aplicar dos veces el mismo parche
  -r -, envia la salida de -N a /dev/null

Si falla y no vemos diferenias, probar con --ignore-whitespace
