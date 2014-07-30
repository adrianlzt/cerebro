http://docs.puppetlabs.com/puppetdb/latest/install_from_source.html
https://hurricanelabs.com/blog/managing-puppet-certificates/

## SSL ##
http://www.masterzen.fr/2010/11/14/puppet-ssl-explained/

Simular conexión desde un cliente
openssl s_client -host puppet -port 8140 -cert /var/lib/puppet/ssl/certs/$(hostname).pem -key /var/lib/puppet/ssl/private_keys/$(hostname).pem -CAfile /var/lib/puppet/ssl/certs/ca.pem

Esnifar tráfico entre master y slave: mirar sniffing.md



Para autofirmar

$ cat /etc/puppet/autosign.conf 
*


Si tenemos problemas de que el cliente no se cree el certificado del puppet master:
rm -fr /etc/puppet/ssl


En /var/lib/puppet/ssl/certs estan los certificados que genera cada cliente y se instalan en el master.
Si queremos que el CN de este certificado sea distinto a hostname.domainname haremos (la primera vez que corremos puppet en el cliente; o tras borrar el cert):
puppet agent -t --certname sr2.inet


Puppetdb al instalarse (el rpm) copia los certificados:
PEM files in /etc/puppetdb/ssl are missing, we will move them into place for you
Copying files: /var/lib/puppet/ssl/certs/ca.pem, /var/lib/puppet/ssl/private_keys/sr2s.pem and /var/lib/puppet/ssl/certs/sr2s.pem to /etc/puppetdb/ssl
Tendremos que tener en cuenta que es obligatorio tener un domainname en la máquina que tenga puppetdb para que puppetmaster se pueda conectar a él.


Firmar:
puppet cert sign <nombre>
puppet cert sign --all


Borrar certificados firmados:
puppet cert clean <nombre>


Solicitar que nos firmen un certificado?
Si el cliente nos dice: "Exiting; no certificate found and waitforcert is disabled"
  puppet certificate generate `hostname`.dom.inet --ca-location remote --waitforcert 3 --server $PUPPETMASTER
    Parece que el fqdn de la máquina (o el hostname en caso de no tener fqdn) no coincide con lo que ahí hemos puesto, luego tendremos problemas.

  Si activo el waitforcert, no veo llega el certificado al master (pero debería según http://docs.puppetlabs.com/guides/setting_up.html#verifying-installation)


Generar certificado:
puppet cert generate puppetdb.example.com
Clave privada del servidor: $(puppet master --configprint ssldir)/private_keys/puppetdb.example.com.pem
Certificado del servidor: $(puppet master --configprint ssldir)/certs/puppetdb.example.com.pem 
Certificado autoridad: $(puppet master --configprint ssldir)/ca/ca_crt.pem
