https://www.duckdns.org/

Obtener dominio dinámico

# Arch
yourt -S duckdns

# Conf
sudo vi /etc/duckdns.d/default.cfg


# Funcionamiento
sudo systemctl enable duckdns.timer
sudo systemctl start duckdns.timer


# Actualización manual

Q: can I script my own update?

A: yes you can do this on http or https. you can comma separate the domains if you want to update more than one, the ip parameter is optional, if you leave it blank we detect your gateway ip 

https://www.duckdns.org/update?domains=ben&token=064a0540-864c-4f0f-8bf5-23857452b0c1&ip=
