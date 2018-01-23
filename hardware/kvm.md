Conectar a un host usando un KVM (keyboard, monitor and mouse)

Los hay por IP http://www.lantronix.com/wp-content/uploads/pdf/SpiderView_UG.pdf
Para este de lantronix, para funcionar en linux necesitaremos icedtea para abrir el jlnp que imita la terminal
javaws fichero.jlnp


Si da problemas de seguridad chequear: https://unix.stackexchange.com/questions/143805/running-unsigned-javaws-code
netx: Initialization Error: Could not initialize application. (Fatal: Application Error: Cannot grant permissions to unsigned jars. Application requested security permissions, but jars are not signed.)
Comentar todas las lineas de jdk.jar.disabledAlgorithms en /etc/java-7-openjdk/security/java.security /etc/java-8-openjdk/security/java.security

Si queremos entrar en la bios de un sistema, tendremos que dar al "Del" un poco antes de que aparezca en la pantalla, porque con el retardo del kvm si no no le llegará el keystroke a tiempo.

Si el spider tiene USB y la máquina no carga el USB hasta que llegue al SO, no funcionará el teclado y ratón en la bios y grub.
Para estos casos, por ejemplo para configurar la BIOS, usar una spider por PS/2.
O alimentarla externamiente (esto se puede?)

Opción sencilla, a mano entrar hasta la bios y luego conectar el KVM spider

Si no podemos escribir algun caracter, probar a cambiar nuestro teclado al ingles
setxkbmap en_US
