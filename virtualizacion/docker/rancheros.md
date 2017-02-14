http://rancher.com/rancher-os/
http://docs.rancher.com/os/

Es una distribución de linux que como pid 1 corre docker.
Todos los servicios que necesita (udev, ssh, dhcp, etc) corren como containers sobre este docker-pid-1.

Luego tienen otro docker-user para correr contenedores que quiera el usuario.

La distro son 20MB.



# AWS
https://aws.amazon.com/marketplace/pp/B01AB05EEA?ref=cns_srchrow
http://docs.rancher.com/os/running-rancheros/cloud/aws/

user rancher
