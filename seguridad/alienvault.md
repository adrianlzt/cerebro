Escaner de seguridad

Imagen opensource:
https://dlcdn.alienvault.com/AlienVault_OSSIM_64bits.iso


La iso no instala bien, se queda colgada en "Configuring suricata"
workaround aqui: https://www.alienvault.com/forums/discussion/15697/hyper-v-install-hanging-configuring-suricata

Se queda colgado porque dpkg requiere acción del usuario.
El truco es enviar al stdin del dpkg el comando "N" para que siga.
Es necesario enviar el "N" varias veces y tal vez a distintos dpkgs.

echo N > /proc/$(pidof dpkg)/fd/0


Una vez arranque podemos entrar en la shell con root:root
En el .bashrc hay un programa para arrancar un gestor grafico
Podemos usar la opción "JailBreak" para salir a la consola.

Iptables esta configurado solo permitiendo ciertas cosas.

ossim-reconfig
  reinicia todos los servicios que tiene la imagen


Para conseguir arrancar la imagen sin muchos problemas lo que hice fue dejar en el rc2.d solo los servicios del sistema y luego correr el ossim-config para que metiese los basicos de alienvault.

Interfaces de red:
 - la primera interfaz será la interfaz web
 - el resto de interfaces se podrán usar para escanear la red o recolectar logs
 - por defecto ossim pone ip fija a la primera interfaz. Modificar en /etc/network/interfaces y poner varias lineas para configurar las interfaces que aparezcan con dhcp
