http://www.travnewmatic.com/2015/02/ubuntu-maas-maas-image-builder-centos-6.html
http://askubuntu.com/questions/585532/maas-to-deploy-centos-images

Script para crear imagenes para curtin:
https://code.launchpad.net/~maas-maintainers/maas/maas-image-builder

Chef recipe que crea una imagen centos y la sube a maas:
https://github.com/jjasghar/maas/blob/centos/recipes/centos.rb


bzr branch lp:~maas-maintainers/maas/maas-image-builder
cd maas-image-builder/bin
./build --install-deps



Basically, an image gets installed into a QEMU VM, a snapshot is taken, and that is the image that MaaS pushes to provision servers.



En Arch:
Dependencias:
kpartx, qemu-utils, kvm, libvirt-bin, virtinst, genisoimage, dos2unix, unzip

packer -S multipath-tools
pacman -S dos2unix cdrkit cpio

pip install pyyaml


builder/main.py
Borro la linea 68, para que no compruebe si existe kvm-spice

sudo ./build centos amd64 --centos-edition 7

Me genera la imagen en: build-output/centos7-amd64-root-tgz

Para meterla en maas:
maas root boot-resources create name=centos/centos70 architecture=amd64/generic content@=/opt/maas-image-builder/build-output/centos7-amd64-root-tgz

http://.../MAAS/images/
Podremos ver nuestra imagen en "Generated images"
Es posible que nos diga un mensaje "Clusters importing", pues se estará pasando del region a los cluster controllers.

Ahora cambiarlo en http://192.168.122.143/MAAS/settings/
"Deploy"

MAAS 1.7.0~beta8+bzr3272-0ubuntu1.2
No me aparece la nueva imagen!
Solo me aparece si la subo con el nombre centos/centos65
maas root boot-resources create name=centos/centos65 architecture=amd64/generic content@=master.zip
->
Arreglado en 1.7.1

http://bazaar.launchpad.net/~maas-committers/maas/trunk/revision/3369
pero solo permite subir imagenes tipo
centos/centosXY

no podemos hacer centos/centos-blalba


# Como funciona

Necesito tener aqui el centos7-amd64.ks
qemu-img create -f raw disk.img 8192
virt-install --name img-build-centos7-amd64 --ram 2048 --arch x86_64 --vcpus 1 --os-type linux --os-variant rhel5 --disk path=disk.img,format=raw --network bridge=virbr0,model=virtio --location http://mirrors.kernel.org/centos/7/os/x86_64 --initrd-inject=centos7-amd64.ks --extra-args='console=ttyS0 inst.ks=file:/centos7-amd64.ks text inst.cmdline inst.headless' --noreboot --nographics --force

Deregistramos la máquina de libvirt
virt.undefine(vm_name)

mount -o loop de la imagen
/dev/dm-1 on /tmp/img-builder-yInIkA/mount type ext4 (rw,relatime,data=ordered)

Install the curtin directory into mount point
/curtin/finalize
/curtin/curtin-hooks

Crear .tar.gz
utils.create_tarball(output_path, mount_path)


