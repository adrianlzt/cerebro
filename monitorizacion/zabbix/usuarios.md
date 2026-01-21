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

Si tenemos nested hostgroups (ejemplo: CLIENTE/ CLIENTE/PROD CLIENTE/NOPROD) y asignamos el permiso de RW a CLIENTE/ al user group, si vamos a la ventana de hostgroups, abrimos ese HG y pinchamos en "Apply permissions and tag filters to all subgroups", el user group obtendrá los permisos RW para todos los nested group.
Los nuevos grupos nested que se creen, se irán metiendo automáticamente en los permisos de ese user group.

# Performance

Cuidado con los permisos, generan queries muy grandes que matan la performance
Solo los "Zabbix Super Admin" hacen skip para no cargar la bbdd

# Habilitar/deshabilitar

Podemos denegar el acceso "Frontend access" sin deshabilitar la cuenta si queremos que le lleguen notificaciones pero no queremos que puedan acceder al frontend

# Autologin

Para que no le espire la cookie de sesion

# Resetear session (reset)

<http://yourserver.fq.dn/zabbix/latest.php?filter_rst=1>
Ya no funciona en la 6.0

Se puede hacer con SQL. Mirar en sql.md "Ver los valores recordados de la interfaz web para un usuario"

# database

Se almacena en la tabla users
La contrseña es md5 sin hashear

## sesion

Toda la info de la sesión del usuario (filtros, que host estaba viendo, etc) se almacena en la db:

select profiles.\* from users join profiles using (userid) where username = 'FOOBAR';

Por ejemplo
178678 │ 184 │ web.templates.filter_name │ 0 │ 0 │ 0 │ Template Foo
