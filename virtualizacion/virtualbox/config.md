# Default machine folder
Directorio donde se crean las VMs por defecto

vboxmanage list systemproperties | grep folder

Modificar el path:
vboxmanage setproperty machinefolder /path/to/directory/
