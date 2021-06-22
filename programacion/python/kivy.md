Ejemplo de programa gráfico escrito en python, pyqt5: https://github.com/borgbase/vorta


http://kivy.org/#home

Kivy - Open source Python library for rapid development of applications
that make use of innovative user interfaces, such as multi-touch apps.

cuando nos gusta un lenguaje de programación queremos usarlo en todas partes. ¿Y si os dijera que podemos crear apps para Android con Kivy? De hecho, este proyecto pone a nuestra disposición en Google Play ejemplos de apps creadas con Python y Kivy, e incluso el famoso juego 2048. Es una librería multiplataforma, también podremos crear aplicaciones multitouch en Windows, Mac OS X y Linux.


pacman -S python-kivy



# Buildozer / Crear app para android
https://kivy.org/docs/guide/packaging-android.html?highlight=android#buildozer

yaourt -S python-buildozer
cd proyecto/
buildozer init
vi buildozer.spec

Al ejecutar buildozer se bajará todas las librerías que hagan falta para hacer el build, el sdk de android, kivy, etc.

Conectar el movil
buildozer android debug deploy run

Para generar un .apk modo "debug":
buildozer android debug

Para generar un .apk definitivo:
buildozer android release


# hello world
main.py:

import kivy
kivy.require('1.0.6') # replace with your current kivy version !

from kivy.app import App
from kivy.uix.label import Label

class MyApp(App):
    def build(self):
        return Label(text='Hello world')

if __name__ == '__main__':
    MyApp().run()


# Arquitectura
https://kivy.org/doc/stable/guide/events.html
Event-loop

Ejecuta callbacks definidos


## Timer / schedule
Ejecutar algo cada x tiempo

def my_callback(dt):
    print 'My callback is called', dt

event = Clock.schedule_interval(my_callback, 1 / 30.)


O una única vez:
def my_callback(dt):
    print 'My callback is called !'

Clock.schedule_once(my_callback, 1)
