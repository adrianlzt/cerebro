/usr/sap/H4D/HDB00/exe/hdbsql
  parte de ese path es el id de la maquina

El puerto puede variar segun el id del server, pero parece que por defecto es 30015
Proceso escuchando en ese puerto: hdbindexserver


Las credenciales pueden estar almacenadas en el home del usuario.
Ver cuales tenemos almacenadas:
sudo -u h4dadm /usr/sap/H4D/HDB00/exe/hdbuserstore List

Conectar usando una credencial almacenada:
sudo -u h4dadm /usr/sap/H4D/HDB00/exe/hdbsql -U HANACLEARKEY

Conectar usando user/pass:
/usr/sap/H4D/HDB00/exe/hdbsql -u USER -p PASS


\al
 para tener un output tipo tabla, como mysql/postgresql
