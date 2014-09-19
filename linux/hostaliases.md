http://serverfault.com/questions/65199/is-it-possible-to-alias-a-hostname-in-linux

echo "fakehost realhost" > /etc/host.aliases
echo "export HOSTALIASES=/etc/host.aliases" >> /etc/profile
. /etc/profile

N.B. ping requires you to set this up as root, but you can do it as any user for any application that runs as that user. ping suids to root.


echo "export HOSTALIASES=~/.hostaliases" >> ~/.bashrc
echo "nombre nombre-dificil-maquina" >> ~/.hostaliases
