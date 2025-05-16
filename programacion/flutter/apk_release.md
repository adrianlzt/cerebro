Tenemos que generar el .apk y firmarlo para poder instalarlo.

```bash
flutter build apk --release
/opt/android-sdk/build-tools/30.0.2/apksigner sign -verbose -ks keystore.jks --out build/app/outputs/flutter-apk/app-release-signed.apk build/app/outputs/flutter-apk/app-release.apk
```

Parece que lo del align no es necesario ya.
