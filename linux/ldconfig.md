http://tldp.org/HOWTO/Program-Library-HOWTO/shared-libraries.html

soname: libXXXX.so.VERSION
La versión cambia cuando cambia el interfaz (cuando deja de ser compatible backwards debido a un cambio de versión de la libreria)


echo "/usr/local/lib" >> /etc/ld.so.conf.d/ffmpeg-libs-x86_64.conf
ldconfig
  actualiza la base de datos de linkado


ldd /usr/bin/nombre
  nos dice a que librerias está dinámicamente linkado
  estas librerias se buscarán según lo que diga ld.so.conf
