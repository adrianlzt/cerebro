https://github.com/kovetskiy/zabbixctl

Cli en Go para interactuar con un server zabbix

go get github.com/kovetskiy/zabbixctl
vi ~/.config/zabbixctl.conf
[server]
  address  = "zabbix-web.local"
  username = "Admin"
  password = "password"

[session]
  path = "~/.cache/zabbixctl.session"
