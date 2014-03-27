http://docs.puppetlabs.com/puppet/latest/reference/lang_classes.html#inheritance


Lo que nos da la herencia:
  When a derived class is declared, its base class is automatically declared first (if it wasn’t already declared elsewhere).
  
  The base class becomes the parent scope of the derived class, so that the new class receives a copy of all of the base class’s variables and resource defaults.
  
  Code in the derived class is given special permission to override any resource attributes that were set in the base class.

No se puede hacer inherits en defined types.


El típico caso es definir en el params.pp los valores por defecto de init.pp
class ntp (
  $autoupdate        = $ntp::params::autoupdate,
  $config            = $ntp::params::config,
  $config_template   = $ntp::params::config_template,
  ...
) inherits ntp::params {

En la clase ntp podemos usar las variables directamente (sin necesidad de poner $ntp::params::)


En el resto de clases deberemos heredar la clase ntp:
class ntp::config inherits ntp {

De esta manera estaremos cogiendo las variables de params con las modificaciones oportunas que hayamos hecho al declarar la clase.
class {'ntp':
  $config = '/tmp/blabla'
}

Si heredásemos params tomaríamos el valor por defecto.
Si heredamos ntp, cogeríamos /tmp/blabla
