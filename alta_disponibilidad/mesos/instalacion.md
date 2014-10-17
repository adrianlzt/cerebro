http://mesos.apache.org/gettingstarted/

# Packages
https://mesosphere.com/downloads/

Meter el repo en nuestro ordenador
apt-get install mesos

start mesos-master
start mesos-slave
http://ip-master:5050


# Desde el código
Bajar la última versión:
http://mesos.apache.org/downloads/

tar zxvf mesos...
cd mesos..

# Ubuntu
sudo apt-get install build-essential openjdk-6-jdk python-dev python-boto libcurl4-nss-dev libsasl2-dev maven


mkdir build
cd build
../configure
make

# Run test suite.
make check

# Install (***Optional***).
make install
