cibadmin - 	Provides direct access to the cluster configuration.
		Allows the configuration, or sections of it, to be queried, modified, replaced and deleted.
		Where necessary, XML data will be obtained using the -X, -x, or -p options


cibadmin -Q -> 	lista la configuración del cluster en XML
		Nos da toda la información sobre la configuracion y sobre el estado del cluster

Nos sirve para modificar la configuración desde la línea de comandos.
Tenemos que estar familiarizados con como está estructurado el XML


cibadmin --query --scope resources
  obtener unicamente los recursos

Modificar los resources con un .xml
Sustituye todos los resources por los del fichero
cibadmin --replace --scope resources --xml-file resources.xml

Con -c crea los elementos si no existian.

Para hacer operaciones idempotentes al crear recursos y constraints lo podemos hacer con modify.
Primero crearemos los recursos con pcs o crm.
Luego volcaremos el xml:
cibadmin --query --scope resources > resources.xml

Y lo podremos recrear con
cibadmin --replace --scope resources -c -xml-file resources.xml

No borra lo que ya existe, solo añade nuevos.

Tambien tendremos que hacerlo, posiblemente, con:
resources, constraints, rsc_defaults, op_defaults
