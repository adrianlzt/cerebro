http://manpages.ubuntu.com/manpages/xenial/man8/iptables-extensions.8.html
  busar por "icase"
https://stackoverflow.com/questions/825481/iptable-rule-to-drop-packet-with-a-specific-substring-in-payload

No usar para temas de seguridad, ya que sería facilemente bypaseable.


Ejemplos:


iptables -A INPUT -p tcp --dport 80 -m string --algo bm --string 'GET /index.html' -j LOG
iptables -t filter -I OUTPUT 1 -o eth0 -p udp -m udp --dport 53 -m string --algo bm --icase --string "google" -j LOG --log-level info --log-prefix "iptables-string-match: "iptables -
