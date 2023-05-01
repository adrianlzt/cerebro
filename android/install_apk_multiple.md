Podemos usar esta app: https://github.com/Aefyr/SAI
Descontinuada pero sigue funcionando (al menos con apks firmados oficialmente)


# A mano
https://raccoon.onyxbits.de/blog/install-split-apk-adb/
Adaptado con: https://stackoverflow.com/a/50544005/1407722

pm install-create -S $(du -bc *apk | grep total | awk '{print $1;}')
apuntar el id del commit install
cat base.apk | pm install-write -S SIZE COMMIT 0
pm install-commit 603065614

He conseguido que me funcione con signed oficial y autosigned
