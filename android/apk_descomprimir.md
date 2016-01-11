Primero una descompresión del APK, luego una extracción del código con dex2jar para sacar los ficheros .class y luego usando JAD y Show My Code a leer un poco el código de la app y para ver la magia.

https://code.google.com/p/dex2jar/
http://www.seguridadapple.com/2012/02/jad-un-decompilador-de-java-para-mac-os.html
http://www.elladodelmal.com/2013/04/decompilador-flash-java-net-y-qr-codes.html


Primero descomprimimos el .apk
jar xf com.anuntis.fotocasa.apk

# Dex2jar
yaourt -S dex2jar

dex2jar classes.dex


# ApkTool
https://code.google.com/p/android-apktool/
http://forum.xda-developers.com/showthread.php?t=1755243
It is a tool for reverse engineering 3rd party, closed, binary Android apps.

yaourt -S android-apktool

Decompile
apktool d name_of_apk.apk

Compile
apktool b folder_apk
  encontraremos el apk en folder_apk/dist/

Si falla puede ser porque falte algún framework:
https://code.google.com/p/android-apktool/wiki/FrameworkFiles


# Opcodes
Tras la decompilacion veremos las instrucciones como opcodes de dalvik:
http://pallergabor.uw.hu/androidblog/dalvik_opcodes.html
