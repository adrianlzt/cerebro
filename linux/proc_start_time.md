Con el PID:
date -d @$(cat /proc/PID/stat | awk "{printf \"%.0f\", $(grep btime /proc/stat | cut -d ' ' -f 2)+\$22/$(getconf CLK_TCK);}").

Con pgrep:
date -d @$(cat /proc/$(pgrep -f telegraf.conf)/stat | awk "{printf \"%.0f\", $(grep btime /proc/stat | cut -d ' ' -f 2)+\$22/$(getconf CLK_TCK);}").
