https://wiki.archlinux.org/title/NetworkManager#Checking_connectivity
https://man.archlinux.org/man/NetworkManager.conf.5#CONNECTIVITY_SECTION

Check de conectividad que ejecuta NetworkManager.

/usr/lib/NetworkManager/conf.d/20-connectivity.conf
```
[connectivity]
uri=http://ping.archlinux.org/nm-check.txt
```


➜ nm-online
Conectando...............   30s [online]
