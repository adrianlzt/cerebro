Usar protocolos encriptados para solicitar DNS
https://wiki.archlinux.org/index.php/Domain_name_resolution#Privacy_and_security

# dnscrypt-proxy
https://wiki.archlinux.org/index.php/Dnscrypt-proxy

Configurarlo para que escuche en el puerto 53000

systemctl edit dnscrypt-proxy.socket
[Socket]
ListenStream=
ListenDatagram=
ListenStream=127.0.0.1:53000
ListenStream=[::1]:53000
ListenDatagram=127.0.0.1:53000
ListenDatagram=[::1]:53000

Editar /etc/dnscrypt-proxy/dnscrypt-proxy.toml y poner
listen_addresses = [ ]

Activar la inicialización por socket:
sc-enable dnscrypt-proxy.socket


En ese fichero de configuración tenemos a que server nos conectaremos, en "[sources]".
Podemos ver donde está la lista cacheada localmente en "cache_file".
Los servidores se definen como "sdns://STAMP"
Ese stamp codifica, en base64, la información para poder conectar a los servers DNS.
Más info: https://dnscrypt.info/stamps-specifications/

Listado público de DNSCrypt and DoH servers: https://github.com/DNSCrypt/dnscrypt-resolvers

Para decodificar ese "stamp" podemos usar https://pypi.org/project/dnsstamps/:
dnsstamp.py parse sdns://AQcAAAAAAAAAF1syMDAxOmJjODo0N2IwOjFhMDE6OjFdIOgBuE6mBr-wusDOQ0RbsV66ZLAvo8SqMa4QY2oHkDJNHzIuZG5zY3J5cHQtY2VydC5mci5kbnNjcnlwdC5vcmc


Listado de los servers que ve dnsproxy
sudo dnscrypt-proxy --list --config /etc/dnscrypt-proxy/dnscrypt-proxy.toml


Resolver un hostname usando el protocolo dnscrypt o DoH:
dnslookup ssl.gstatic.com sdns://AgcAAAAAAAAACjQ1LjkwLjI4LjCgPhoaD2xT8-l6SS1XCEtbmAcFnuBXqxUFh2_YP9o9uDggMob_ZaZfrzIIXuoTiMNzi6fjeHPJBszjxKKLTMKliYgOZG5zLm5leHRkbnMuaW8PL2Ruc2NyeXB0LXByb3h5

Configurar dnsmasq para usar este server:
/etc/dnsmasq.d/0_dnscrypt.md
server=::1#53000
server=127.0.0.1#53000

## Logging / debug
https://github.com/DNSCrypt/dnscrypt-proxy/wiki/Logging

Podemos subir el nivel de debug en la config con
log_level

Si queremos registrar todas las resoluciónes:
[query_log]
file = '/var/log/dnscrypt-proxy/query.log'
format = 'tsv'
ignored_qtypes = ['DNSKEY', 'NS']

format ltsv nos da más info


Validación DNSSEC?
Si está activado en dnscrypt activar también en dnsmasq
conf-file=/usr/share/dnsmasq/trust-anchors.conf
dnssec
dnssec-check-unsigned
