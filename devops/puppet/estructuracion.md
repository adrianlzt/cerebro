Tipicamente:

Paquete -> Configuracion -> Servicio
Install -> Service -> Config

Lo suyo es meter cada clase en un fichero .pp
Y para nombrar:
	sshd/
	sshd/files (aqui meteriamos los ficheros de configuracion, o los cogeriamos del puppet master)
	sshd/manifests
	sshd/manifests/init.pp
	sshd/manifests/service.pp
	sshd/manifests/config.pp
	sshd/manifests/install.pp (este sería class sshd::config)

La idea es que init.pp sería el modificable, y el resto no lo tocaríamos.

En el caso de que tuviesemos una configuracion compleja, podríamos definir una clase para cada uno de estos tres pasos.
En la clase configuracion pondriamos un notify, que en caso de que cualquier fichero de los que están en dicha clase se modificase, el servicio se reiniciase.


Ejemplo:
Install, descomprimir un .tar.gz, ./configure y make
En la clase configure haríamos un require para decir que hasta que no haga todo lo de esa clase no empieze con la configuración.
