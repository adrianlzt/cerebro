#http://docs.puppetlabs.com/references/latest/type.html
Los más tipicos:
package
file
service
exec
cron
user
group
notify (se usa para debugear. No se ejecuta en orden)

Ej. formas de definir un paquete:
package { 'apache':
	ensure => present,
}

package { 'apache':
        ensure => '2.2-3.el6.bla.bla',
}

package { 'nombreQueQuiera':
	name => 'apache',
	ensure => present,
}


Listar tipos de recursos nativos:
puppet describe --list

Resumen de un tipo específico:
puppet describe <tipo> -s

Detalle de los parámetros
puppet describe <tipo>


ensure: para decirle el estado en el que queremos que este el recurso, que este instalado o que no. 
O en paquetes "present", "latest" o "version2.3".


puppet resource
Nos permite extraer el recurso de la maquina donde lo ejecutamos.
Por ejemplo, puppet resource user root nos saca en formato puppet el recurso de usuario root.
Esto sirve para en una maquina que ya existe ir sacando todos los recursos que ya existen.

puppet resource service
Nos lista todos los servicios que están disponibles en la maquina
Nos dice si esta corriendo actualmente (ensure), y si esta configurado para iniciarse al arrancar (enable).

puppet service sshd
Nos dice el estado del servicios sshd

puppet resource file /etc/sudoers
Nos da las caracterísitcas del fichero. Podemos usarlo como plantilla
