Instalar paquete de testing.

http://serverfault.com/questions/22414/how-can-i-run-debian-stable-but-install-some-packages-from-testing

/etc/apt/apt.conf.d add the following file
99defaultrelease:
APT::Default-Release "stable";


in /etc/apt/sources.list.d - add urls for testing / unstable sources
stable.list:
deb     http://ftp.de.debian.org/debian/    stable main contrib non-free
deb-src http://ftp.de.debian.org/debian/    stable main contrib non-free
deb     http://security.debian.org/         stable/updates  main contrib non-free


testing.list:
deb     http://ftp.de.debian.org/debian/    testing main contrib non-free
deb-src http://ftp.de.debian.org/debian/    testing main contrib non-free
deb     http://security.debian.org/         testing/updates  main contrib non-free


apt update
apt -t testing install  paquete
