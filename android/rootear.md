http://www.shuame.com/en/root/


Xperia Neo V:

Android 2.x
  Ejecutar paso por paso lo que pone en el .bat de DooMLoRD_v4_ROOT-zergRush-busybox-su.zip
  
  Mas sencillo, abrir el flashtool, dar al boton de rootear (candado abierto) y elegir la primera opción.

Android 4.x
  http://www.htcmania.com/showthread.php?t=445750
  Hace falta flashear el kernel Kernel 4.1.A.0.562 (http://www.mediafire.com/?gwe739kn5mcx56t)
  Seguir el script de DooMLoRD. Lo hago a mano.


Parece que si ponemos esto y luego reiniciamos, arranca en root
echo "ro.kernel.qemu=1" > /data/local.prop


Moto G - Lollipop:
http://www.ibtimes.co.uk/how-root-moto-x-moto-g-1st-2nd-gen-models-android-5-0-lollipop-1474981
http://www.androidpit.es/como-rootear-motorola-moto-g

Hace falta desbloquear el bootloader, esto borra todo el teléfono.



# adb con root
Settings -> Developer options -> Root access
