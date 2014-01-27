Boceto para crear nuestro módulo: https://github.com/Aethylred/puppet-blank

# http://docs.puppetlabs.com/puppet/2.7/reference/modules_fundamentals.html

Es un comendio de manifest juntos que tienen que ver entre si.
Es una forma de estructurar los manifest.

El directorio donde está el modulo tiene que tener el mismo nombre el la clase.
/etc/puppet/module/mimodulo  ->  class mimodulo

Los modulos tienen que estar en minusculas.


Modulos ya existentes:
puppet module search iptables

Ya en nuestra máquina:
puppet module list


Instalar:
puppet module install nombre/modulo
Use `puppet module install --target-dir <DIR>` to install modules elsewhere
Use `puppet module install --ignore-dependencies` to install only this module


Para crear la estructura de directorios para crear un modulo:
puppet module generate user-nombre
Para luego poder usarlo, cambiar el nombre del directorio, ya que este debe ser igual al nombre de la clase:
mv user-nombre nombre


Donde busca puppet los modulos:
puppet apply --configprint modulepath


Para ejecutar una clase que tenemos en el modulepath:
puppet apply -e "include nombreClase"

Para clases parametrizadas:
puppet apply -e "class {'nombre': var => 'valor', var2 => 'otro',}"



Para usar un recurso de otro modulo solo hace falta que el módulo esté instalado, y hacer referencia a él.
Ejemplo, si queremos crear un usuario mysql desde nuestro módulo, pondremos:
class miclase {
  database_user { 'bob@10.34.56.201':
      password_hash => mysql_password('foo')
  }

