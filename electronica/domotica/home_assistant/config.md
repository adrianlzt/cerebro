# Comprobar conf
En el directorio donde esté la conf:
hass --script check_config


Parece que para la mayoría de las cosas hace falta darle un restart.

En ciertas ocasiones vale con reload_core_config, por ejemplo para homeassistant.customize


Llamar a los ficheros .yaml


# Customize
https://home-assistant.io/getting-started/customizing-devices/

Definir nombre e imágenes para nuestros sensores.
Hacemos el mapeo del ID a una palabra y una imagen


# Split config / Includes
https://home-assistant.io/topics/splitting_configuration/

Para incluir un fichero:
customize: !include customize.yaml


Incluir directorios:
!include_dir_list, cada fichero es un elemento del array (dentro del fichero no se define que es un array, sin guion)
!include_dir_named, cada elemento de un objeto cuya clave es el nombre del fichero (dentro del fichero no se pone guión)
!include_dir_merge_list, mergear varios ficheros como un único array (dentro de los fichero con guión)
!include_dir_merge_named, mergear varios ficheros, cada fichero tiene dentro la clave y los valores


Packages:
https://home-assistant.io/topics/packages/
En vez de dividir por tipo, actions, sensors, etc, podemos hacer paquetes donde van varios tipos de cada cosa.
Por ejemplo, todos los sensores de una marca los metemos debajo del mismo paquete.


Groups
https://home-assistant.io/components/group/
Agrupar la vista en tabs y decidir que mostrar en cada uno



# Examples
https://github.com/dale3h/homeassistant-config
