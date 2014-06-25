watch -n 1 "pgrep -P $(pgrep -d , puppet) | xargs -I {} -n1 cat -v /proc/{}/cmdline | tr -d '^' | tr '@' ' '"
