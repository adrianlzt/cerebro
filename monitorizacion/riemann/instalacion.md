# Ubuntu
http://kartar.net/2014/12/an-introduction-to-riemann/

wget https://aphyr.com/riemann/riemann_0.2.10_all.deb
  ultimo enlace en la web, debajo del video a la derecha

apt-get update
apt-get -y install default-jre ruby-dev build-essential zlib1g-dev

java -version
  para comprobar que se ha instalado correctamente

dpkg -i riemann*.deb
service riemann start
  parece que el dpkg -i ya lo arranca

let’s install some supporting tools, the Riemann client and dashboard.
gem install --no-ri --no-rdoc riemann-client riemann-tools riemann-dash
