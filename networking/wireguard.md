```bash
pacman -S wireguard-tools
```

```
/etc/wireguard/name.conf
```

Arrancar/estado/parar a mano:
```bash
sudo wg-quick up name
sudo wg-quick down name
```


Arrancar con systemd:
```bash
systemctl status wg-quick@name
```

Estado
```bash
sudo wg show
```

Hace falta `resolvconf` si el fichero de config tiene "DNS=a.b.c.d"

Ejemplo de config:
```ini
[Interface]
PrivateKey = REDACTED
Address = 10.251.1.3/32
#DNS = 10.251.1.1

[Peer]
PublicKey = REDACTED
AllowedIPs = 192.168.9.6/28
Endpoint = xxx.foo.com:53184
```
