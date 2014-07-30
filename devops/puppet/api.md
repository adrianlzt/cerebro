http://docs.puppetlabs.com/guides/rest_api.html#testing-the-http-api-using-curl


Obtener nuestro catalog:
En YAML
curl --cert /var/lib/puppet/ssl/certs/$(hostname).pem --key /var/lib/puppet/ssl/private_keys/$(hostname).pem --cacert /var/lib/puts/ca.pem -H 'Accept: yaml' https://puppet:8140/dsn_dev/catalog/$(hostname)

En JSON:
curl --cert /var/lib/puppet/ssl/certs/$(hostname).pem --key /var/lib/puppet/ssl/private_keys/$(hostname).pem --cacert /var/lib/puts/ca.pem -H 'Accept: pson' https://puppet:8140/dsn_dev/catalog/$(hostname)

Puede que hostname no ponga el FQDN (falte la parte .balb.com de nodo.balb.com por ejemplo)

Aplicarlo:
Mirar catalog.md
