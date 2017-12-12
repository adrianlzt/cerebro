adb shell top  -s rss -n 1 | awk '{print $9;}' | grep "[0-9]" | grep -v "0K" | tr -d 'K' | awk '{SUM += $1} END { print SUM/1024/1024 }'
  gigas de memoria RSS utilizados


adb shell top -m 10 -s rss -n 1
  top 10 procesos que más RSS consumen


adb shell free -h
  memoria y swap en Gigas


adb shell cat /proc/meminfo
  parece que no cuadra mucho lo que me dice free con lo que dice el meminfo
