https://fly.io/

Despliegue de contenedores

Deploy App Servers
Close to Your Users
Run your full stack apps (and databases!) all over the world. No ops required.


https://fly.io/docs/signup-welcome/


# Regions
Donde podemos desplegar
https://fly.io/docs/reference/regions/

"mad" madrid


# Desplegar
Podemos desplegar a partir de un Dockerfile o de código en distintos lenguajes.

Si ejecutamos
fly launch
Intentará detectar que queremos ejecutar, nos pedirá nombre, donde, etc.

Podemos detener el despliegue al final, con lo que nos generará el fichero fly.toml con las características de nuestro proyecto.

Cuando tenemos todo listo:
fly deploy


# Datos permanentes
Crear volúmenes o usar postgres o redis.

## Volúmenes
Una vez tenemos el fly.toml

Crear un volumen:
fly volumes create timeoff_sqlite --region mad --size 1

Configurarlo en fly.toml
```
[mounts]
source="myapp_data"
destination="/data"
```
