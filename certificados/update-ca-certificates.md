http://kb.kerio.com/product/kerio-connect/server-configuration/ssl-certificates/adding-trusted-root-certificates-to-the-server-1605.html

# Debian-like
Utilidad para meter nuevos certificados en el sistema.

update-ca-certificates is a program that updates the directory /etc/ssl/certs to hold SSL certificates and generates certificates.crt, a concatenated single-file list of certificates.

It reads the file /etc/ca-certificates.conf. Each line gives a pathname of a CA certificate under /usr/share/ca-certificates that should be trusted. Lines that begin with "#" are comment lines and thus ignored. Lines that begin with "!" are deselected, causing the deactivation of the CA certificate in question.

Furthermore all certificates found below /usr/share/ca-certificates are also included as implicitly trusted


Más sencillo, usar:
sudo cp fichero.pem /usr/share/ca-certificates/fichero.crt
  deben ponerse con extension .crt
sudo dpkg-reconfigure ca-certificates


# CentOS
yum install ca-certificates
update-ca-trust enable
cp foo.crt /etc/pki/ca-trust/source/anchors/
update-ca-trust extract


# Arch
pacman -S ca-certificates
sudo update-ca-trust enable
sudo cp fichero.crt /etc/ca-certificates/trust-source/anchors
sudo trust extract-compat
