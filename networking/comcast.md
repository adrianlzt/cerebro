https://github.com/tylertreat/Comcast

Comcast is a tool designed to simulate common network problems like latency, bandwidth restrictions, and dropped/reordered/corrupted packets. Very handy for testing distributed systems under non-ideal network conditions.
Escrito en go

Interfaz sobre iptables y tc para simular errores de red.


# Install
go get github.com/tylertreat/comcast

Deberá tener permisos para lanzar comandos tipo:
sudo tc ...
sudo iptables ...


# Uso
comcast --device=eth0 --latency=250 --target-bw=1000 --default-bw=1000000 --packet-loss=10% --target-addr=8.8.8.8,10.0.0.0/24 --target-proto=tcp,udp,icmp --target-port=80,22,1000:2000

Si no especificamos device por defecto usara eth0

Para eliminar la reglas:
comcast --device enp8s0 --stop



comcast --device=docker0 --latency=2250 --target-port=9200
  ralentizar el acceso de un host hacia un container que ha expuesto el puerto 9200 (atacando via el puerto expuesto en el host o directamente a la ip del container)
  no afecta a la comunicación intracontainers

sudo nsenter -t <PID> -n comcast --latency=2250 --target-port=9200
  siendo <PID> un proceso de un container, afectamos a su funcionamiento, ralentizando las conex con los puertos 9200
  solo afeta al container sobre el que se aplica
  Probado sobre docker plano (sin kubernetes, aunque supongo que funcionará igual)
