http://www.devco.net/archives/2009/08/19/tips_and_tricks_for_puppet_debugging.php
http://docs.puppetlabs.com/guides/troubleshooting.html

## Debug facter ##
facter --trace hostname
facter -d hostname


## Mas trazas sobre la ejecucción de puppet ##
puppet apply cosa --debug

https://docs.puppetlabs.com/references/3.7.latest/configuration.html#httpdebug
puppet agent --test --http_debug

Para ver que línea produce el error
puppet apply --debug --trace cosa.pp
ruby -dw /usr/bin/puppet apply ...


# Trazas en código #
warning("mensaje")
Genera:
  Warning: Scope(Class[main]): prueba

# Inspecionar trafico #
Mirar sniffing.md



## Debug línea por línea (mirar ruby/debug.md) ##
gem install ruby-debug
Meter en /usr/lib/ruby/site_ruby/1.8/puppet/util/command_line.rb
require 'ruby-debug'

Meter 'debugger' donde queramos parar la ejecucción (mismamente en el "def initialize" de command_line.rb)
# irb
irb(main):001:0> require 'puppet/util/command_line'
=> true
irb(main):002:0> Puppet::Util::CommandLine.new("puppet", %w{ apply /etc/puppet/manifests }).execute
  Sacado de http://git.kaarsemaker.net/puppet/blob/5be10957477f37954e5deef21cd70ebc8b4a7b40/spec/unit/util/command_line_spec.rb

Poner punto de parada donde falle (obtenerlo con el -d --trace)
(rdb:1) b /usr/lib/ruby/site_ruby/1.8/puppet/indirector/resource/ral.rb:25


Si estamos debugeando el master ejecutar como
/usr/bin/puppet master --no-daemonize



## Ejecucción del master con trazas ##
/usr/bin/puppet master --logdest console --no-daemonize --verbose --debug



## Trazas en manifests ##
check.pp:
class check (
  $puerto
)
{
  notice "puerto: $puerto"
} 
class {'monitorizacion::check_tcp': puerto => '22'}

$ puppet apply check.pp
