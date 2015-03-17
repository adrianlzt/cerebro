http://linux-pam.org/Linux-PAM-html/Linux-PAM_SAG.html
http://linux-pam.org/
http://wpollock.com/AUnix2/PAM-Help.htm
man pam_xxx

pam_pruebas.md para ejemplos sencillos, testeando con un programa en python
pam_explicaciones.md para descripciones de texto de distintos ficheros pam

PAM solventa el problema de autenticar usuarios en un sistema, haciendo de capa intermedia entre los programas y los métodos de autenticación (/etc/passwd, NIS, LDAP, etc).

Para comprobar si un programa usa PAM:
ldd /usr/bin/passwd | grep libpam.so

Existen módulos PAM para variedad de cosas: mostrar MOTD, corregir permisos /dev para que los usuarios puedan tener sonido, etc

Cada fichero de texto (policy) lista una serie de modulos que se van a utilizar para el login (stack), pam va probando cada uno secuencialmente.
Los módulos pueden ser inteligentes y denegar el acceso por ejemplo según la hora del día o la carga del sistema.
Cada módulo puede retornar succcess o failure, luego con control-flag determinaremos que combinación de estos permite o deniega el acceso.

Cada programa intetará buscar su policy, si no la encuentra, usará 'other'. Es importante tener este fichero.


Listado de módulos:
ls /lib/security
Cada modulo pam implementa una o más de las funciones estandar, estas funciones están agrupadas en:
account
  pam_sm_acct_mgmt()
auth
  pam_sm_authenticate()
session
  pam_sm_open_session()
  pam_sm_close_session()
password
  pam_sm_chauthtok()

Para ver lo que implementa un módulo:
mirar doc o ejecutar el comando
nm --dynamic --defined-only /lib/security/pam_unix.so | cut -d ' ' -f 3


Formato de las policy
context/type    control-flag    module  module-options
# comentarios, lineas en blanco permitidas
# con un - delante no genera logging, usado para modulos que pueden no estar disponibles
-context/type    control-flag    module  module-options

context: nos dice cuando se va a usar el módulo, auth, account, password update, session setup/cleanup
control-flag: como actuar antes un pass/fail del módulo


Advanced syntax: http://wpollock.com/AUnix2/PAM-Help.htm
type    [value=action value=action ...] module options
Los módulos pueden devolver muchos valores. Aqui especificamos que acción tomar según el código devuelto:

Ejemplos implementado los control-flags estandar con esta nueva sintaxis:
required   [success=ok new_authtok_reqd=ok ignore=ignore default=bad]
requisite  [success=ok new_authtok_reqd=ok ignore=ignore default=die]
sufficient [success=done new_authtok_reqd=done default=ignore]
optional   [success=ok new_authtok_reqd=ok default=ignore]



@include otro-fichero #visto en debian



Para ejecutar un programa se mirarán los context: auth (autenticación: quien es el usuario y si tiene una cuenta válida) y account (autorización: decidir si el usuario tiene permiso para acceder)

Generalmente una policy sigue como:
auth: comprobar que el usuario tiene cuenta (cosas sobre el nombre de usuario)
account: mirar si está autorizado (cosas sobre la password)
session: cargar cosas para su sesión
(passwd: en caso de que sea para cambiar una contraseña)
session: para hacer cleanup

A cada módulo se le pasan información sobre la petición, el usuario y los parámetros que hayamos puesto.

# Orden
required A
sufficient B
required C
  pasa si A&&B o A&&C

sufficient A
required B
required C
  pasa si A o B&&C


# Control flags
sufficient: si este módulo es ok, no se chequea nada más. Si es no-ok se sigue con el resto
include: leen otro fichero, estilo redhat (tambien con @include al comienzo de línea, debian)
required: es ok si todos los modulos required son ok. Si uno falla, el resto tambien se comprueban, para no dar info de que fallo
requisite: como include, pero si falla este modulo pasa el control al programa o al stack superior directamente, sin check otros req
optional: se ejecuta para hacer tareas no imporantes (motd). solo se usa como control de acceso si es el único de si tipo en todo el stack

# Explicación de algunos módulos típicos
pamn_unix: hace diferentes funciones según que componente
           auth: comprueba que el password es correcto
           account: comprueba si debe cambiar la password (expire, last_change, etc del shadow)
           session: escribe en el log si el usuario ha entrado o salido
           password: actualiza la password del usuario
pam_rootok: ok si es el usuario root (no deja pasar a programas son setuid, porque chequea el real UID)
pam_timestamp: cache, almacena el resultado de una autenticación anterior (300s por defecto, directorio /var/run/sudo/UID/pts.loginname)
               este modulo va a mirar el timestamp de ese fichero, pero ni lo va a crear ni a actualizar
pam_stack: leen otro fichero (parece que ahora se hace con el control-flag include)
pam_permit: always permit access. It does nothing else. The auth, account, password and session module types are provided.
pam_deny: It always indicates a failure. It might be suitable for using for default (the OTHER) entries.
pam_time: control de usuarios segun hora, configuracion en /etc/security/time.conf. Solo para account
pam_env: carga variables de entorno definidas en /etc/security/pam_env.conf, /etc/environment y $HOME/.pam_environment
pam_limits: aplica límites a los users segun /etc/security/limits.conf /etc/security/limits.d/*.conf. Solo session.
pam_tally: mantiene un registro de logins erroneos. Mirar pam_tally.md
pam_cracklib y pwquality: leer notas acerca de su funcionamiento http://wpollock.com/AUnix2/PAM-Help.htm#cracklib


# Que policy usa un programa
En http://wpollock.com/AUnix2/PAM-Help.htm hay unos ejemplos de como hacerlo, pero no me ha funcionado.

# Debug
Parece que a todos los módulos se les puede poner el parámetro 'debug' para que nos den más información.




# Módulos externos
Módulo CAPTCHA para pam: http://www.semicomplete.com/projects/pam_captcha/
Screenshot: http://www.semicomplete.com/images/pamchallenge.png
