http://xsser.03c8.net/

Cross Site "Scripter" (aka XSSer) is an automatic -framework- to detect, exploit and report XSS vulnerabilities in web-based applications.
It contains several options to try to bypass certain filters, and various special techniques of code injection.

# Download
http://xsser.03c8.net/#download

# Install
En un virtualenv
python setup.py build
pip install pycurl

# GTK
yaourt -S community/python2-beautifulsoup3 extra/pygtk

# Uso
xsser --gtk

Seleccionar intruder para atacar una url determinada.
Por defecto solo prueba a sacar un string por pantalla. Si seleccionamos "Automatic" (al lado de donde metemos la url) probará a hacer inyecciones con javascript.
En el tab "Expert Visor" podemos meter proxys, auth, etc.


Parece que es un poco viejo, porque los navegadores que dice donde funciona suelen ser:
[IE7.0|IE6.0|NS8.1-IE] [NS8.1-G|FF2.0] [O9.02]
Con últimas versiones de chrome y firefox no veo que pase.
