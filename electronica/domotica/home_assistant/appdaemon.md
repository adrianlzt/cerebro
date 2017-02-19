https://home-assistant.io/ecosystem/appdaemon/tutorial/
https://home-assistant.io/ecosystem/appdaemon/installation/

git clone https://github.com/acockburn/appdaemon.git
cd appdaemon
pip install .
cp conf/appdaemon.conf.example conf/appdaemon.conf
  no definir elevación, altitud, latitud, time_zone (deprecated)
  definir el app_dir, por ejemplo con DIRAPPDAEMON/conf/apps
appdaemon -c conf/appdaemon.cfg

Tiene un script para systemd


# Configuración

[Garage Momentary]
module = momentary_switch
class = MomentarySwitch
switch = switch.garage_door_switch_44
delay = 3

"module" 
"class" selecciona la clase de python a llamar
El resto de parámetros están disponibles en la clase python:
self.args["switch"]
self.args["delay"]


# Desarrollo
En cuanto toquemos un fichero .py y lo guardemos, appdaemon se recargará automáticamente.

## Clase básica

import homeassistant.appapi as appapi

class Nombre(appapi.AppDaemon):

  def initialize(self):
    self.run_at_sunset(self.sunset_cb, 0)
    self.listen_state(self.state_change, self.args["switch"], new="on")
    
  def sunrise_cb(self, kwargs):
    self.turn_on(self.args["off_scene"])

  def sunset_cb(self, kwargs):
    self.turn_on(self.args["on_scene"])
    self.log(message)
    self.notify(message, name="ios")


## Funciones
Listado: https://github.com/home-assistant/appdaemon/blob/master/appdaemon/appdaemon.py


### Escuchar cambios de estado
self.listen_state(seld.callback, nombre_del_sensor, new = "on")
  registramos un callback para cambios de un sensor.
  new = "on" es para solo llamar al callback si hay un cambio de estado

El callback se definirá con estos params:
def state_change(self, entity, attribute, old, new, kwargs):


### Leer un estado
https://home-assistant.io/ecosystem/appdaemon/api/#get_state
get_state(entity = None, attribute = None)


### Loop
do_every(period,f)


### Retrasar ejecucción
self.run_in(self.light_off, 60)

El callback como:
def light_off(self, kwargs):


### Notificaciones
self.notify("Motion detected: {}".format(self.friendly_name(entity)), name="ios")


### Cambios de estado
self.toggle("light.living_room")
self.turn_on("light.drive")
self.set_state("sensor.lavadora", state = "6")
  state debe ser una string



### Scheduler
https://home-assistant.io/ecosystem/appdaemon/api/#run_minutely
Correr un callback cada minuto
self.run_minutely(self.run_minutely_c)

def run_minutely_c(self, kwargs):
  ...


### Time / Date
Para trabajar con horas y fechas homeassistant tiene una lib
https://github.com/home-assistant/home-assistant/blob/master/homeassistant/util/dt.py
