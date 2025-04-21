https://pico.sh/pipe

```bash
tail -f -n 0 /tmp/foo.log | ssh pipe.pico.sh pub foo.log
ssh pipe.pico.sh sub foo.log | grep --line-buffered "ERROR" | xargs -I{} -L1 osascript -e 'display notification "{}" with title "Pipe Notification"'
```
