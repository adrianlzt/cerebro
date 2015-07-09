http://mojodna.net/2014/05/14/kvm-libvirt-and-ubuntu-14-04.html

cloud init puede buscar informacion de metadatos en una segunda imagen

cat <<EOF > meta-data
instance-id: iid-local01;
local-hostname: ubuntu
EOF


cat <<EOF > user-data
#cloud-config

# upgrade packages on startup
package_upgrade: true

# install git
packages:
  - git

# create a user
runcmd:
  - [ useradd, -c, Seth Fitzsimmons, -u, 1001, -G, sudo, -U, -M, -p, $5$FVJ1C48Rlhy/$GOidCu4a0qTmngqhFMGT7z/N.8nYTuXaaGzEDPhfIL., -s, /bin/bash, seth ]
EOF


genisoimage -output configuration.iso -volid cidata -joliet -rock user-data meta-data



