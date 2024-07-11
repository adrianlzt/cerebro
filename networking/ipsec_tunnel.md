<http://www.cyberciti.biz/faq/howto-site-to-site-ipsec-vpn-between-cisco-openbsd-router-pfsense/>

# Libreswan

## Configuración

<https://libreswan.org/man/ipsec.conf.5.html>

Cuando libreswan habla de parte izquiera y derecha de la red, da igual que lado es cada uno.

### Secrets

Si queremos una clave que matchee cualquier conexión:

```
%any %any : PSK "$psk"
```

Si queremos distintas, usaremos el formato:

```
IP_PUBLICA_ORIGEN IP_PUBLICA_DESTINO : PSK "mysecret"
```

### NAT

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
# ipsec showstates
000 #1: "conn2AzureRouteBasedGW/1x1":4500 STATE_V2_ESTABLISHED_IKE_SA (established IKE SA); REKEY in 9949s; REPLACE in 10796s; newest; idle;
000 #2: "conn2AzureRouteBasedGW/1x1":4500 STATE_V2_ESTABLISHED_CHILD_SA (established Child SA); LIVENESS in 26s; REKEY in 2959s; REPLACE in 3596s; newest; eroute owner; IKE SA #1; idle;
000 #2: "conn2AzureRouteBasedGW/1x1" esp.9894a50e@20.240.192.55 esp.84ac8cb5@10.0.0.5 tun.0@20.240.192.55 tun.0@10.0.0.5 Traffic: ESPin=0B ESPout=0B ESPmax=2^63B
```

Para saber si la conexión está establecida correctamente podemos hacer:

```
ipsec status | grep "Total IPsec"
```

Y debe devolver:

```
000 Total IPsec connections: loaded 1, active 1
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

### STATE_V2_PARENT_I1: retransmission; will wait 0.5 seconds for response

El otro endpoint no está contestando.

### dropping unexpected IKE_SA_INIT message containing NO_PROPOSAL_CHOSEN notification; message payloads: N; missing payloads: SA,KE,Ni

Este error es al tener mal configurado el `ike`, el parámetro donde definimos la encriptación de IKE phase 1 (el ike phase 2 si está bien).

En el state veo:

```
# ipsec showstates
000 #2: "conn2AzureRouteBasedGW/1x1":500 STATE_V2_PARENT_I1 (sent IKE_SA_INIT request); RETRANSMIT in 27s; idle;
000 #2: pending CHILD SA for "conn2AzureRouteBasedGW/1x1"
```

### IKE_AUTH response contained the error notification NO_PROPOSAL_CHOSEN

Este error parece que sale si tenemos el `phase2alg` configurado distinto entre los dos dispositivos (la encriptación de IKE phase 2). La encriptación del phase1 si está bien.

El "showstates" no muestra nada.

### CREATE_CHILD_SA failed with error notification NO_PROPOSAL_CHOSEN

Comprobar que las subnets definidas a ambos lados son iguales.
Mirar parámetros leftsubnets y rightsubnets.

## Debug

Para ver un "dump" del estado actual, configuraciones, etc:

```
ipsec status
```

Para sacar trazas, configurar debug a "base".

Por mi experiencia buscando errores, activar el modo debug lo que conseguía era ocultar las trazas útiles. Parece mejor no activar el debug.

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
