http://refspecs.linuxbase.org/LSB_3.1.1/LSB-Core-generic/LSB-Core-generic/iniscrptact.html
http://www.thegeekstuff.com/2012/03/lsbinit-script/
https://gist.github.com/naholyr/4275302
https://wiki.debian.org/LSBInitScripts

LSB is a project to standardize the software system structure, including the filesystem hierarchy used in the Linux operating system. The LSB is based on the POSIX specification, the Single UNIX Specification (SUS), and several other open standards, but extends them in certain areas.


Scripts de init.d

If the status action is requested, the init script will return the following exit status codes.

0	program is running or service is OK
1	program is dead and /var/run pid file exists
2	program is dead and /var/lock lock file exists
3	program is not running
4	program or service status is unknown
5-99	reserved for future LSB use
100-149	reserved for distribution use
150-199	reserved for application use
200-254	reserved


Pruebas para ver si un script es LSB
http://clusterlabs.org/doc/en-US/Pacemaker/1.1/html/Pacemaker_Explained/ap-lsb.html

# Python
https://lionfacelemonface.wordpress.com/2009/12/29/python-init-scripts/
Escribir un script de init.d en python

# Funciones
http://refspecs.linuxbase.org/LSB_3.1.0/LSB-Core-generic/LSB-Core-generic/iniscrptfunc.html
