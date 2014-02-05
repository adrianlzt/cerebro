http://www.devco.net/archives/2009/08/19/tips_and_tricks_for_puppet_debugging.php
http://docs.puppetlabs.com/guides/troubleshooting.html


facter --trace hostname
facter -d hostname


puppet apply cosa --debug


/usr/bin/puppet master --logdest console --no-daemonize --verbose --debug



check.pp:
class check (
  $puerto
)
{
  notice "puerto: $puerto"
} 
class {'monitorizacion::check_tcp': puerto => '22'}

$ puppet apply check.pp
