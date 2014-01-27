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
