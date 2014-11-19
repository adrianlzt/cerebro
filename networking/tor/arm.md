terminal status monitor for tor

 The anonymizing relay monitor (arm) is a terminal status monitor for Tor
 relays, intended for command-line aficionados, ssh connections, and anyone
 stuck with a tty terminal. This works much like top does for system usage,
 providing real time statistics for:
 .
  - bandwidth, cpu, and memory usage
  - relay's current configuration
  - logged events
  - connection details (ip, hostname, fingerprint, and consensus data)
  - etc.


Ubuntu:
apt-get install tor-arm

Arch:
pacman -S arm

Hace falta activar el ControlPort en /etc/tor/torrc

Muestra entorno ncurses con estadisticas.
