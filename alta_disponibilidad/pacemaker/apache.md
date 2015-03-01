http://linux-ha.org/doc/man-pages/re-ra-apache.html

OCF: 
/usr/lib/ocf/resource.d/heartbeat/apache

Hace un GET a / para ver si ha arrancado, entre otras comprobaciones.
Si no se puede acceder a / nos dará un error.

Podemos por ejemplo usar server-status para devolver una pagina donde el ocf pruebe.
/etc/httpd/conf.d/status.conf
<Location /server-status>
  SetHandler server-status
  Order Deny,Allow
  Deny from all
  Allow from 127.0.0.1
</Location>

pcs resource update Apache statusurl="http://127.0.0.1/server-status"
pcs resource create Apache ocf:heartbeat:apache statusurl="http://127.0.0.1/server-status"


# Conf basica
pcs resource create Apache ocf:heartbeat:apache

Las opciones que le da por defecto:
 Resource: Apache (class=ocf provider=heartbeat type=apache)
  Operations: start interval=0s timeout=40s (Apache-start-timeout-40s)
              stop interval=0s timeout=60s (Apache-stop-timeout-60s)
              monitor interval=10 timeout=20s (Apache-monitor-interval-10)


primitive apache ocf:heartbeat:apache \
        params configfile="/etc/httpd/conf/httpd.conf" \
        op monitor interval="1min" \
        meta target-role="Started"


 Resource: apache_ESJC-DSMM-CLS0XS (class=ocf provider=heartbeat type=apache)
  Attributes: configfile=/etc/httpd/conf/httpd.conf 
  Meta Attrs: is-managed=true target-role=Started 
  Operations: monitor interval=1min (apache_ESJC-DSMM-CLS0XS-monitor-1min)
              start interval=0 timeout=120 (apache_ESJC-DSMM-CLS0XS-start-0)
              stop interval=0 timeout=120 (apache_ESJC-DSMM-CLS0XS-stop-0)
