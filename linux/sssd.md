SSSD can provide credentials caches for several system services:
 NSS
 PAM
 SSH (known_hosts)
 autofs (coger mount locations de un LDAP)
 sudo (conecta con LDAP para obtener policies)
 PAC (conex con Kerneros para usar Active Directory)


# NSS (Name Service Switch)
SSSD provides an NSS module, sssd_nss, which instructs the system to use SSSD to retrieve user information
Hace falta configurar nss para usar sssd y sssd para usar nss.
Para meterlo automaticamente: authconfig --enablesssd --update
En la config de nss (/etc/nsswitch.conf) podemos configurar estos service maps
passwd:     files sss
shadow:     files sss
group:      files sss
netgroup:   files sss
services:   files sss (este no se mete automáticamente por authconfig)

En /etc/sssd/sssd.conf
[sssd]
...
services = nss, pam
[nss]
...


# PAM
SSSD provides a PAM module, sssd_pam, which instructs the system to use SSSD to retrieve user information. The PAM configuration must include a reference to the SSSD module, and then the SSSD configuration sets how SSSD interacts with PAM.

Config automatica: authconfig --update --enablesssd --enablesssdauth
Meterá entradas en /etc/pam.d/system-auth

Tambien necesitaremos meter algunas confs en el sssd.conf


# Sudo
/etc/nsswitch.conf
sudoers: files sss

Y configuracion en sssd.conf




# Troubleshooting y performance
Troubleshooting sssd: https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/6/html/Deployment_Guide/SSSD-Troubleshooting.html#idp24576816
Performance tunning sssd: https://jhrozek.wordpress.com/2015/08/19/performance-tuning-sssd-for-large-ipa-ad-trust-deployments/


# Errores
Teniendo configurados unos servidores de LDAP no alcanzables (se resolvían, pero no se podía conectar), los logins de los usuarios en /etc/passwd se ralentizaban varios segundos (~10) en ciertas ocasiones. Otras veces parece que encontraban alguna cache y entraban directamente.


# Conf ejemplo

[domain/default]

ldap_id_use_start_tls = True
cache_credentials = True
ldap_search_base = dc=om,dc=inet
krb5_realm = EXAMPLE.COM
krb5_server = kerberos.example.com
id_provider = ldap
auth_provider = ldap
chpass_provider = ldap
ldap_uri = ldap://ldap.inet/
ldap_tls_cacertdir = /etc/openldap/cacerts
[sssd]
services = nss, pam
config_file_version = 2

domains = default
[nss]

[pam]

[sudo]

[autofs]

[ssh]
