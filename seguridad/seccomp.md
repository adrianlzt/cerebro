mirar linux/syscall.md



Políticas de seguridad en linux

Podemos aplicarlas sobre docker, podman, etc

https://github.com/google/nsjail
Proyecto que nos permite crear jails ligeras con políticas de seccomp



# Kafel
https://github.com/google/kafel
A language and library for specifying syscall filtering policies

Podemos obtener los números para filtrar con "strace -X raw ..."

#define SIOCADDRT 0x0000890B
#define TUNSETIFF 0x400454ca

POLICY rutas {
  ERRNO(0) {
    ioctl (fildes, request) {
      request == SIOCADDRT
    }
  }
}
USE rutas DEFAULT ALLOW

Ejemplo que deja pasar todo menos ioctl(*, SIOCADDRT, *), que lo rechaza con un error=0 (como si lo hubiese ejecutado, pero no lo hace)

