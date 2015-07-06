http://developerblog.redhat.com/2013/01/28/software-collections-on-red-hat-enterprise-linux/
http://developerblog.redhat.com/2014/12/04/add-packages-to-python-2-7-software-collection/

Es como el RVM de ruby pero a nivel de sistema y para cualquier tipo de software.

Python 2.7
http://people.redhat.com/bkabrda/scl_python27.repo


# Instalación
yum install scl-utils

Listar software collections:
scl -l

Meter python
curl http://people.redhat.com/bkabrda/scl_python27.repo -o /etc/yum.repos.d/scl_python27.repo
yum install python27

scl enable python27 'python -V'
  version de python
scl enable python27 'python -v'
  verbose, nos dice de donde lee las librerias




Convert RPM specfile to be SCL ready.
https://bitbucket.org/bkabrda/spec2scl/


Ejecutar scripts con scl con shebang.
Hace falta hacer un wrapper (https://bugzilla.redhat.com/show_bug.cgi?id=1058796)

/usr/bin/scl-shebang
#!/bin/sh
eval scl $@


/nuestro/programa.py
#!/usr/bin/scl-shebang enable python27 -- python




Para versiones más nuevas se puede usar shebang
This works as of scl-utils-2.0:
#!/usr/bin/scl enable <collection> -- <command>






# SCL internals
Lo que configura si hacemos:
scl enable python27 bash

Importantes:
PATH=/opt/rh/python27/root/usr/bin:$PATH
LD_LIBRARY_PATH=/opt/rh/python27/root/usr/lib64

Menos importantes:
MANPATH=/opt/rh/python27/root/usr/share/man:
PKG_CONFIG_PATH=/opt/rh/python27/root/usr/lib64/pkgconfig
XDG_DATA_DIRS=/opt/rh/python27/root/usr/share
X_SCLS='python27 '



PATH=/opt/rh/python27/root/usr/bin:$PATH LD_LIBRARY_PATH=/opt/rh/python27/root/usr/lib64 ./check_netinterfaces.py 
