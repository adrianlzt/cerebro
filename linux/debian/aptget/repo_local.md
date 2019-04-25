https://wiki.debian.org/HowToSetupADebianRepository

# local-apt-repository
https://www.joachim-breitner.de/blog/681-Quickest_path_to_a_local_apt_repository
https://launchpad.net/ubuntu/+source/local-apt-repository
Mete directamente el fichero /etc/apt/sources.list.d/local-apt-repository.list
Solo local

Solo con copiar un .deb a /srv/local-apt-repository se genera automaticamente el repo (vigila el dir con systemd)
Si queremos hacerlo a mano:
/usr/lib/local-apt-repository/rebuild


# debify
https://hub.docker.com/r/spotify/debify/
Container de docker que solo necesita un dir con .deb y un .gnupg



# apt-ftparchive
mv *.deb DIR/
apt-ftparchive packages dir > DIR/Packages
apt-ftparchive -o "APT::FTPArchive::Release::Origin=local-apt-repository" -o "APT::FTPArchive::Release::Description=Local repository created by local-apt-repository" release DIR > $DIR/Release

/etc/apt/sources.list.d/local.list
deb file:///PATH/DIR ./



# mini-dinstall
apt install mini-dinstall
Pensando para subir con un comando


# mini-dak
No esta en los repos oficiales

# reprepro
apt install reprepro
coñazo de setear
