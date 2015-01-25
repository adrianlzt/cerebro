Se usa celery como gestor de tareas.
El region controller puede escribir tareas para que luego el cluster controller las ejecute.

El cluster-controller usa el servicio maas-cluster-celery para coger esas tareas.
Este servicio registra las siguientes funciones:
  . provisioningserver.tasks.add_new_dhcp_host_map
  . provisioningserver.tasks.add_seamicro15k
  . provisioningserver.tasks.add_virsh
  . provisioningserver.tasks.enlist_nodes_from_mscm
  . provisioningserver.tasks.enlist_nodes_from_ucsm
  . provisioningserver.tasks.import_boot_images
  . provisioningserver.tasks.periodic_probe_dhcp
  . provisioningserver.tasks.power_off
  . provisioningserver.tasks.power_on
  . provisioningserver.tasks.refresh_secrets
  . provisioningserver.tasks.remove_dhcp_host_map
  . provisioningserver.tasks.report_boot_images
  . provisioningserver.tasks.restart_dhcp_server
  . provisioningserver.tasks.rndc_command
  . provisioningserver.tasks.setup_rndc_configuration
  . provisioningserver.tasks.stop_dhcp_server
  . provisioningserver.tasks.update_node_tags
  . provisioningserver.tasks.upload_dhcp_leases
  . provisioningserver.tasks.write_dhcp_config
  . provisioningserver.tasks.write_dns_config
  . provisioningserver.tasks.write_dns_zone_config
  . provisioningserver.tasks.write_full_dns_config




# Consultar tareas
En el region controller:

rabbitmqctl list_vhosts

rabbitmqctl list_queues -p /maas_workers
  aqui habrá una cola con el nombre del cluster donde estarán las tareas.

Activando la interfaz web de rabbit podemos ver como circula los mensajes y su contenido.

El payload está en base64:
echo QWxhZGRpbjpvcGVuIHNlc2FtZQ== | base64 --decode

Aun asi no se ve muy bien.

