Al comienzo:
  kubernetes | docker | linux

Luego se creo la OCI que define:
  OCI runtime: como arrancar, parar, pausar, etc container
  OCI image: como debe ser la imagen de un container

runC is a lightweight, portable container runtime.  It includes all of the plumbing code used by Docker to interact with system features related to containers
Containerd is a daemon providing a GRPC API to manage containers on the local system. Containerd leverages runC to [...] provide advanced functionality.

k8s | docker | oci | runC | linux

CRI: container runtime interface
  primitivas par manejar pods de containers
  había dos variantes: docker o rkt

Conmon is a utility within CRI-O that is used to monitor the containers, handle logging from the container process, serve attach clients and detects Out Of Memory (OOM) situations

k8s | cri | rkt                                      | linux
          | cri-containerd | containerd | oci | runC | linux
     docker-cli            |

Se inventa CRI-O (docker sigue siendo posible). Podman para administrar
k8s | cri | crio | oci | runC | linux


Ahora se empieza la gente a preocupar por el aislamiento, que quieren correr los containers en VMs para aislar más del host.
Distintas formas de ejecutar (a parte del runC de docker)
k8s | CRI | frakti |       Kata containers | QEMU        | KVM | kernel
          | CRI-O  | OCI | Kata containers | QEMU        | KVM | kernel
                                           | Firecracker | KVM | linux
                         | gVisor |                            | linux


Resumiendo por tipo de tecnología:
  CLI tools:
    docker (habla con containerd)
    podman (habla con la interfaz OCI)

  CRI runtimes:
    Frakti (no respeta OCI)
    CRI-O
    cri-containerd (que corre encima de containerd)

  OCI runtimes:
    Kata containers (corre sobre QEMU/LEMU/Firecracker)
    gVisor (sobre el kernel)
    runC (sobre el kernel)

  VMMs (virtual machines managers):
    QEMU
    LEMU (creo que es así, light QEMU)
    Firecracker (creado por Amazon para su casústica específica de correr lambdas)


También tendríamos LXE (adaptación de LXC para usarlo en k8s)
