http://www.ubuntu-guia.com/2010/08/dni-e-electronico-ubuntu-instalar.html

sudo apt-get install libccid pcscd libacr38u pinentry-gtk2 pcsc-tools libpcsclite1 libpcsclite-dev libreadline6 libreadline-dev coolkey

Ejecutamos:
# pcsc_scan
E insertamos el DNI, deberá reconocerlo.
...
Possibly identified card (using /usr/share/pcsc/smartcard_list.txt):
3B 7F 38 00 00 00 6A 44 4E 49 65 20 02 4C 34 01 13 03 90 00
3B 7F 38 00 00 00 6A 44 4E 49 65 [1,2]0 02 4C 34 01 13 03 90 00
DNI electronico (Spanish electronic ID card)
http://www.dnielectronico.es


Buscamos el icono "Registar módulo ...".
O abrimos la web: file:///usr/share/opensc-dnie/instal_dnie/instala_modulo.htm
Firefox no me acepta el módulo.

Sigo con la web de ubuntu-guia

http://zonatic.usatudni.es/gl/aplicaciones/asistente-dnie.html -> Zona de descargas
http://zonatic.usatudni.es/instalador-dnie/instalador-dnie
chmod a+x instalador-dnie
./instalador-dnie
Este asistente no funciona


Paso a 2.2 - Compilación del código fuente
Bajo http://www.dnielectronico.es/seccion_integradores/certificados/AVDNIEFNMTSHA2.zip
y http://www.dnielectronico.es/ZIP/ACRAIZ-SHA2.zip

Meto los certicados en google chrome (ACRAIZ en "Entidades Emisoras", y el AVD... en Servidores (aunque lo mueve a otros). Para este último tengo que dar a "Ver todos los ficheros", porque la extensión no le gusta.

sudo apt-get autoremove opensc-dnie
Por que vamos a isntalar una versión distinta, modificada.

Bajamos el código fuente en un directorio que usaremos para compilar el programa:
svn checkout --username anonsvn https://forja.cenatic.es/svn/opendnie/opensc-opendnie/trunk
El password: anonsvn

vi trunk/src/tools/Makefile.am
Lo modificamos para que quede:
LIBS = $(top_builddir)/src/common/libcompat.la \
        $(top_builddir)/src/libopensc/libopensc.la \
	/usr/lib/x86_64-linux-gnu/libltdl.la

cd trunk/
./bootstrap
./configure --prefix=/usr --sysconfdir=/etc/opensc
make
sudo mkdir /etc/opensc
sudo make install

Firefox no me deja meter el modulo (por ser firefox 32bits?)

Intento con chrome: http://caminoenlared.blogspot.com.es/2011/04/archlinux-chromium-y-el-dnie.html

Editamos el archivo: ~/.pki/nssdb/pkcs11.txt y añadimos:
library=/usr/lib/opensc-pkcs11.so
name=OpenSC

Nada no funciona

/etc/opensc/opensc.conf
enable_pinpad = false;
