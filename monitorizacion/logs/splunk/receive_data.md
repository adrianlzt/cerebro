Para configurar un puerto para recibir datos:

En la interfaz gráfica:
Settings -> Data -> Forwarding and receiving -> Receive data -> Add New


Es como crear el siguiente fichero:
/opt/splunk/etc/apps/splunk_app_for_nix/local/inputs.conf
  [splunktcp://9997]
  connection_host = ip

