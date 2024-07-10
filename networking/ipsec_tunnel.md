<http://www.cyberciti.biz/faq/howto-site-to-site-ipsec-vpn-between-cisco-openbsd-router-pfsense/>

# Libreswan

<https://libreswan.org/man/ipsec.conf.5.html>

Conectar libreswan al VPN Gateway de Azure
<https://reinhardt.dev/posts/azure-vpn-using-libreswan/>

Otro ejemplo, parece que más moderno:
<https://libreswan.org/wiki/Microsoft_Azure_configuration>

Si estamos dentras de NAT, en "left", tenemos que cambiarlo de:

```
left=%defaultroute
```

a nuestra ip interna de la LAN, por ejemplo:

```
left=10.0.0.5
```

Del manual:
If using IP addresses in combination with NAT, always use the actual local machine's (NATed) IP address, and if the remote (eg right=) is NATed as well, the remote's public (not NATed) IP address.

## Estado

ipsec showstates
