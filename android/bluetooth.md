https://medium.com/propeller-health-tech-blog/bluetooth-le-packet-capture-on-android-a2109439b2a1
Estas parecen las instrucciones buenas

Activar el snoop de BT en las developer options
Apagar/enceder el BT
Hacer lo que queramos con BT
Ejecutar: adb bugreport nombrefichero.zip
  info: https://developer.android.com/studio/debug/bug-report
Genera nombrefichero.zip a nuestro pc

El fichero FS/data/misc/bluetooth/logs/btsnoop_hci.log es un fichero .pcap que podremos abrir con wireshark

Para obtener algo de info (pero no el .pcap)
adb shell dumpsys bluetooth_manager adb bugreport > BUG_REPORT.txt


Con logcat podemos ver algunas trazas.


# BLE
App para leer características y valores de dispositivos BLE
https://play.google.com/store/apps/details?id=no.nordicsemi.android.mcp&hl=en
	
nRF Connect for Mobile
