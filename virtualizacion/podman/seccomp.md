# Seccomp
Poner políticas de seguridad con seccomp

https://podman.io/blogs/2019/10/15/generate-seccomp-profiles.html

Política por defecto de docker: https://github.com/moby/moby/blob/master/profiles/seccomp/default.json
Lab sobre el uso de seccomp en docker: https://github.com/docker/labs/tree/master/security/seccomp

Formato:
https://github.com/docker/engine-api/blob/c15549e10366236b069e50ef26562fb24f5911d4/types/seccomp.go
https://github.com/opencontainers/runtime-spec/blob/master/specs-go/config.go#L357


Una ejecucción para generar un perfil de seccomp de lo que ha usado:
sudo podman run --rm -it --annotation io.containers.trace-syscall=of:/var/tmp/tmp.iryapUSY7x/ls.json archlinux ls /

El json que genera:
{
  "defaultAction": "SCMP_ACT_ERRNO",
  "syscalls": [
    {
      "names": [
        "access",
        "arch_prctl",
        "brk",
        "capget",
        "capset",
        "chdir",
        "close",
        "epoll_ctl",
        "epoll_pwait",
        "execve",
        "exit_group",
        "fchown",
        "fcntl",
        "fstat",
        "fstatfs",
        "futex",
        "getdents64",
        "getppid",
        "ioctl",
        "mmap",
        "mount",
        "mprotect",
        "munmap",
        "nanosleep",
        "newfstatat",
        "openat",
        "prctl",
        "pread64",
        "read",
        "rt_sigreturn",
        "seccomp",
        "setgid",
        "setgroups",
        "setuid",
        "stat",
        "write"
      ],
      "action": "SCMP_ACT_ALLOW",
      "args": [],
      "comment": "",
      "includes": {},
      "excludes": {}
    }
  ]
}


Ejecutar un pod con unas políticas (si ponemos --privileged ignora el filtrado de seccomp):
sudo podman run --security-opt seccomp=/tmp/ls.json fedora:30 ls -l / > /dev/null



Para meter args:
index is the index of the system call argument
op is the operation to perform on the argument. It can be one of:
SCMP_CMP_NE - not equal
SCMP_CMP_LT - less than
SCMP_CMP_LE - less than or equal to
SCMP_CMP_EQ - equal to
SCMP_CMP_GE - greater than
SCMP_CMP_GT - greater or equal to
SCMP_CMP_MASKED_EQ - masked equal: true if (value & arg == valueTwo)
value is a parameter for the operation (uint64), no vale hex
valueTwo is used only for SCMP_CMP_MASKED_EQ

Ejemplo:
"name": "accept",
"action": "SCMP_ACT_ALLOW",
"args": [
  {
    "index": 0,
    "op": "SCMP_CMP_MASKED_EQ",
    "value": 2080505856,
    "valueTwo": 0
  }

No podemos devolver errores distintos de 1 ni realizar modificaciones.


https://google.github.io/kafel/ es un lenguaje para definir reglas de seccomp usado por nsjail (buscar nsjail.md)

