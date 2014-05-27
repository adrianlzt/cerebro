http://www.masterzen.fr/2011/12/11/the-indirector-puppet-extensions-points-3/

Each model can exist physically under different forms. For instance Facts can come from Facter or a YAML file, or Nodes can come from an ENC, LDAP, site.pp and so on. This is what we call a Terminus.

For the Latin illiterate out-there, terminii is the latin plural for terminus.

Manage indirections to termini.  They are organized in terms of indirections - e.g., configuration, node, file, certificate -- and each indirection has one or more terminus types defined.

So a terminus is a concrete class that knows how to deal with a specific model type. A terminus exists only for a given model. For instance the catalog indirection can use the Compiler or the YAML terminus among half-dozen of available terminus.

Los diferentes tipos de terminii que tenemos: https://github.com/puppetlabs/puppet/tree/master/lib/puppet/indirector

Un terminus deberá implementar:
def find(request)
  # request.key contains the instance to find
end

def destroy(request)
end

def search(request)
end

def save(request)
  # request.instance contains the model instance to save
end
