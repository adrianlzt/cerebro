http://maas.ubuntu.com/docs1.7/bootsources.html

Parece que las imágenes primero se las baja el region y luego hace de proxy para que se las bajen los clusters. No me queda claro donde baja el region controller las imagenes, no las he encontrado. Mirar la conf de squid a ver donde pueden estar.

Las releases/arquitecturas que se van a bajar se almacenan en postgresql: maasdb.maasserver_bootresource

Baja imágenes de http://maas.ubuntu.com/images/ephemeral-v2/releases/ y se instala en /var/lib/maas/boot-resources/current
En /var/lib/maas/boot-resources/current/amd64/generic/trusty/release/root-tgz tenemos lo que se carga en el sistema




# boot sources
lugar de donde podemos obtener imagenes, parece que son las que se usan en el enlistment
maas $PROFILE boot-sources read

maas $PROFILE boot-source update 1 url="http://custom.url" keyring_filename="" keyring_data@=./custom_keyring_file
  actualizar los datos de un source que ya existe

maas $PROFILE boot-sources create url=http://my.url keyring_filename="" keyring_data@=./ custom_keyring_file
  añadir un source nuevo


# boot source selection
filtro que aplicamos sobre un source para bajar unas imagenes
maas $PROFILE boot-source-selections read 1
  aqui vemos el filtro que está aplicado sobre el source id=1 (de la lista de boot-sources)

maas $PROFILE boot-source-selection create 1 os="ubuntu" release="precise" arches="amd64" subarches="*" labels="*"
  añadir un filtro nuevo a un source. Podemos hacer "create 2" o "create 3" para poner nuevos filtros.



# boot images
Imagenes disponibles que hay en un cluster en particular
Lo mismo que boot resources??


# boot resources
Parece que es la lista de OSs que podemos instalar en una máquina
maas unica boot-resources read

Para tener más detalles, pasando su id:
maas unica boot-resource read 1

Forzar que los cluster se bajen las nuevas imagenes:
maas root node-groups import-boot-images


Cargar otros SOs:
mirar image-builder.md

maas root boot-resources create name=windows/win2012r2 title="Windows Server 2012 R2" architecture=amd64/generic filetype=ddtgz content@=/home/ubuntu/windows-server-2012-r2.tar.gz
  Crear una imagen. Tenemos que pasar un .tar.gz de una imagen del disco
  si no ponemos filetype por defecto se pondra a 'tgz'
  Entiendo que necesitamos un dump de una instalacion con cloud-init
  Una opción es buscar imágenes para openstack, que creo que ya llevan clooud-init. Supongo que habrá que convertirlas a raw y subirlas en ddtgz.
  Hay dos opciones para subir, tgz o ddtgz /usr/lib/python2.7/dist-packages/maasserver/forms.py BOOT_RESOURCE_FILE_TYPE_CHOICES_UPLOAD
  Tambien puedo bajar alguna imagen ya hecha de vagrant, entrar, instalar cloud-init y luego convertir la imagen a raw.

  Imagenes cloud de centos: http://cloud.centos.org/centos/
  De varias distros: http://thornelabs.net/2014/06/01/where-to-find-openstack-cloud-images.html

Parece que la arquitectura tiene que ser una de las ya existentes cuando llamamos a "boot-resources read".

Al subir una imagen, en las settings de MAAS (MAAS/settings/) podremos seleccionar el nuevo sistema operativo para hacer el deploy

Las imagenes que subamos se almacenan en la postgresql del region controller.
La relación que sigue es:
maasserver_bootresource: lista de recursos
maasserver_bootresourcefile: lista de ficheros para cada recurso
maasserver_largefile: donde se almacenan los ficheros

Periódicamente estas imágenes se sincronizan con los cluster controller, y estarán disponibles en /var/lib/maas/boot-resources/current

/usr/lib/python2.7/dist-packages/maasserver# less urls_api.py
    url(
        r'^boot-resources/(?P<id>[^/]+)/upload/(?P<file_id>[^/]+)/$',
        boot_resource_file_upload_handler,

from maasserver.api.boot_resources import BootResourceFileUploadHandler
class BootResourcesHandler(OperationsHandler):
    def create(self, request):





