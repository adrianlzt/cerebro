adb shell top -s rss -n 1 | awk '{print $9;}' | grep "[0-9]" | grep -v "0K" | tr -d 'K' | awk '{SUM += $1} END { print SUM }'
