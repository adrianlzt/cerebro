# User type
Normal user: monitoring, inventory y reports

Administrator: monitoring, inventory, reports y configuración

Super administrator: monitoring, inventory, reports, configuración y administración

Guest: sin autorización, usado para login


Es posible modificar que pueden ver, o dejar de ver, cada tipo de usuario.




# Permisos
Los permisos se asocian entre grupos, de grupos de usuarios a grupos de hosts.

4.0: permisos basados en tags
Esto afecta a poblems, dashboard, overview, screen, maps, actions


# Performance
Cuidado con los permisos, generan queries muy grandes que matan la performance
Solo los "Zabbix Super Admin" hacen skip para no cargar la bbdd


# Habilitar/deshabilitar
Podemos denegar el acceso "Frontend access" sin deshabilitar la cuenta si queremos que le lleguen notificaciones pero no queremos que puedan acceder al frontend


# Autologin
Para que no le espire la cookie de sesion


# Resetear session
http://yourserver.fq.dn/zabbix/latest.php?filter_rst=1
