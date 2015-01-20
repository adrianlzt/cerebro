Debemos elegir una multicast address y un puerto.
http://clusterlabs.org/doc/en-US/Pacemaker/1.1-crmsh/html/Clusters_from_Scratch/_notes_on_multicast_address_assignment.html
Elegir la dirección multicast en 239.255.x.y (mirar networking/multicast.md para entender el porque).
Podemos dejar los valores por defecto: 226.94.1.1:5405

También debemos poner la dirección de la red.
	En el caso de máscaras /24, es a.b.c.0
	En el caso de máscaras /25 será a.b.c.0 o a.b.c.128
	Si no sabemos, usar ipcalc

Por lo general usaremos la configuración de ejemplo:
cp /etc/corosync/corosync.conf.example /etc/corosync/corosync.conf
Y modificaremos los parámetros:
  mcastaddr
  mcastport
  bindnetaddr


Debemos cargar pacemaker a corosync (esto cambia con corosync 2.x http://clusterlabs.org/doc/en-US/Pacemaker/1.1-crmsh/html/Clusters_from_Scratch/_configuring_corosync.html) :
cat <<END >>/etc/corosync/service.d/pcmkservice 
{
        # Load the Pacemaker Cluster Resource Manager
        name: pacemaker
        ver:  1
}
END


Arrancamos el servicio:
service corosync start
service openais start (en suse)

El servicio pacemaker no hace falta arrancarlo, lo hace corosync. Parece que en versiones antiguas si que era necesario (http://clusterlabs.org/doc/en-US/Pacemaker/1.1-plugin/html/Clusters_from_Scratch/_verify_pacemaker_installation.html)
