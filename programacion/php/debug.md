http://psysh.org/
parecido a bpython + pdb en python

# A mano
Para sacar valores por la consola de error:
error_log("intReturn1: $intReturn1 FIN", 0);

echo "mensaje ".$variable";

Tambien se puede poner directamente
print_r($array) y nos sacará el valor en el navegador


Si queremos sacar los errores de php a un fichero de log:
  Creamos el fichero, dándole permisos de escritura al usuario de apache (en RHEL):
  touch /var/log/httpd/php.log
  chown apache:apache /var/log/httpd/php.log

  Definimos donde esta dicho fichero en la configuración de php (/etc/php.ini)
  error_log = /var/log/httpd/php.log

  Reiniciamos apache: service httpd restart



Escribir cosas en un fichero temporal:
 $myfile = fopen("/tmp/testfile.txt", "w");
 fwrite($myfile, $dsn);



Tipo de objecto:
gettype($client)


Obtener metodos de un objeto:
get_class_methods($client)

Los podremos llamar como:
$client->nombre()

