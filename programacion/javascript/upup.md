https://www.talater.com/upup/

A tiny script that makes sure your site is always there for your users


Cuando entramos en una web se descarga en la cache el contenido que mostrar en caso de que no podamos acceder a la web.
Hace uso de la tecnología ServiceWorkers

Solo funciona con SSL (o localhost o file:///)
ServiceWorkers, and thus UpUp, only work when the user is accessing your server over a secure connection.

# Download
https://github.com/TalAter/UpUp/raw/master/dist/upup.zip

# Conf
Poner en el root de la web
www.example.com/upup.min.js
www.example.com/upup.sw.min.js


# Ejemplo basico
Añadir al final de la web

  <script src="/upup.min.js"></script>
  <script>
    UpUp.start({
      'content': '<html><body><h1>Top Hotels in Rome</h1><p>Villa Domus</p><p>Hotel Trivelli</p></body></html>'
    });
  </script>

Eso será lo que conteste para todo el dominio. Da igual que pidas /pepe que /home


Si queremos que el service worker tambien tenga css, js, etc:
  UpUp.start({
    'content-url': 'offline',
    'assets': ['static/js/main.js']
  });


En este caso el SW preguntara por www.example.com/offline
Esto llamará a nuestra app que redirizará una web que consideremos oportuna.
