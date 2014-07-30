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
