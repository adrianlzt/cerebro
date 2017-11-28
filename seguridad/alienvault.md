Escaner de seguridad

Imagen opensource:
https://dlcdn.alienvault.com/AlienVault_OSSIM_64bits.iso


La iso no instala bien, se queda colgada en "Configuring suricata"
workaround aqui: https://www.alienvault.com/forums/discussion/15697/hyper-v-install-hanging-configuring-suricata

Se queda colgado porque dpkg requiere acción del usuario.
El truco es enviar al stdin del dpkg el comando "N" para que siga.
Es necesario enviar el "N" varias veces y tal vez a distintos dpkgs.
