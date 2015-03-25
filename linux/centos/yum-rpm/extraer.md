rpm2cpio myrpmfile.rpm | cpio -idmv


i: Restore archive
d: Create leading directories where needed
m: Retain previous file modification times when creating files
v: Verbose i.e. display progress


Extraer scripts del rpm:
rpm -qp --scripts some_package.rpm >wherever 

rpm -qp --triggers some_package.rpm >wherever 
