Ejecutar este comando para definir la ip correcta (si no es la de la interfaz por defecto):
Conf actual:
  debconf-show maas-region-controller (no aparece la ip)
dpkg-reconfigure maas-region-controller
  Ejecuta (o al menos en parte): /var/lib/dpkg/info/maas-region-controller.postinst
  Esto cambia:
    maas/maas_local_celeryconfig.py
      BROKER_URL = 'amqp://maas_workers:QshtMhSlwxSo1BU1AQRF@192.168.222.111:5672//maas_workers'
    maas/maas_local_settings.py
      DEFAULT_MAAS_URL = "http://192.168.222.111/MAAS"
      RABBITMQ_PASSWORD = 'HD97IbdOUCfKCEngt67s'
    maas/txlongpoll.yaml
      password: "HD97IbdOUCfKCEngt67s"

  Tambien cambiarla en:
    maas_cluster.conf MAAS_URL
    pserv.conf generator
    restart maas-pserv

  Cierta información referente al cluster reside en la tabla de postgrelsql: maasserver_nodegroup

Ya podemos acceder a la web del region controller:
http://a.b.c.d/MAAS

Tras la instalación tenemos que crear el superuser
sudo maas-region-admin createsuperuser

Definir un email al crear el usuario, si no: django.db.utils.IntegrityError: duplicate key value violates unique constraint "auth_user_email_key"

# Clusters
En la interfaz web tendremos que aceptar los nuevos clusters que desean conectarse al region controller.
Si hemos instalado todo en una sola máquina con el paquete 'maas', el cluster se habrá aceptado automáticamente.

## Decargar imagenes PXE
Debemos hacerlo cada vez que añadamos un nuevo cluster controller

Podemos limitar las arquitecturas que queremos en

Versiones nuevas (>= 1.6?)
/etc/maas/import_pxe_files
ARCHES="...

Versión 1.5:
/etc/maas/bootresources.yaml

FORMA ANTIGUA: Ejecutamos en cada uno de los cluster-controllers:
maas-import-pxe-files
  Baja imágenes de http://maas.ubuntu.com/images/ephemeral-v2/releases/ y se instala en /var/lib/maas/boot-resources/current
  En /var/lib/maas/boot-resources/current/amd64/generic/trusty/release/root-tgz tenemos lo que se carga en el sistema

O desde la interfaz web, en la pestaña "Cluster", "Import boot images"
Una vez terminado podremos ver, también en la interfaz web, las imágenes disponibles y su utilización.

O atacando a la API con el cli:
maas my-maas-session node-groups import-boot-images


## Configurar DHCP (cada cluster controller tiene un DHCP+DNS)
Web: https://maas.ubuntu.com/docs1.5/cluster-configuration.html (contiene info generica sobre configurar el cluster)
API: https://maas.ubuntu.com/docs1.5/maascli.html#cli-dhcp
Manual: https://maas.ubuntu.com/docs1.5/configure.html#manual-dhcp

Cada cluster controller estará configurado para, al menos, manejar una red de nodos. Cada nodo tiene que estar en, al menos, una de estas redes. Si no, los nodos serán incapaz de llegar a este servidor DHCP.
The cluster controller must be able to find nodes’ IP addresses based on their MAC addresses, by inspecting its ARP cache. This implies that the nodes and the clsuter controler must on the same physical subnet.

API
maas <profile> node-group-interface update $uuid eth0 \
        ip_range_high=192.168.123.200    \
        ip_range_low=192.168.123.100     \
        management=2                     \
        broadcast_ip=192.168.123.255     \
        router_ip=192.168.123.1          \



## Switches
Some switches use Spanning-Tree Protocol (STP) to negotiate a loop-free path through a root bridge. While scanning, it can make each port wait up to 50 seconds before data is allowed to be sent on the port. This delay in turn can cause problems with some applications/protocols such as PXE, DHCP and DNS, of which MAAS makes extensive use.

To alleviate this problem, you should enable Portfast for Cisco switches or its equivalent on other vendor equipment, which enables the ports to come up almost immediately.


mirar add-nodes.md
