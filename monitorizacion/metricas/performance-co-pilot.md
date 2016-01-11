# PCP
http://pcp.io/
http://techblog.netflix.com/2015/04/introducing-vector-netflixs-on-host.html

Performance Co-Pilot is a system performance and analysis framework.

Recolecta métricas y las enseña mediante una interfaz web.

Requiere systemtap.

## Arch
yaourt -S pcp libmicrohttpd qt4 cairo

Dependencias:
    libmicrohttpd: support for pmwebd
    cairo: support for pmwebd
    qt4: support for PCP-GUI and pmchart

## Configuracion
Per-node pmwebd and pmcd

Central pmwebd, per-node pmcd

Logs (pmlogger) -> /var/log/pcp/pmlogger/archer/

iInstalar mas colectores:
cd /var/lib/pcp/pmdas/XXX
./install

## Ejecutar
sudo systemctl start pmcd
sudo systemctl start pmwebd
  puede engañar el status. Mirar si el puerto por defecto (44323) está abierto
  curl localhost:44323/index.html

sudo systemctl start pmlogger
  guardar trazas de los datos registrados





# Vector
https://github.com/Netflix/vector/wiki/Getting-Started

Pequeña app web que montamos en nuestro pc que conecta con el pcpd de un server y nos permite ver sus metricas.

## Instalar
pacman -S gulp
git clone https://github.com/Netflix/vector.git
cd vector
bower install
npm install
gulp build

## Ejecutar
gulp serve

O con python
cd dist
python -m SimpleHTTPServer 8080

