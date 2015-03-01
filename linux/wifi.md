http://substack.net/wireless_from_the_command_line_in_linux

Numero de redes en cada canal
sudo iwlist wlo1 scan | grep Frequency | sort | uniq -c | sort -n

Información sobre la conexión actual (podemos saber el canal comparando esta salida con la de iwlist)
sudo iwconfig wlo1

Calidad del enlace
sudo iwconfig wlo1 | grep -i --color quality



# Wavemon
wavemon is a ncurses-based monitoring application for wireless network devices. It displays continuously updated information about signal levels as well as wireless-specific and general network information.

packer -S wavemon
