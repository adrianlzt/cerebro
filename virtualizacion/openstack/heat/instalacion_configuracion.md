# Instalación cliente
Uso un virtualenv.
mkvirtualenv heat
pip install python-heatclient

# Configuración
Mirar ../credenciales.md
source ~/.openstack/keys

# Ejecutar
heat stack-list
