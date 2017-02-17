https://github.com/systemd/systemd/blob/master/HACKING

# En Arch
yaourt -S btrfs-progs mkosi dnf rpm-org
git clone git@github.com:systemd/systemd.git
cd systemd
sudo mkosi
  he tenido que modificar el mkosi para meterle un --nogpgcheck porque fallava una key al instalar
