# manuales
http://www.rpm.org/max-rpm/s1-rpm-depend-manual-dependencies.html



# automaticas
http://www.rpm.org/max-rpm/s1-rpm-depend-auto-depend.html

RPM ejecuta ldd en cada fichero ejecutable de la lista de %files y pone, automáticamente, como dependencia las shared libraries que encuentre que necesitan dichos ejecutables.


AutoReqProv: no
Para no que haga el procesado automático de dependencias.



# Python
Para poner una versión determinada hacer:
Requires: python(abi) = 2.7
