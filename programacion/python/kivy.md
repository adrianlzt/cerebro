Ejemplo de programa gráfico escrito en python, pyqt5: https://github.com/borgbase/vorta


http://kivy.org/#home

Kivy - Open source Python library for rapid development of applications
that make use of innovative user interfaces, such as multi-touch apps.

cuando nos gusta un lenguaje de programación queremos usarlo en todas partes. ¿Y si os dijera que podemos crear apps para Android con Kivy? De hecho, este proyecto pone a nuestra disposición en Google Play ejemplos de apps creadas con Python y Kivy, e incluso el famoso juego 2048. Es una librería multiplataforma, también podremos crear aplicaciones multitouch en Windows, Mac OS X y Linux.


yaourt -S aur/python-kivy
  me ha hecho falta retocar el cython-kivi para poder instalarlo

Con pip no me funciona
pip install Cython
pip install Kivy pygame

# Buildozer / Crear app para android
https://kivy.org/docs/guide/packaging-android.html?highlight=android#buildozer

yaourt -S python2-buildozer
cd proyecto/
buildozer init
vi buildozer.spec
Conectar el movil
buildozer android debug deploy run

