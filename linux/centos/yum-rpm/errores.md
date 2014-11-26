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
