# Mostrar rutas
ip -6 ro

# Mostrar y borrar cache de rutas
ip -6 route show cache
ip -6 route flush cache

# Crear rutas
ip -6 route add <ipv6 network>/<prefix> via <ipv6addr>
route -A inet6 add <ipv6 net>/<prefix> gw
