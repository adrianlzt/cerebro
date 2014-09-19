Los discos virtuales de una VM nunca pueden ser usados por otra VM, ya que una vez la VM arranca bloquea el acceso a dichos discos para que nadie los use excepto ella.
Al activar multiwriter deshabilitas ese bloqueo y cualquier vm puede acceder a dichos discos.
Si haces esto en dichos discos debes montar un FS, o lo que sea, que gestione internamente los bloqueos
Normalmente esto se usa para cluster, booting disk de oracle o cosillas similares en las que el cluster controla esos discos como discos de quorum o similar

