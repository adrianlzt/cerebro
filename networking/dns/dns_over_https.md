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



Configurar dnsmasq para usar este server:
/etc/dnsmasq.d/0_dnscrypt.md
server=::1#53000
server=127.0.0.1#53000


Validación DNSSEC?
Si está activado en dnscrypt activar también en dnsmasq
conf-file=/usr/share/dnsmasq/trust-anchors.conf
dnssec
dnssec-check-unsigned
