https://github.com/etsy/logster

Logster is a utility for reading log files and generating metrics in Graphite or Ganglia or Amazon CloudWatch. It is ideal for visualizing trends of events that are occurring in your application/system/error logs.

Instalación en Debian:
apt-get install logcheck
wget https://github.com/etsy/logster/archive/master.zip
unzip master.zip
cd logster-master/
sudo python setup.py install
  Installing logster script to /usr/local/bin


Testeo:

Sacamos estadisticas del apache sin enviarlas a ningun lado (dry-run)
/usr/local/bin/logster --dry-run --output=ganglia SampleLogster /var/log/apache2/access.log
