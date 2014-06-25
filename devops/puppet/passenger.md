http://docs.puppetlabs.com/guides/passenger.html

NO HE CONSEGUIDO QUE ME FUCIONE

Ejecutar puppetmaster tras passenger

Para usar ssl con apache hace falta el módulo ssl
yum install mod_ssl

puppetmaster.conf (fichero para apache)
https://github.com/puppetlabs/puppet/blob/60eb8793c9b9d494d084ea562bd2bbee0552245f/ext/rack/example-passenger-vhost.conf
Quitar 
RackAutoDetect Off
RailsAutoDetect Off

Listen 8140
<VirtualHost *:8140>
  SSLEngine on
  SSLProtocol -ALL +SSLv3 +TLSv1
  SSLCipherSuite ALL:!ADH:RC4+RSA:+HIGH:+MEDIUM:-LOW:-SSLv2:-EXP
  # Puppet master should generate initial CA certificate.
  # ensure certs are located in /var/lib/puppet/ssl
  # Change puppet.example.com to the fully qualified domain name of the Puppet master, i.e.  $(facter fqdn).
  SSLCertificateFile /var/lib/puppet/ssl/certs/FQDN_SERVER.pem
  SSLCertificateKeyFile /var/lib/puppet/ssl/private_keys/FQDN_SERVER.pem
  SSLCertificateChainFile /var/lib/puppet/ssl/ca/ca_key.pem
  SSLCACertificateFile /var/lib/puppet/ssl/ca/ca_crt.pem
  # CRL checking should be enabled
  # disable next line if Apache complains about CRL
  SSLCARevocationFile /var/lib/puppet/ssl/ca/ca_crl.pem
  # optional to allow CSR request, required if certificates distributed to client during provisioning.
  SSLVerifyClient optional
  SSLVerifyDepth 1
  SSLOptions +StdEnvVars
  # The following client headers record authentication information for down stream workers.
  RequestHeader set X-SSL-Subject %{SSL_CLIENT_S_DN}e
  RequestHeader set X-Client-DN %{SSL_CLIENT_S_DN}e
  RequestHeader set X-Client-Verify %{SSL_CLIENT_VERIFY}e
  RackAutoDetect On
  DocumentRoot /etc/puppet/
  <Directory /etc/puppet/>
    Options None
    AllowOverride None
    Order allow,deny
    allow from all
  </Directory>
</VirtualHost>


/etc/puppet/config.ru owner.group = puppet.puppet
$0 = "master"
ARGV << "--rack"
ARGV << "--confdir" << "/etc/puppet"
ARGV << "--vardir"  << "/var/lib/puppet"
require 'puppet/util/command_line'
run Puppet::Util::CommandLine.new.execute

Según el libro de pro puppet:
$0 = "master"
# if you want debugging:
# ARGV << "--debug"
ARGV << "--rack"
require 'puppet/application/master'
run Puppet::Application[:master].run

