Para tener ruby 2.0 en Ubuntu 13.10:
http://leonard.io/blog/2013/10/installing-ruby-2.0.0-on-ubuntu-13-10-saucy-salamander/

Ruby 2.0 es necesario para vagrant. Aunque el paquete vagrant de apt ya trae la versión 2.0 embedida.

sudo apt-get update
sudo apt-get install ruby2.0 ruby2.0-dev build-essential libssl-dev zlib1g-dev ruby-switch
sudo ruby-switch --set ruby2.0
ruby --version

Ahora tenemos que reinstalar gemas en /var/lib/gems/2.0.0/
