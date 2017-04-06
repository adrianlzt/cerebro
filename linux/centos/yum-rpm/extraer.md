rpm2cpio myrpmfile.rpm | cpio -idmv


i: Restore archive
d: Create leading directories where needed
m: Retain previous file modification times when creating files
v: Verbose i.e. display progress


Extraer un único fichero:
rpm2cpio logrotate-1.0-1.i386.rpm |cpio -ivd etc/logrotate.conf



Extraer scripts del rpm:
rpm -qp --scripts *.rpm > scripts
rpm -qp --triggers *.rpm > triggers
