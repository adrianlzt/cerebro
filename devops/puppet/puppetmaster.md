http://docs.puppetlabs.com/puppetserver/1.1/puppetserver_vs_passenger.html

Usar puppetmaster como server
puppetmaster + unicorn come mucha memoria (https://www.digitalocean.com/community/tutorials/how-to-optimize-unicorn-workers-in-a-ruby-on-rails-app)


http://docs.puppetlabs.com/puppetserver/latest/tuning_guide.html

Puppetserver es el nuevo servidor de puppet (3.7 y 3.8)
puppetmaster es el cutre antiguo

yum install puppetserver


Las gemas van por defecto en el directorio (no pilla las del sistema):
/var/lib/puppet/jruby-gems

Tenemos la utilidad
puppetserver gem


También:
puppetserver foreground
puppetserver irb
puppetserver ruby


# Gemas
Si nuestra gema tiene una "C native extension" no funcionará.
Tendremos que buscar el reemplazo para JRuby:
https://github.com/puppetlabs/puppet-server/blob/master/documentation/gems.markdown#gems-with-native-c-extensions

Para la gema pg -> pg_jruby

# Debug
https://docs.puppetlabs.com/puppetserver/latest/dev_debugging.html
http://docs.puppetlabs.com/puppetserver/latest/dev_trace_func.html

/etc/sysconfig/puppetserver
JAVA_ARGS="-Xms2g -Xmx2g -XX:MaxPermSize=256m -Djruby.debug.fullTrace=true"


A mano:
/usr/bin/java -XX:OnOutOfMemoryError="kill -9 %p" -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=/var/log/puppetserver -Djava.security.egd=/dev/urandom -Xms2g -Xmx2g -XX:MaxPermSize=256m -Djruby.debug.fullTrace=true -cp '/usr/share/puppetserver/puppet-server-release.jar' clojure.main -m puppetlabs.trapperkeeper.main --config /etc/puppetserver/conf.d -b '/etc/puppetserver/bootstrap.cfg'
