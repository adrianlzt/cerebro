https://medium.com/swlh/golang-on-android-root-e29ccf3da470
hacer un build de una app en go para android

GOOS=linux GOARCH=arm go build -o hello main.go
adb push hello /data/local/tmp/
adb shell "/data/local/tmp/hello"


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
Roto?
