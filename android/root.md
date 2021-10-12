mirar termux.md
mirar adb.md

# Escribir en /system
adb root
adb remount


# /etc/
Está en /system/etc

# administrador
am


# arranque
todo comienza en /init.rc

# servicio
https://devarea.com/aosp-adding-a-native-daemon/?sfw=pass1630521073
https://android.stackexchange.com/questions/213353/how-to-run-an-executable-on-boot-and-keep-it-running

selinux en selinux/plat_property_contexts

644 permisos
/system/etc/init/adrian.rc

Ejemplo
$ cat /system/etc/init/kontroller.rc
on post-fs-data
    start kontroller

service kontroller /system/xbin/kontroller
    user root
    group root
    seclabel u:r:su:s0



Mas scripts de arranque:
/system/etc/init/ is for core system items such as SurfaceFlinger, MediaService, and logd.
/vendor/etc/init/ is for SoC vendor items such as actions or daemons needed for core SoC functionality.
/odm/etc/init/ is for device manufacturer items such as actions or daemons needed for motion sensor or other peripheral functionality.

No se ponen comandos, se ponen llamadas determinadas, por ejemplo para ejecutar un comando es
    exec - root -- /system/bin/art_apex_boot_integrity


# Connectivity check

Hace llamadas cada media hora a
https://connectivitycheck.gstatic.com/generate_204
https://www.google.com/generate_204
http://www.google.com/gen_204

Depende de la versión (varia en la 7.11) usa unos endpoints u otros (uno es el principal  otro el de fallback)
https://github.com/aosp-mirror/platform_frameworks_base/commit/11ae28f387bc499ff82448d978dac9524b03f670

# boot procedure
Explicación detallada del arranque
https://android.googlesource.com/platform/system/core/+/master/init/README.md
https://programmer.ink/think/android-8.0-init-process-of-system-startup-process-3.html


# location
mirar tambien en termux.md
dumpsys location
info de bajo nivel relacionada con GNSS

https://developer.android.com/training/location/retrieve-current
