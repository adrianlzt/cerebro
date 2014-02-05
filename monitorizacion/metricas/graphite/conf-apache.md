Solo es posible configurarlo como virtual host:

https://answers.launchpad.net/graphite/+question/189080
It is currently not possible to do this. There are assumptions in the code that Graphite is installed in the root directory.
Several people have tried to fix this but introduced a multitude of bugs.

https://github.com/graphite-project/graphite-web/issues/223


Un ejemplo de configuración para apache:
https://github.com/echocat/puppet-graphite/blob/master/templates/etc/apache2/sites-available/graphite.conf.erb
