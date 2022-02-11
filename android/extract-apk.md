adb shell pm list packages
  obtener el id

adb shell pm path com.example.someapp
  nos da el path

bajar el path
  adb pull /data/app/com.example.someapp-2.apk


apktool d file.apk

O peor forma:
unzip file.apk


Si es apk native, en assets/index.android.bundle tendremos el código JS minified/uglified

Podemos usar esta app para separarlo en ficheros y mostrar el código un poco mejor: https://github.com/richardfuca/react-native-decompiler
git clone https://github.com/richardfuca/react-native-decompiler.git
cd react-native-decompiler
npm start -- -i index.android.bundle -o ./output
