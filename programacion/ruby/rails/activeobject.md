Copiar elementos:

objeto_nuevo = objeto_viejo.dup


deep_dup: Returns a deep copy of hash.



Comprobar si existe un elemento:
NatIp.where(ip: "1.2.3.4").empty?
NatIp.where(ip: "1.2.3.4").present?
NatIp.exists?(ip: "1.2.3.1")
