Precedencia a la hora de elegir una ruta de salida:
netsh interface ipv6 show prefix

netsh interface ipv6 show prefixpolicies: Muestra la tabla local de políticas
netsh interface ipv6 add prefixpolicies: Añade nuevas entradas a la tabla
netsh interface ipv6 set prefixpolicies: Configura entradas en la tabla
netsh interface ipv6 delete prefixpolicies: Borra entradas en la tabla 

Ejemplo:
netsh interface ipv6 set prefixpolicies prefix=2001::/32 precedence=15 label=5
