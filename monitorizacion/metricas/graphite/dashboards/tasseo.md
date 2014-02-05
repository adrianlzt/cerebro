Dashboard para tener pequeñas gráficas con los últimos valores, y el último valor escrito en grande.
https://github.com/obfuscurity/tasseo
http://dashboarddude.com/blog/2013/11/09/dashboard-tasseo/


Instalación:
git clone https://github.com/obfuscurity/tasseo.git 
rvm use 1.9.2
bundle install
export GRAPHITE_URL=...
export GRAPHITE_AUTH=... # e.g. username:password (optional)
foreman start
open http://127.0.0.1:5000

Crear dashboard:
dashboard/ejemplo.sh
  var metrics =
  [
    {
      "alias": "client2.com.hostcheck-rta",
      "target": "icinga.client2.com.hostcheck.rta",
      "warning": 1,
      "critical": 2
    }
  ];

Desplegar tasseo en Passenger
http://geek.jasonhancock.com/2012/08/02/deploying-tasseo-not-to-heroku/

No veo claro como meter un gráfico en otro sitio (check-mk multisite por ejemplo).
Parece que tasseo quiere sacar todos los gráficos en la misma pantalla. Habría que hackearlo un poco.
