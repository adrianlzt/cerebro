# Systemd

Para que systemd pueda arrancar nuestra aplicación necesitamos meter esta macro:

```
init_daemon_domain(testprog_t, testprog_exec_t)
```

Nuestra aplicación correrá con el contexto:

```
system_u:system_r:testprog_t:s0
```

# Terminal / consola

```
require {
        type console_device_t;
        type user_devpts_t;
        class unix_dgram_socket { create connect sendto };
        class chr_file { append read write open getattr ioctl };
        class capability sys_tty_config;
}

allow testcat_t console_device_t:chr_file { open write getattr ioctl };
allow testcat_t self:capability sys_tty_config;
allow testcat_t user_devpts_t:chr_file { append read write getattr };
```
