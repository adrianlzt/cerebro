Con esta configuración podemos generar campos referentes a la localidad de la ip.
geoip { source => "clientip" }


Podemos crear también un panel donde mostrar la localización de esas ips:
Row 450px
Panel type: map
Span: 

Para usar el mapa de USA o Europa
Field: geoip.region_name

Para usar el mapa de Europa o el Mundo
Field: geoip.country_code2


## Bettermap ##
Con este tipo de mapa conseguimos poner unas bolas con valor y colores en las zonas de donde vengan las peticiones. Según vamos haciendo zoom al mapa las bolas se van separando y poniendo en su localización exacta.
Field: geoip.location
Span: 8

Con la versión de pago de geoip se tiene más precisión.
