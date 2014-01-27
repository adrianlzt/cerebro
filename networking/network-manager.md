NetworkManager es el gestor de conexiones de ubuntu.

Si se queda pillado (nm-tool dice status: asleep), hacer un: killall NetworkManager

Herramientas asociadas:
nm-tool(1), nm-online(1), nmcli(1), NetworkManager.conf(5), nm-settings(5), nm-applet(1), nm-connection-editor(1)

nm-applet: icono del systray para manejar las redes

nmcli
  nm: estado networkmanager
  c: conexiones configuradas
  d: dispositivos gestionados
  wifi list: listar wifis
  d disconnect iface wlan1: desconectar wlan1
  d list iface wlan1: info de wlan1

nm-tool: estado de las interfaces y de NetworkManager

nm-connection-editor: editor gráfico de las conexiones de red
