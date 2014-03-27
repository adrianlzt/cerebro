http://nagios.sourceforge.net/docs/3_0/volatileservices.html

Por lo general los servicios son no volátiles.

Volatile services are useful for monitoring...
  Things that automatically reset themselves to an "OK" state each time they are checked
  Events such as security alerts which require attention every time there is a problem (and not just the first time)

Los eventos volátiles hacen que cuando un check este en un estado hard no-OK, si el siguiente check es no-OK se registra ese problema, se notifica a los contactos y los eventhandlers se ejecutan.
