# Ejemplo de un recurso (apache) que siempre va con una VIP

primitive apache ocf:heartbeat:apache \
        params configfile="/etc/httpd/conf/httpd.conf" \
        op monitor interval="1min" \
        meta target-role="Started"
primitive vip ocf:heartbeat:IPaddr2 \
        params ip="10.2.2.1" nic="eth1" \
        op monitor interval="10s" \
        meta target-role="Started"
colocation apache_with_vip inf: apache vip



Creo que una vez vi una máquina que había configurado una vip como dirección ip primaria de la interfaz.
17: bond0    inet 10.26.238.228/28 brd 10.26.238.239 scope global bond0  <-- esta era una vip
17: bond0    inet 10.26.238.232/28 brd 10.26.238.239 scope global secondary bond0 <-- esta la ip de la interfaz
17: bond0    inet 10.26.238.231/28 brd 10.26.238.239 scope global secondary bond0

No tomé datos cuando lo ví. Puedo estar equivocado.
