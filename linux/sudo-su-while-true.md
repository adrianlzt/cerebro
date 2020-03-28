Por qué al salir de ssh cuando hemos puesto un "sudo su" y luego un "while true", no se cierra lo que teníamos corriendo:

Al salir de ssh abruptamente se envia una señal de cierre a la shell.
Esta la intenta propagar a sus hijos, pero como hemos ejecutado "sudo su", ese PID hijo de nuestra shell está como user root, por lo tanto nuestra shell no lo puede matar.
El kill también llega al último proceso corriendo, típicamente el sleep, que morirá, pero como tiene un while true por encima, pues seguirá corriendo.


Formas que si salimos del ssh abruptamente no mueren:
sudo su / while true; do sleep 999; done
sudo su -s / while true; do sleep 999; done
su -s / while true; do sleep 999; done
sudo /bin/bash / while true; do sleep 999; done

Cuando salimos, se mata el sleep, pero como está en un while, se vuelve a ejecutar


Formas que si mata todo al salir:
sleep 999
while true; do sleep 999; done
sudo -s / sleep 999
sudo /bin/zsh / while true; do sleep 999; done
while true; do sudo sleep 999; done
