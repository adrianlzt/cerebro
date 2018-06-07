https://www.ostechnix.com/check-linux-system-physical-virtual-machine/

Si tenemos systemd:
systemd-detect-virt
hostnamectl status

Para antiguos:
dmidecode -s system-manufacturer
dmidecode | grep Product
