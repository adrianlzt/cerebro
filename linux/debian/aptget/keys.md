Mostrar claves:
apt-key list

Meter una clave
apt-key add fichero.gpg
 
  El fichero .gpg deberá ser del tipo:
  -----BEGIN PGP PUBLIC KEY BLOCK-----
  Version: GnuPG v1.4.14 (GNU/Linux)
  
  mQENBFIOqEUBCAD...
  ....
  -----END PGP PUBLIC KEY BLOCK-----


Exportar una clave pública de mi repo de claves:
apt-key export A88D21E9

Borrar una clave
apt-key del A88D21E9


Desactivar:
/etc/apt/apt.conf.d/99unauth 
APT::Get::AllowUnauthenticated 1;

https://askubuntu.com/questions/74345/how-do-i-bypass-ignore-the-gpg-signature-checks-of-apt
