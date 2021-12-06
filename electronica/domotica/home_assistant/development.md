https://home-assistant.io/developers/
https://dev-docs.home-assistant.io/en/master/

# Entorno
git clone git@github.com:home-assistant/home-assistant.git
cd home-assistant
mkvritualenv home-assistant
./script/setup
hass


# Configuracion
https://home-assistant.io/developers/development_validation/

Se debe definir un esquema de la conf que se pide al user


# Crear componentes
https://home-assistant.io/developers/creating_components/

Meterlo en ~/.homeassistant/custom_components

Para crear el scaffold, en el dir donde tengamos clonado el repo de home-assistant (o el .zip del tag que usamos), y
con el venv cargado:
python3 -m script.scaffold integration

Domain es lo que se pone en el nombre al principio: dominio.app
Ejemplo: lights.kitchen

github handle es el user de github: @adrianlzt

Nos creara un directorio tipo:
dominio/components/nombreApp


## Crear un componente webhook
Siguiendo el ejemplo de alexa

Definimos un schema de la conf.
Obtenemos de "config" la configuracion que haya metido el user
Registramos una url donde escucharemos peticiones http.
En ese registro pasamos una "vista" que se encargará de gestionar la query. A esa vista también le pasamos la config del user.


En la vista:
Definiremos una funcion para capturar los post, los get o ambos


# Debug / Log
https://home-assistant.io/components/logger/
logger:
  default: info
  logs:
    homeassistant.components.device_tracker: critical
    homeassistant.components.camera: debug

Reiniciar para que pille la config nueva.



# Pasar validacion y tests
tox

## De forma unitaria
flake8 xx.py
pylint xx.py
pydocstyle xx.py
py.test tests/test_core.py




# Web
https://home-assistant.io/developers/website/

bundle
bundle exec rake generate
  este solo la primera vez
bundle exec rake preview
  este va regenerando la web segun cambiamos el codigo (aunque tarda un poco)



# Trabajando con async
https://home-assistant.io/developers/asyncio_working_with_async/


# Configurator
https://home-assistant.io/components/configurator/

Para pedir acciones al usuario
