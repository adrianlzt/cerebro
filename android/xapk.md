Formato no oficial

Un archivo .XAPK en realidad es simplemente un archivo .APK más los datos OBB adicionales

El fichero .xapk es en realidad un .zip

adb -s emulator-5554 push com.bar.foo /sdcard/Android/obb/
Me falla al copiar los .obb, pero ha creado el dir.

Copio los .obb al dir creado:
adb -s emulator-5554 push com.bar.foo/\* /sdcard/Android/obb/com.bar.foo/

Luego instalar el .apk
adb -s emulator-5554 install com.bar.foo.apk

# xapk con split apks

Si al hacer el unzp tenemos múltiples .apk, instalar con:

```bash
adb install-multiple com.foo.bar.apk config.arm64_v8a.apk
```
