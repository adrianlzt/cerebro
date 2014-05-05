http://docs.puppetlabs.com/puppet/latest/reference/lang_tags.html#using-tags

Nos puede servir para solo aplicar ciertos elementos en un puppet run:
puppet agent --test --tags apache,us_mirror1

A parte de las tags que podamos definir nosotros, un recurso siempre lleva asociada tags.
Por ejemplo
Notice: /Stage[main]/Monitorizacion::Repos/Yumrepo[bintray]/descr: current_value , should be Bintray repository (noop)
Llevará las tags: "yumrepo", "bintray", "monitorizacion::repos", "monitorizacion", "repos", "class"

Para saber que tag tiene cada recurso podemos consultar el json en:
/var/lib/puppet/client_data/catalog



Sirve para recolectar recursos virtuales o exportados

The built-in tagmail report handler can send emails to arbitrary email addresses whenever resources with certain tags are changed

Resource tags are available to custom report handlers and out-of-band report processors: Each Puppet::Resource::Status object and Puppet::Util::Log object has a tags key whose value is an array containing every tag for the resource in question
