Por defecto la copia usará el contexto del directorio donde vaya.

Si queremos mantener el labeling del fichero original:
cp --preserve=context file1 file2

Para definir el contexto del fichero que se generará:
cp -Z system_u:object_r:samba_share_t:s0 file1 file2


Usar cp mejor que mv para tener controlados los contextos de selinux.
mv no modifica el contexto.
