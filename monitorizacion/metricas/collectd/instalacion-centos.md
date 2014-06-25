https://collectd.org/wiki/index.php/First_steps

Se debe usar la versión 5.x de collectd. En los repos oficiales de 6.4 solo viene la 4.x

RPMs actualizados se encuentran en http://pkgs.repoforge.org/collectd/
Utilizo: http://pkgs.repoforge.org/collectd/collectd-5.1.0-1.el6.rft.x86_64.rpm
Tiene como dependencia a perl-Collectd-5.1.0-1.el6.rft.x86_64.rpm


Si puedo acceder al repo desde la máquina, lo instalo:
rpm -Uvh http://pkgs.repoforge.org/rpmforge-release/rpmforge-release-0.5.3-1.el6.rf.x86_64.rpm
Y activo el rpmforge-extra y rpmforge-testing /etc/yum.repos.d/rpmforge.repo
Collectd 5.1.0 está en rpmforge-testing.
También instalamos EPEL

Instalación:
yum install collectd perl-Compress-Raw-Zlib-2.052-1.el6.rfx.x86_64


Usando estos repos no puedo usar el plugin ping, porque no viene instalado.
En los repos de redhat tienen un paquete específico para poder usar el plugin ping, pero para la versión 4 de collectd.

Hace falta instalarlo sin comprobar las claves: yum install --nogpgcheck collectd
Tambien instalamos collectd-rrdtool para usar fichero rrd


Seguir por "configuracion.md"
