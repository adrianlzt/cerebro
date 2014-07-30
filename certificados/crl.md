http://www.openssl.org/docs/apps/crl.html

Certificate revocation list 

A certificate revocation list (CRL) is a list of certificates (or more specifically, a list of serial numbers for certificates) that have been revoked, and therefore, entities presenting those (revoked) certificates should no longer be trusted.


Ver la lista de certificados revocados de un fichero crl
openssl crl -in crl.pem -text -noout


Generar un CRL a partir de la key y certificado:
http://www.openssl.org/docs/apps/ca.html#CRL_OPTIONS
https://jamielinux.com/articles/2013/08/generate-certificate-revocation-list-revoke-certificates/

crlnumber: a text file containing the next CRL number to use in hex. The crl number will be inserted in the CRLs only if this file exists. If this file is present, it must contain a valid CRL number.


En CentOS para regenerar el crl de puppet:
openssl ca -keyfile private_keys/puppet.inet.pem -cert certs/puppet.inet.pem -gencrl -out crl.pem

Antes ha sido necesario:
  touch /etc/pki/CA/index.txt
  echo "0003" > /etc/pki/CA/crlnumber  (era el numero que aparecia en /var/lib/puppet/ssl/ca/serial)

Lo suyo habría sido usar un /etc/pki/tls/openssl.cnf customizado apuntando a los sitios adecuados. (que fichero hace de index??)
