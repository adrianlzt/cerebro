http://docs.openstack.org/admin-guide-cloud/content/section_metadata-service.html

curl http://169.254.169.254/1.0/meta-data/

Nos da info bastante básica.
No útil para obtener que instancia es (nos da el id dentro del hypervisor) o a que tenant pertenece.
Tambien contiene el user-data (script para ejecutar al inicio) y las claves publicas a insertar.

Esa ip llega al qrouter donde es enrutada a un agente que conecta mediante unix socket al servidor de metadatos.
