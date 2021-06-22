https://github.com/yantisj/netgrph

Models IP networks in the Neo4j Graph Database for network automation and troubleshooting.


Obtiene datos de distintas fuentes y los carga en Neo4j:
  - ficheros de configuración (rancid/oxidized)
  - lldp (ndcrawl)
  - csv

Una vez cargada la información nos permite hacer queries para, por ejemplo, encontrar el camino l2 y l3 que comunica dos IPs.

Parece que es un modelo ad-hoc a las necesidades del desarrollador y no completamente generalizable.

# Instalación
Podemos usar el playbook de ansible, pero con algunos cambios.


Comentar la instalación de Java8 e instalar openjdk-8-jre
Instalar py2neo desde el repo de git usando la rama py2neo-2.0.8.
El repo de netgrph que clona, usar la rama dev.

Si queremos exponer la interfaz gráfica en 0.0.0.0, editar /etc/neo4j/neo4j.conf y descomentar:
dbms.connectors.default_listen_address=0.0.0.0

https://netgrph.readthedocs.io/en/dev/INSTALL/
Tras instalar, cargar los datos iniciales con:
test/first_import.sh

Y luego tres veces:
./ngupdate.py -v -full


# Uso
netgrph/netgrph.py --conf /home/netgrph/netgrph/docs/netgrph.ini -nf all

Acceso a la interfaz web de neo4j
http://127.0.0.1:7474/
user: neo4j
pass: your_passwd

Si no hemos ejecutado test/set_neo4j_password.sh la password será: neo4j

Un ejemplo de query que podemos correr en neo4j
MATCH (s:Switch) RETURN s



# Modelo
Tiene los siguientes nodos:
Switch
VLAN
VRF
Router
Network
Supernet
FW

Si queremos ver las relaciones podemos usar
CALL db.schema
