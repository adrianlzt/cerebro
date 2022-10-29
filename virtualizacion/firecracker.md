https://aws.amazon.com/es/blogs/aws/firecracker-lightweight-virtualization-for-serverless-computing/
Lightweight Virtualization for Serverless Computing
VMs mínimas que arrancan en ms

Como containers pero con más capas de seguridad al ser una vm

Pensado para correr funciones lambda o contenedores.


# firectl
firectl para crear vms con firecracker

curl -fsSL -o hello-vmlinux.bin https://s3.amazonaws.com/spec.ccfc.min/img/hello/kernel/hello-vmlinux.bin
curl -fsSL -o hello-rootfs.ext4 https://s3.amazonaws.com/spec.ccfc.min/img/hello/fsfiles/hello-rootfs.ext4
firectl --kernel=hello-vmlinux.bin --root-drive=hello-rootfs.ext4
user root pass root
No tendrá internet

Para tener red tendremos que crear un dispositivo tap y hacer NAT con iptables.
https://kruzenshtern.org/firecracker-network-setup/


# containerd
https://github.com/firecracker-microvm/firecracker-containerd
Para si queremos correr contenedores dentro de un firecracker

# ignite
Parece abandonado.
https://github.com/weaveworks/ignite
Weave Ignite is an open source Virtual Machine (VM) manager with a container UX and built-in GitOps management.
