sudo -s

Poner la interfaz wifi en modo escaneo:
airmon-ng start wlo1

Escaneo de redes:
airodump-ng -a wlo1mon

Si queremos guardar el tráfico:
airodump-ng -w /tmp/TMPlinset/dump -a wlo1mon
