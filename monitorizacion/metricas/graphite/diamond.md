https://github.com/BrightcoveOS/Diamond/wiki

Diamond is a python daemon that collects system metrics and publishes them to Graphite or other supported handlers. It is capable of collecting cpu, memory, network, i/o, load and disk metrics. Additionally, it features an API for implementing custom collectors for gathering metrics from almost any source.


Para generar el .deb
git clone https://github.com/BrightcoveOS/Diamond.git
cd Diamond
apt-get install make pbuilder python-mock python-configobj python-support cdbs
make builddeb
build/diamond_3.0.2_all.deb


Mediante PIP
apt-get install -y python-dev (ubuntu 12.04)
pip install diamond
Pip no nos genera un fichero de init.d, lo cogemos del git (para debian-like):
wget https://raw.github.com/BrightcoveOS/Diamond/master/debian/init.d /etc/init.d/daemon
  Tenemos que cambiar:
  DAEMON=/usr/bin/diamond -> DAEMON=/usr/local/bin/diamond
chmod 755 /etc/init.d/daemon
mkdir /var/log/diamond


Configuración:
cd /etc/diamond
cp diamond.conf.example diamond.conf
vi diamond.conf
  En [server], handlers define que manejadores están activos. Por defecto: 
  handlers = diamond.handler.graphite.GraphiteHandler, diamond.handler.archive.ArchiveHandler
  Cambio los path, porque pip instala en /usr/local/share en vez de /usr/share
  collectors_path = /usr/local/share/diamond/collectors/
  handlers_path = /usr/local/share/diamond/handlers/



  Comento el host de graphite para que lo coja del fichero handler/
  [[GraphiteHandler]]
  #host = graphite


Configuramos el de graphite para que apunte a localhost (que es donde tengo el server graphite)
  vi /etc/diamond/handlers/GraphiteHandler.conf
    host = 127.0.0.1


Desactivo la captura de datos por snmp, ya que no lo tengo activado
/etc/diamond/collectors/SNMPInterfaceCollector.conf
  enabled = False


Podemos usar el comando diamond-setup para generar la configuración, verla, etc.


Arrancamos el demonio:
/etc/init.d/diamond start
