https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/6/html/Deployment_Guide/sec-Working_with_Yum_Cache.html

yum clean expire-cache
  borra las fechas de los metadata, forzando a comprobar que la metadata que tiene es la que está en remoto (pero sin bajarla si es igual)
  ESTE sera el que queramos usar generalmente
  Podemos ver la configuración de cuando expiran con (aparece la fecha de la última expiración + los segundos que expirará):
  yum repolist enabled -v | grep 'Repo-name\|expire'
  La fecha que usa yum para saber si debe refrescar:
  stat -c %y /var/cache/yum/x86_64/7/base/cachecookie

  Si hacemos un "clean expire-cache" y luego hacemos un "yum info ..." forzaremos la descarga de "repomd.xml" donde yum comprobará si tiene los últimos ficheros.


yum clean packages
  elimina packages cached

yum clean headers
  deprecated

yum clean metadata
  borrar el metadata (lo usa yum para ver si estan disponibles los rpms en remoto)

yum clean dbcache
  borra la bbdd sqlite, se la baja la proxima vez, pero no aplica para repos con solo xml

yum clean rpmdb
  borrar cache de la rpmdb

yum clean plugins
  borra cache de los plugins yum

yum clean all
  borra todo lo anterior
