mv *.deb dir/
apt-ftparchive packages dir > dir/Packages
gzip dir/Packages

/etc/apt/sources.list.d/local.list
deb file:/PATH/dir ./
