http://docs.ansible.com/acl_module.html

# Grant user Joe read access to a file
- acl: name=/etc/foo.conf entity=joe etype=user permissions="r" state=present

# Removes the acl for Joe on a specific file
- acl: name=/etc/foo.conf entity=joe etype=user state=absent

# Sets default acl for joe on foo.d
- acl: name=/etc/foo.d entity=joe etype=user permissions=rw default=yes state=present

# Same as previous but using entry shorthand
- acl: name=/etc/foo.d entry="default:user:joe:rw-" state=present

# Obtain the acl for a specific file
- acl: name=/etc/foo.conf
  register: acl_info

Aplicar a muchos ficheros:
  - name: prueba
    acl: name={{item}} entity=adrian etype=user permissions='rw' state=present
    with_fileglob: /tmp/prueba-ans/dir/file*



Ad-Hoc
ansible master-1 -m acl -sa "name=/var/log/messages entity=cyclops etype=user permissions="r" state=present"
Permitir al usuario cyclops leer el fichero /var/log/messages
