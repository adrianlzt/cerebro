http://blog.elhacker.net/2016/10/herramientas-de-analisis-de-malware-automatizado-apk-en-Android.html



https://www.youtube.com/watch?v=vM-pinH5R7A

Sampling -> simpleperf
Low overhead. No coge funciones short-lived

Tracing -> systrace, strace
Instrumetanción manual, High overhead

# Tracing
import android.os.Trace
...

# Systrace
https://developer.android.com/studio/profile/systrace-commandline.html
Python que corremos en nuestro ordenador para analizar un móvil conectado por usb
