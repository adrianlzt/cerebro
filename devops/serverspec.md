http://serverspec.org/

With serverspec, you can write RSpec tests for checking your servers are configured correctly.

Serverspec tests your servers' actual state through SSH access, so you don't need to install any agent softwares on your servers and can use any configuration management tools, Puppet, Chef, CFEngine and so on.

gem install serverspec
serverspec-init
...
require 'spec_helper'
describe package('httpd') do
  it { should be_installed }
end
describe file('/etc/httpd/conf/httpd.conf') do
  it { should be_file }
  it { should contain "ServerName www.example.jp" }
end
...
rake spec



Se puede usar serverspec para monitorizar: http://fractio.nl/2014/05/10/rethinking-monitoring/
La idea ese ejecutarlo y enviar la salida a sensu, de esta manera con un único check podemos controlar varias cosas.
Con icinga el problema es como separar en distintas alarmas toda la salida (me parece que no hay mucha solución). Tal vez un script en python que ejecutase ese comando y devolviese muchos checks pasivos?
