https://medium.com/propeller-health-tech-blog/bluetooth-le-packet-capture-on-android-a2109439b2a1
Estas parecen las instrucciones buenas

O estas:
https://support.honeywellaidc.com/s/article/How-to-capture-Bluetooth-traffic-from-and-to-an-Android-Device

Activar el snoop de BT en las developer options
Apagar/enceder el BT
Hacer lo que queramos con BT
Apagar el BT
En Xiaomi/MUIU encontraremos el dump en
adb pull /sdcard/./MIUI/debug_log/common/com.android.bluetooth/btsnoop_hci.log

En otros móviles parece que lo dejan en /sdcard/

en otros parece que se saca con:
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
