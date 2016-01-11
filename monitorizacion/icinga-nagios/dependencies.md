http://docs.icinga.org/latest/en/dependencies.html

Service and host dependencies are an advanced feature of Icinga that allow you to control the behavior of hosts and services based on the status of one or more other hosts or services. We'll explain how dependencies work, along with the differences between host and service dependencies.


No se puede hacer que cuando un HOST está DOWN se dejen de chequear todos sus services.
Añadido en Nagios 4.1.0: http://tracker.nagios.org/view.php?id=657
https://www.nagios.org/projects/nagios-core/history/4x/


Una opción, crear un check_ping asociado a la máquina y asociar todos los services a ese service "especial" que simula el check de host.

Otra opción, poner un event handler al host. Si pasa a CRITICAL, desactivar todos los services. Cuando pase a UP reactivarlos.
PELIGRO! cuidado si hace un flapeo y terminamos dejando los checks a desactivados.
http://monitoringtt.blogspot.com.es/2011/05/nagios-service-checks-based-on-host.html
Solución en pseudo-codigo
Se puede poner un global host event handler en icinga?
