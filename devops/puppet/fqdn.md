El fqdn es una unión del hostname y el domainname
/usr/lib/ruby/site_ruby/1.8/facter/fqdn.rb

El 'facter domain' lo saca de domain.rb
# Resolution:
#   On UNIX (excluding Darwin), first try and use the hostname fact, which uses the hostname system command, and then parse the output of that.
#   Failing that it tries the dnsdomainname system command.
#   Failing that it uses /etc/resolv.conf and takes the domain from that, or as a final resort, the search from that.
#   Otherwise returns nil.


Si no tenemos seguro que el cliente vaya a tener fqdn (por ejemplo, su hostname es únicamente "cliente", sin dominio) podemos usar:
if($::fqdn) {
  $servername = $::fqdn
} else {
  $servername = $::hostname
}
