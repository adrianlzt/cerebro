# Region controller
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

Deberemos borrar el "Cluster master" que viene por defecto si no vamos a usar al region controller como cluster controller.



# Cluster controller
En la interfaz web tendremos que aceptar los nuevos clusters que desean conectarse al region controller.
Si hemos instalado todo en una sola máquina con el paquete 'maas', el cluster se habrá aceptado automáticamente.

http://maas.ubuntu.com/docs1.5/configure.html#installing-additional-clusters
Si tenemos otro cluster, lo configuramos con:
dpkg-reconfigure maas-cluster-controller

En /var/log/upstart/maas-clusterd.log veremos como nos está pidiendo que definamos el secret del region controller en este nodo (cluster controller)
cat /var/lib/maas/secret; echo
cluster-controller# maas-provision install-shared-secret
  pegar el valor
chown maas:maas /var/lib/maas/secret
chmod 0640 /var/lib/maas/secret

tail /var/log/maas/pserv.log
  deberemos de ver trazas tipo "Cluster 'xxxxx' registered (via maas-region:pid=nnnnn)"

## Login
mirar login.md para ver como registrarse para poder usar el cli contra la api
Podemos registrar cualquier pc que pueda instalar la misma versión de la cli que server estemos usando

## Decargar imagenes PXE
Debemos hacerlo cada vez que añadamos un nuevo cluster controller

Hacerlo desde la interfaz web:
MAAS/images/

Ahí podemos seleccionar la release y  las arquitecturas.

La ip configurada en maas_local_settings.py:DEFAULT_MAAS_URL en el region controller debe ser accesible por el cluster-controller.
Si no, no funcionará la importación de imágenes.

Esto es porque parece que las imágenes primero se las baja el region y luego hace de proxy para que se las bajen los clusters. Lo que no me queda claro es si al haber borrado del cluster master (que era el region) esto va a funcionar.

Las releases/arquitecturas que se van a bajar se almacenan en postgresql: maasdb.maasserver_bootresource

Baja imágenes de http://maas.ubuntu.com/images/ephemeral-v2/releases/ y se instala en /var/lib/maas/boot-resources/current
En /var/lib/maas/boot-resources/current/amd64/generic/trusty/release/root-tgz tenemos lo que se carga en el sistema

Para añadir otras imagenes no ubuntu y más detalles sobre imágenes mirar imagenes.md

// ANTIGUO //

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

// FIN ANTIGUO //


## Configurar DHCP (cada cluster controller tiene un DHCP+DNS)
Web: https://maas.ubuntu.com/docs1.5/cluster-configuration.html (contiene info generica sobre configurar el cluster)
API: https://maas.ubuntu.com/docs1.5/maascli.html#cli-dhcp
Manual: https://maas.ubuntu.com/docs1.5/configure.html#manual-dhcp

Cada cluster controller estará configurado para, al menos, manejar una red de nodos. Cada nodo tiene que estar en, al menos, una de estas redes. Si no, los nodos serán incapaz de llegar a este servidor DHCP.
The cluster controller must be able to find nodes’ IP addresses based on their MAC addresses, by inspecting its ARP cache. This implies that the nodes and the clsuter controler must on the same physical subnet.

Hacer desde la interfaz web.
En la 1.7 han añadido algunos campos nuevos (rangos para ips estaticas)

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
