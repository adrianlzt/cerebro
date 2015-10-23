https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/7/html/Power_Management_Guide/Tuned.html

Herramienta de tuning de RedHat.
Es un demonio (tuned) y una herramienta de cliente (tuned-adm)

Los perfiles traen los parámetros recomendados por redhat para cada uno de los tipos de sistema.

Debemos tener arrancado el demonio tuned:
service tuned start


tuned-adm list
  Perfiles disponibles para hacer tunning. 
    Por ejemplo podríamos tener dos perfiles, uno para el día (velocidad de acceso) y otro de noche (tareas batch)

tuned-adm profile NOMBRE
  Cambiar el profile

tuned-adm active
  Cual estamos usando

tuned-adm recommend
  Cual nos recomienda


Que hace cada perfil:
/usr/lib/tuned/


  cpu - governor:
    performance: a tope la cpu, da igual gastar más energía

  vm - transparent_hugepages
    always: viene bien para un server

  disk - readahead
    cuantos bloques lee de más al hacer un acceso a disco

Tabla comparativa para RHEL6.3: http://staff.ie.cuhk.edu.hk/~sfluk/wordpress/wp-content/uploads/2013/06/qfLhG.png


Chequear en el log /var/log/tuned/tuned.log que no de errores.
  Puede que de fallos porque falle algun binario (hdparm por ejemplo: yum install hdparm)
