https://github.com/golang/go/wiki/Mobile#building-and-deploying-to-android

go get -d golang.org/x/mobile/example/basic
yay gomobile
sudo sdkmanager 'ndk-bundle'
  hace falta tener el android SDK
gomobile build -target=android golang.org/x/mobile/example/basic
gomobile install golang.org/x/mobile/example/basic
  este último instala el APK en el movil conectado por ADB


# Android-go
https://github.com/xlab/android-go
Otra opción que parece más sencilla.
