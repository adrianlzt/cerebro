http://ihazem.wordpress.com/2011/12/28/delegate-sub-domain-to-another-name-server-in-bind/

; Delegating the geo.company.com subdomain to another NS – being gtm.company.com
geo          IN          NS          gtm.company.com.
gtm         IN           A            10.10.1.20                  ; this is the glue record

La máquina donde están esto registros está diciendo que delega el dominio geo.company.com a la ip 10.10.1.20

Sería suficiente con configurar una entrada NS, ya que a donde apuntemos puede resolverse de otro modo (se suelen pasar dos servers por redundancia).
Por ejemplo
geo	IN	NS	ns32.amazon.com.
geo	IN	NS	ns54.amazon.com

En la máquina 10.10.1.20 tendrás que crear un registro SOA.
Ejemplo:

$TTL 86400
@ IN SOA gtm.example.com. root.gtm.example.com. (
                                                 2010031200 ; Serial
                                                 28800 ; Refresh
                                                 14400 ; Retry
                                                 3600000 ; Expire
                                                 86400 ) ; Minimum
