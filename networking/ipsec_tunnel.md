<http://www.cyberciti.biz/faq/howto-site-to-site-ipsec-vpn-between-cisco-openbsd-router-pfsense/>

# Libreswan

<https://libreswan.org/man/ipsec.conf.5.html>

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

Tener en cuenta que necesitamos los puertos abiertos en el firewall de turno y los mismos puertos reenviados desde el router si tenemos una NAT.

## Comandos

Forzar a iniciar una conex. Es útil para poder ver posibles errores de la configuración.

```
ipsec auto --add conn2AzureRouteBasedGW
```

## Estado

ipsec showstates

Para una conexión establecida veía esto:

```
ipsec showstates
000 #11: "conn2AzureRouteBasedGW/1x1":4500 STATE_V2_ESTABLISHED_IKE_SA (established IKE SA); REKEY in 3877s; REPLACE in 4735s; newest; idle;
```

## Troubleshooting

Ejecutar:

```
ipsec verify
```

Si se queja de que los 'default/send_redirects' no están disabled, ejecutar:

```
for vpn in /proc/sys/net/ipv4/conf/*; do
    echo 0 > $vpn/accept_redirects;
    echo 0 > $vpn/send_redirects;
done
```

## Debug

Para ver un "dump" del estado actual, configuraciones, etc:

```
ipsec status
```

Para sacar trazas, configurar debug a "base".

Ejemplo de línea que nos dice como se establece la conexión:

```
10.0.0.0/24===10.0.0.5[40.113.59.156]...20.240.192.55===10.240.10.160/27
```

Es la red interna a conectar===a través de una ip privada [ip pública]...ip pública del otro lado===red a conectar del otro lado

## Azure VPN Gateway

Conectar libreswan al VPN Gateway de Azure
<https://reinhardt.dev/posts/azure-vpn-using-libreswan/>

Otro ejemplo, parece que más moderno:
<https://libreswan.org/wiki/Microsoft_Azure_configuration>

Configuración final que usé:

```
conn conn2AzureRouteBasedGW
        authby=secret
        auto=start
        dpdaction=restart
        dpddelay=30
        dpdtimeout=120

        ikev2=yes
        ike=aes256-sha256
        ikelifetime=10800s

        keyingtries=3
        salifetime=3600s
        type=tunnel
        pfs=yes

        phase2alg=aes256-sha256

        left=10.0.0.5
        leftid=40.113.59.156
        leftsubnets=10.0.0.0/24

        right=20.240.192.55
        rightid=20.240.192.55
        rightsubnets=10.240.10.160/27
```

En la `Connection` de Azure usé una Custom IPsec / IKE policy.

IKE Phase 1
Encryption
AES256

    Integrity/PRF
    SHA256

    DH Group
    DHGroup14

IKE Phase 2(IPsec)
IPsec Encryption
AES256

IPsec Integrity
SHA256

PFS Group
PFS24
