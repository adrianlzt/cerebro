http://docs.grafana.org/installation/ldap/#ldap-authentication

grafana.ini
[auth.ldap]
enabled = true
config_file = /etc/grafana/ldap.toml

ldap.toml


Podemos hacer la query de dos maneras.
Con un usuario que haga el bind (un user read-only que se llame, por ejemplo, grafana).
O intentar hacer el bind directamente con el user que se quiere loguear: usando lo de %s y quitando el bind_password

Podemos definir varias veces secciones [[servers.group_mappings]] para que un usuario pertenezca a varias orgs

[[servers.group_mappings]]
group_dn = "cn=admins,dc=grafana,dc=org"
org_role = "Admin"
org_id = 1



# Errores
2016/04/12 13:28:03 [login.go:102 LoginPost()] [E] Error while trying to authenticate user: Error 1062: Duplicate entry 'email@email.com' for key 'UQE_user_email'

Esto es porque ya existe un user con ese email en la bbdd local de grafana


# Troubleshooting
Analizar con tcpdump la llamada a LDAP para ver si está funcionando correctamente (capturar el .cap y abrirlo con wireshark para poder entenderlo)
