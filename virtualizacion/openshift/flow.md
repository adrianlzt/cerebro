Generalmente el orden que se sigue al desplegar algo es:

1. dc (deployconfig): ordenes para desplegar nuestra app
2. bc (buildconfig): se crea la imagen y se pushea el registry
2.1 builds build de la imagen (para el build se crea un pod NOMBRE-N-build)
3. is (imagestream) la imagen en el registry
4. rc (runningconfig) se encarga de levantar los pods en el número que hayamos elegido
5. se levantan los pods (po)
5.1 se levanta un pod con imagen origin-pod (creo que es el que hace los checks de liveness)
5.2 se levanta un pod NOMBRE-N-deploy que controla que se levanten los de la aplicación (ejecuta readinessProbe). Si no lo detecta, reinicia el pod de applicacion. Morira tras comprobar que ha arancado la app
5.3 se levanta el pod de aplicación NOMBRE-N-xxxxx
6. se crea un service para exponer los pods (vip que balancea entre todos los pods)
7. routes, se crea una ruta externa (publicada por el router) que acceder al service


# Git
La idea es que cada vez que se haga un push al repo de git que tenga nuestra app, se lance un webhook contra openshift que haga un nuevo bc.
El dc detecta una nueva imagen en el ImageStream y crea un nuevo rc para desplegar los pods con la nueva versión.
