Configuración: /etc/keystone/keystone.conf

En [DEFAULT] definimos el password (admin_token)
En [sql] detemerminamos la conexión con la base de datos (sqlite, mysql, etc):
  connection = sqlite:////var/lib/keystone/keystone.db
    o
  connection = mysql://keystone:password@localhost/keystone


Reiniciar keystone: service keystone restart
Crear tablas en la bbdd: keystone-manage db_sync


Para buscar errores: /var/log/keystone/keystone.log

Si queremos empezar con la base de datos de keystone desde 0:
mysql -u root -p -e "drop database keystone"
mysql -u root -p -e "create database keystone"
mysql -u root -p -e "grant all privileges on keystone.* TO 'keystone'@'localhost' identified by 'password'"
keystone-manage db_sync


Conceptos:
Tenant: sería como un proyecto

Crear tenant:
keystone tenant-create --name=admin

Crear usuarios:
keystone user-create --name=admin --pass="PASSWORD" --email=admin@domain.com

Crear roles:
keystone role-create --name=admin

Dar a un usuario un rol y meterlo en un tenant:
keystone user-role-add --user-id $ADMIN_USER --role-id $ADMIN_ROLE --tenant-id $ADMIN_TENANT

Crear servicios:
keystone service-create --name nova --type compute --description 'OpenStack Compute Service'

Crear endpoints:
keystone endpoint-create --region KEYSTONE_REGION --service-id $COMPUTE_SERVICE --publicurl 'http://'"$KEYSTONE_HOST"':8774/v2/$(tenant_id)s' --adminurl 'http://'"$KEYSTONE_HOST"':8774/v2/$(tenant_id)s' --internalurl 'http://'"$KEYSTONE_HOST"':8774/v2/$(tenant_id)s'



# Añadir endpoint cinder v2
keystone service-create --name=cinderv2 --type=volumev2 --description="Cinder Volume Service V2"
  Note the id property returned and use it to create the endpoint.

keystone endpoint-create --service-id=the_service_id_above --publicurl='https://ost-controller-lb-dev.service-d.dsn.inet:8776/v2/%\(tenant_id\)s' --internalurl='https://ost-controller-lb-dev.om-d.dsn.inet:8776/v2/%\(tenant_id\)s' --adminurl='https://ost-controller-lb-dev.om-d.dsn.inet:8776/v2/%\(tenant_id\)s'
