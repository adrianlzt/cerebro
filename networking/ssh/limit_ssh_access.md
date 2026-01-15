# Filtrado por IP

Para limitar el acceso si usamos claves ssh lo más sencillo es usar el authorized_keys (mirar en authorized_keys.md).

Si queremos limitar la password usaremos PAM.

Tendremos que tener pam configurado en sshd (UsePAM yes) y el módulo de pam_access (pam_access.so) configurado en el /etc/pam.d/sshd (auth required pam_access.so).
```
#%PAM-1.0
auth       include      postlogin
...
account    required     pam_access.so       <-- ADD THIS LINE
account    include      password-auth
```
