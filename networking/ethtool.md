Información de la tarjeta de red:
ethtool eth1
ethtool -i eth1

Estadísticas de la tarjeta de red:
ethtool -S eth1


Tunning:
Por lo general no es necesario tocar, ya están bien configurados:

ethtool <IF>
  # con autonegociacion, limitar velocidades anunciadas:
  -s advertise 0x28    # 100/1000 baseT full-duplex

  # sin autonegociacion, forzar velocidad:
  -s autoneg off speed 1000 duplex full # 1000baseT full-duplex

  # ver parámetros de red
  -k                   # features (desactivar checksum o fragmentacion libera CPU puede ayudar pero puede ser peligroso y no ofrecer mucha mejora)

autonegociacion.md
