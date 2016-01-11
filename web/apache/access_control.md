# Version 2.4
https://httpd.apache.org/docs/2.4/upgrading.html#authz

Se sustituye Allow, Deny, Order y Satisfy por Require.

Ejemplos:
Require all denied
Require all granted
Require host example.org

Para poner varios se deben meter dentro de un grupo RequireAll, RequireAny o RequireNone:
https://httpd.apache.org/docs/2.4/mod/mod_authz_core.html#logic

RequireAll
Todas deben ser buenas

RequireAny
Alguna debe ser buena

RequireNone
Ninguna debe validarse para que el grupo se de por bueno

Ejemplo:
<RequireAny>
    Require user superadmin
    <RequireAll>
        Require group admins
        Require ldap-group cn=Administrators,o=Airius
        <RequireAny>
            Require group sales
            Require ldap-attribute dept="sales"
        </RequireAny>
    </RequireAll>
</RequireAny>




# Version 2.2
https://httpd.apache.org/docs/2.2/es/howto/access.html

Gestion de a quien se permite acceso.

El módulo principal es mod_authz_host
Otros secundarios: mod_setenvif and mod_rewrite.

# Host
Para permitir o denegar acceso basado en una ip o domain name:

Allow from dev.example.com
Deny from 192.168.205
Deny from phishers.example.com moreidiots.example


# Allow, Deny
Da igual el orden.
Todas las reglas Allow se procesan juntas.
Todas las reglas Deny se procesan juntas.

# Order
https://httpd.apache.org/docs/2.2/es/mod/mod_authz_host.html#order

Default: Order Deny,Allow


Allow,Deny
Debe hacer match en alguna regla Allow y no hacer match en ninguna de las Deny.

Deny,Allow
Por defecto se deja pasar, a no ser que se haga match en una regla Deny y Allow no le contradiga.



Match                    | Allow,Deny result                      Deny,Allow result
-------------------------|----------------------------------------------------------------------------
Match Allow only	       | Request allowed	                      Request allowed
Match Deny only	         | Request denied	                        Request denied
No match	               | Default to second directive: Denied	  Default to second directive: Allowed
Match both Allow & Deny	 | Final match controls: Denied	          Final match controls: Allowed
