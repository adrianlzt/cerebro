Borrar password de usuario:
passwd -d usuario

/etc/shadow
man 3 crypt
$1$ stands for MD5
$2a$ is Blowfish
$2y$ is Blowfish (correct handling of 8-bit chars)
$5$ is SHA-256
$6$ is SHA-512

hack/md5_search.md


# Expire
http://www.thegeekstuff.com/2009/04/chage-linux-password-expiration-and-aging/

chage --list USUARIO


Que caduque la clave a los X dias
chage -M number-of-days username

Desactivar expiración
chage -I -1 -m 0 -M 99999 -E -1 username


shadow manipulates the contents of the shadow password file, /etc/shadow. The structure in the #include file is:

    struct spwd {
          char          *sp_namp; /* user login name */
          char          *sp_pwdp; /* encrypted password */
          long int      sp_lstchg; /* last password change */
          long int      sp_min; /* days until change allowed. */
          long int      sp_max; /* days before change required */
          long int      sp_warn; /* days warning for expiration */
          long int      sp_inact; /* days before account inactive */
          long int      sp_expire; /* date when account expires */
          unsigned long int  sp_flag; /* reserved for future use */
    }

