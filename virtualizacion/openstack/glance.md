http://docs.openstack.org/developer/glance/
http://docs.openstack.org/user-guide/content/cli_manage_images.html

Es el gestor de imágenes virtuales (AMIs en Amazon, boxes para vagrant) para Openstack.
The Glance project provides services for discovering, registering, and retrieving virtual machine images. 


Configuración /etc/glance

Tenemos dos servicios: API y Registry

Configuración básica para los dos servicios:
[DEFAULT]
sql_connection = mysql://glance:password@localhost/glance
[keystone_authtoken]
admin_tenant_name = service
admin_user = glance
admin_password = password
[paste_deploy]
flavor=keystone 


Búsqueda de errores: 
/var/log/glance/registry.log
/var/log/glance/api.log


Meter imágenes:
Bajamos el disco:
http://uec-images.ubuntu.com/releases/12.04.3/release/ubuntu-12.04-server-cloudimg-amd64-disk1.img

Y lo metemos en glance:
glance image-create --is-public true --disk-format qcow2 --container-format bare --name "Ubuntu" < ubuntu-12.04-server-cloudimg-amd64-disk1.img

Se pueden definir parámetros como min_disk o min_ram

--is-protected [True|False]
Prevents an image from being deleted.

--is-public [True|False]
Makes an image accessible for all the tenants (admin-only by default).




Bajar imagen
glance image-download ID --progress --file fichero.qcow2


# SQL
Las 10 imágenes que más ocupan, tamaño en GB

select name,size/1024/1024/1024 as size_gb,created_at from images where status <> "deleted" order by size desc limit 10;
