curl ifconfig.co

Testear si tenemos un puerto abierto:
curl ifconfig.co/port/80

nc ipv4.cat 22
ftp ipv4.cat
curl --http0.9 ipv4.cat

http://ifcfg.co
http://ip-addr.es/
http://eth0.me/


# IPv6
https://jsonip.com/

curl -s6 https://jsonip.com | jq -r '.ip'
