128 bits
aaaa:bbbb:cccc:dddd:eeee:ffff:gggg:hhhh
x -> 4bits
xx -> 8 bits
xxxx -> 16 bits
16 x 8 = 128 bits

fe80::/10 — Addresses in the link-local prefix are only valid and unique on a single link

Construcción de una dirección IPv6:

MAC: 00:11:22:33:44:55
EUI_64: 00:11:22:FF:FE:33:44:55

Universal/Local bit (primer octeto de la MAC): ccccccuc
Se invierte (0->1 o 1->0)
0: local
1: global
Lo normal es pasar de 0 a 1

Interface identifier:
00:11:22:FF:FE:33:44:55 -> 02:11:22:FF:FE:33:44:55

Para formar una dirección local, añadiremos este identificador a la red FE80::/64
FF80::02:11:22:FF:FE:33:44:55/64

localhost especificando puerto:
[::1]:80
