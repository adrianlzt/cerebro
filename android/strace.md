http://stackoverflow.com/questions/12166917/android-how-to-strace-an-app-using-adb-shell-am-start

set `ps | grep zygote` ; strace -p $2 -f -tt -T -s 500 -o /sdcard/strace.txt

Luego en /sdcard/strace.txt filtrar por el PID de la app que queremos observar
