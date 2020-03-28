http://askubuntu.com/questions/303120/how-folders-created-in-var-run-on-each-reboot

/var/run puede ser tmpfs, entonces se borrará en cada reinicio.
cuidado al crear directorios ahí, tendremos que hacerlo cada vez que hagamos un start()


# /run
http://www.h-online.com/open/news/item/Linux-distributions-to-include-run-directory-1219006.html
https://refspecs.linuxfoundation.org/FHS_3.0/fhs-3.0.pdf

Ficheros temporales y de ejecución.
Antes se usaba /var/run, pero como eso puede ser una partición había problemas con procesos que necesitaban escribir pronto (como systemd, udev, etc)

Lo monta systemd (y no se si antes tambien initramfs)
https://github.com/systemd/systemd/blob/6252bd0e8442fdd5d3168ee227b98560df7ce8ce/src/core/mount-setup.c#L85
typedef struct MountPoint {
        const char *what;
        const char *where;
        const char *type;
        const char *options;
        unsigned long flags;
        bool (*condition_fn)(void);
        MountMode mode;
} MountPoint;

{ "tmpfs", "/run", "tmpfs", "mode=755", MS_NOSUID|MS_NODEV|MS_STRICTATIME, NULL, MNT_FATAL|MNT_IN_CONTAINER },

Al hacer el mount no se definen opciones extras (solo la "mode=755"):
https://github.com/systemd/systemd/blob/6252bd0e8442fdd5d3168ee227b98560df7ce8ce/src/core/mount-setup.c#L184

Por lo tanto, queda de mano de la syscall mount decidir el tamaño del tmpfs.
