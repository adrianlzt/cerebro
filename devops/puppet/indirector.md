http://www.masterzen.fr/2011/12/11/the-indirector-puppet-extensions-points-3/

The Indirector allows the Puppet programmer to deal with model instances without having to manage herself the gory details of where this model instance is coming/going.

Basically the Indirector implements a basic CRUD (Create, Retrieve, Update, Delete) system. In fact it implements 4 verbs (that maps to the CRUD and REST verb sets):
  Find: allows to retrieve a specific instance, given through the key
  Search: allows to retrieve some instances with a search term
  Destroy: remove a given instance
  Save: stores a given instance
