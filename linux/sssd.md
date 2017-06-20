SSSD can provide credentials caches for several system services:
 NSS
 PAM
 SSH (known_hosts)
 autofs (coger mount locations de un LDAP)
 sudo (conecta con LDAP para obtener policies)
 PAC (conex con Kerneros para usar Active Directory)


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
