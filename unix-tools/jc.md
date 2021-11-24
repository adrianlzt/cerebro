jc JSONifies the output of many CLI tools and file-types for easier parsing in scripts

AUR jc

Módulos disponibles:
https://kellyjonbrazil.github.io/jc/#parsers


dig example.com | jc --dig


➜ ps -ef | jc --ps | jq | head
[
  {
    "uid": "root",
    "pid": 1,
    "ppid": 0,
    "c": 0,
    "stime": "nov19",
    "tty": null,
    "time": "00:00:18",
    "cmd": "/sbin/init"
