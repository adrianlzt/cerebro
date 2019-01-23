# Elegir un buen password
https://www.schneier.com/blog/archives/2014/03/choosing_secure_1.html

Por que no forzar a la gente a cambiar el password periódicamente:
https://www.schneier.com/blog/archives/2016/08/frequent_passwo.html


Lib para chequear que la password es buena:
https://blogs.dropbox.com/tech/2012/04/zxcvbn-realistic-password-strength-estimation/

Passwords ya hackeadas públicas:
https://haveibeenpwned.com/Passwords


Borrar password de usuario:
passwd -d usuario

/etc/shadow
$id$salt$encrypted
man 3 crypt

IDs
$1$ stands for MD5
$2a$ is Blowfish
$2y$ is Blowfish (correct handling of 8-bit chars)
$5$ is SHA-256
$6$ is SHA-512

En /etc/login.defs estará el método de encriptación a usar.
En arch SHA-512, con 5000 vueltas (valor por defecto) (mirar man passwd)
A más vueltas, más dificil de hacer brute-force, pero también más CPU le cuesta loguear a los usuarios.

Generador online para blowfish: http://www.passwordtool.hu/blowfish-password-hash-generator

Si queremos forzar un método de encriptación:
echo "pepe:password" | chpasswd -c MD5

Si queremos generar la clave a mano (crypt o md5 -1) (nos devolverá una cadena igual a la que se almacena en /etc/shadow):
openssl passwd -1 -salt SALT PASSWORD

Programa en c para encriptar una pass con un métdo determinado y una salt dada. Compilar con: gcc -lcrypt hash.c
#include<stdio.h>
#include <crypt.h>
void main() {
 printf("%s\n", crypt("password", "$1$r7cA0J32"));
 // Para sha256 seria: crypt("password", "$6$v6vDH8sX"));
 // Para sha256 cambiando el numero de vueltas: crypt("password", "$6$rounds=5000$v6vDH8sX"));
}

Las passwords encriptadas no se parecen a un tipico hash (letras y números en minúsculas).
https://www.vidarholen.net/contents/blog/?p=32
Ejemplo de como generar un md5crypt: https://www.vidarholen.net/contents/junk/files/md5crypt.bash
De forma muy resumida hace esto:
1. Generate a simple md5 hash based on the salt and password
2. Loop 1000 times, calculating a new md5 hash based on the previous hash concatenated with alternatingly the password and the salt.
3. Use a special base64 encoding on the final hash to create the password hash string

Como se genera el hash de SHA-512: https://www.vidarholen.net/contents/blog/?p=33

hack/hash.md


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

