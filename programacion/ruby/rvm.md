http://rvm.io/
RVM: Ruby Version Manager

Gestor para tener múltiples versiones de ruby en el mismo sistema.

Para usar el ruby del sistema:
rvm use system

Para otras versiones, podemos verlas con: rvm list
rvm use blabla

Las versiones de ruby que instalemos con rvm se hacen sobre:
/usr/local/rvm/gems/ruby-1.9.3-p484/bin:/usr/local/rvm/gems/ruby-1.9.3-p484@global/bin:/usr/local/rvm/rubies/ruby-1.9.3-p484/bin:/usr/local/rvm/bin
Se meten el PATH.

Para definir la versión por defecto:
rvm --default use VERSION
