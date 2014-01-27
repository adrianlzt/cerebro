Puppet define que los recursos solo deben ser definidos una vez.
Si necesitasemos un usuario que debería ser instalado por dos clases distintas (ftp y smpt por ejemplo), habría que definir este usuario una única vez, y luego usar los virtual resources para asegurarnos de que el usuario está presente en ambas clases.

http://docs.puppetlabs.com/guides/virtual_resources.html

Hace un recurso virtual:
@recurso

Utiliza un recurso virtual:
<| |>
