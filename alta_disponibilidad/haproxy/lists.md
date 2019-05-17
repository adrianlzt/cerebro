Ejemplo de una lista para limitar el acceso según unas regexp:

acl is_ported_path path_reg -i -f /etc/haproxy/ported_path.list

### cat /etc/haproxy/ported_path.list
^/users/add_player$
^/users/view.*$
