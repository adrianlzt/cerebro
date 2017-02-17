https://github.com/systemd/systemd/blob/master/HACKING

No se puede usar un container de docker con mkosi

dnf install git mkosi
dnf install 'dnf-command(builddep)'
dnf builddep systemd
git clone git@github.com:systemd/systemd.git
cd systemd
mkosi
