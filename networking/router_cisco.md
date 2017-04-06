# NAT
Como configurar un router para añadir nat

Meter una regla para enrutar el trafico de la ip publica 20.15.28.5:443 a la interna 10.0.1.18:443


configure
ip nat inside source static tcp 10.0.1.18 443 20.15.28.5 443 extendable
end
Testear que funciona
write
