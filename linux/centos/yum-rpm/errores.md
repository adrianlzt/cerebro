Freeing read locks for locker
  Ejecutar yum clean



# https://access.redhat.com/solutions/24282
Error in PREIN scriptlet in rpm package 1:gearmand-server-0.33-2.x86_64
error: %pre(gearmand-server-1:0.33-2.x86_64) scriptlet failed, exit status 6
error:   install: %pre scriptlet failed (2), skipping gearmand-server-1:0.33-2

Error in PREIN scriptlet in rpm package 1:gearmand-server-0.33-2.x86_64
error: %pre(gearmand-server-1:0.33-2.x86_64): macro de ejecución de guión fallido, estado de terminación 6
error:   install: scriptlet %pre fallido (2), omitiendo gearmand-server-1:0.33-2

Analizar el rpm:
yumdownloader gearmand-server
rpm -qp --scripts gearmand-server*.rpm

Instalar el rpm en modo verboso:
rpm -ivvvh gearmand-server*.rpm

Instalar el rpm sin los scripts:
rpm -ivvh package-name-version.arch.rpm --noscripts

O desinstalar:
rpm --erase package-name-version.arch.rpm --noscripts



Error unpacking rpm package package-1.1.0-20151028161843.4e81cafb.noarch
error: unpacking of archive failed on file /usr/lib/python2.7/site-packages/package-1.1.0-py2.7.egg-info: cpio: rename
Parece un bug de rpm:
http://www.redhat.com/archives/rhl-devel-list/2007-August/msg01626.html
https://bugzilla.redhat.com/show_bug.cgi?id=1177479
