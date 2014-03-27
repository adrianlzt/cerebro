http://docs.puppetlabs.com/references/3.3.1/man/filebucket.html

Recuperar ficheros borrados por puppet.

Para saber donde guarda los ficheros:
puppet config print clientbucketdir


Hacer backup de un fichero:
# puppet filebucket backup mifichero
mifichero: e4d7c51fbad602aaefb7ddf88f8aa22d

Ver contenido del fichero backuped
# puppet filebucket get e4d7c51fbad602aaefb7ddf88f8aa22d

Restaurar el fichero a un path determinado 
# puppet filebucket restore /tmp/prueba e4d7c51fbad602aaefb7ddf88f8aa22d


Si queremos usar ficheros almacenados en el bucket local:
puppet filebucket -l --bucket /var/lib/puppet/clientbucket/ get f4baad69ae506dc41453b08dee3752d1


Los ficheros se almacenan en /var/lib/puppet/clientbucket/
Los directorios son las primeras letras del md5
Tendremos un fichero donde se almacena el path donde estaba el fichero y otro donde se almacena el contenido.

find /var/lib/puppet/clientbucket -iname "paths" -exec grep -Hn PATH {} \;
Con esta búsqueda encontramos los ficheros que estuviesen en PATH y puppet los borró
