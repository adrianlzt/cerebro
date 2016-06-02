http://zsh.sourceforge.net/Doc/Release/TCP-Function-System.html

Cargar las funciones TCP
autoload -U tcp_open

# Abrir conexion TCP a un host/puerto
tcp_open 127.0.0.1 9123
devuelve en la variable $REPLY el fd abierto

tcp_open IP PUERTO NOMBRE_SESION

Si no puede conectar puede devolver el mensaje
tcp_open:ztcp:174: connection failed: conexión rehusada

O quedarse sin retornar la shell

Tras abrir una conex, si nos envian datos nos aparecerá de esta forma:
%
<-[1] datos recibidos
%

# tcp_send
Podemos enviar datos con tcp_send:
tcp_send -s SESS_ID mensaje

echo -e "uno\ndos" | tcp_send -s 1 -c

# Listar sesiones
tcp_sess

La sessión activa se marca con un asterisco. Será la que se use si no especificamos ninguna.

# Cerrar sesión
tcp_close SESS_ID

# tcp_expect
tcp_expect "*HOLA*"
  retorna la shell cuando encuentre el patrón

En $TCP_LINE nos devolverá la linea completada donde se ha hecho match
En $tcp_expect_lines tendremos todas las lineas recibidas hasta que encontramos el patron

# tcp_proxy
Abrimos un socket tcp y unimos su stdin/stdout a los del socket

Ejemplo:
tcp_proxy 7337 bc
  el puerto 7337 se convierte en una calculadora

# User defined functions
http://zsh.sourceforge.net/Doc/Release/TCP-Function-System.html#TCP-User_002ddefined-Functions

Se pueden definir unas funciones de call-back en caso de que se creen, cierren, hagan alias, etc

# Ejemplo conex http
tcp_open google.es 80
tcp_send -s $REPLY "GET HTTP/1.0\n\n"

# Simular un wget:
zmodload zsh/net/tcp
ztcp google.com 80
fd=$REPLY
print -l -u $fd -- 'GET / HTTP/1.1'$'\015' 'Host: www.google.com'$'\015' 'Connection: close'$'\015' $'\015'
while IFS= read -u $fd -r -e; do; :; done
ztcp -c $fd

# Transferir un fichero
tcp_point 8091 >output_file
tcp_shoot server_que_recibe 8091 <input_file
