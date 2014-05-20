http://www.masterzen.fr/2011/11/02/puppet-extension-point-part-2/

During compilation, the puppet parser will instantiate Puppet::Parser::Resource instances which are Puppet::Resource objects. Those contains the various properties and parameters values defined in the manifest.

Those resources are then inserted into the catalog (an instance of Puppet::Resource::Catalog)

The catalog is then sent to the agent (usually in json format)

The agent converts the catalog individual resources into RAL resources by virtue of Puppet::Resource#to_ral. We’re now dealing with instances of the real puppet type class. RAL means Resource Abstraction Layer.
The agent then applies the catalog. This process creates the relationships graph so that we can manage resources in an order obeying require/before metaparameters. During catalog application, every RAL resource is evaluated. This process tells a given type to do what is necessary so that every managed property of the real underlying resource match what was specified in the manifest. The software system that does this is the provider.
