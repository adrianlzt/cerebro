https://github.com/systemd/systemd/blob/master/HACKING

# En Arch
yaourt -S btrfs-progs mkosi dnf rpm-org
git clone git@github.com:systemd/systemd.git
cd systemd
sudo mkosi --password root
  he tenido que modificar el mkosi para meterle un --nogpgcheck porque fallava una key al instalar
  Modifico la pass de root, porque no la había definido al lanzar el mkosi
  sudo mount -o rw,loop,offset=269484032 image.raw /mnt/loop

sudo systemd-nspawn -bi image.raw

La imagen esta pelada, no tiene dnf, ni rpm, ni yum, ni vi, etc
