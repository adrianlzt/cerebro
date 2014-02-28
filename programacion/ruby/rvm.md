http://rvm.io/
RVM: Ruby Version Manager
Gestor para tener múltiples versiones de ruby en el mismo sistema.

Instalación:
curl -sSL https://get.rvm.io | bash -s stable

  * First you need to add all users that will be using rvm to 'rvm' group,
    and logout - login again, anyone using rvm will be operating with `umask u=rwx,g=rwx,o=rx`.

  * To start using RVM you need to run `source /etc/profile.d/rvm.sh`
    in all your open shell windows, in rare cases you need to reopen all shell windows.


Instalar ruby 1.9.2:
rvm install ruby-1.9.2
rvm install --proxy http://blabla.com:4322 ruby-1.9.2

Para usar el ruby del sistema:
rvm use system

Para otras versiones, podemos verlas con: rvm list
rvm use blabla

Las versiones de ruby que instalemos con rvm se hacen sobre:
/usr/local/rvm/gems/ruby-1.9.3-p484/bin:/usr/local/rvm/gems/ruby-1.9.3-p484@global/bin:/usr/local/rvm/rubies/ruby-1.9.3-p484/bin:/usr/local/rvm/bin
Se meten el PATH.

Para definir la versión por defecto:
rvm use --default VERSION

Esto modificará el fichero /usr/local/rvm/config/alias
En caso de poner una versión determinada el fichero contendrá:
default=ruby-1.9.3-p545

En caso de usar system estará vacío.
