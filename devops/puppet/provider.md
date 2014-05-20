http://www.masterzen.fr/2011/11/02/puppet-extension-point-part-2/

During catalog application, every RAL resource is evaluated. This process tells a given type to do what is necessary so that every managed property of the real underlying resource match what was specified in the manifest. The software system that does this is the provider.

There can be more than one provider per type, depending on the host or platform. For instance every users have a login name on all kind of systems, but the way to create a new user can be completely different on Windows or Unix. In this case we can have a provider for Windows, one for OSX, one for Linux… Puppet knows how to select the best provider based on the facts (the same way you can confine facts to some operating systems, you can confine providers to some operating systems).

Por ejemplo, para el type package tendremos los providers: rpm, yum, etc
