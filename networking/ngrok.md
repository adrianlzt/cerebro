A tunneling, reverse proxy for developing and understanding networked, HTTP services

Me da un endpoint de ngrok.io que conecta al localhost de mi máquina, a un puerto determinado.
Tu pc establece la conex ngrok contra el servicio.


# Arch
mejor la version -bin para no tener que compilar

yaourt -S ngrok-bin



# Uso

ngrok http 8443
  nos crea dos endpoint publicos, uno http y otro https (con terminación del tunel en su server) y nos llega el tráfico a localhost:8443

SSL parece que es de pago.
