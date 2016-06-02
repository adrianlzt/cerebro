# OnionIRC

http://m.xataka.com/otros/asi-es-onionirc-la-escuela-de-hackers-de-anonymous

Logs:
https://bitbucket.org/OnionIRC/onionirc/src/94fd72f1982145468fc91559ebe60957e42f22cb/OnionIRC_Logs/?at=master
https://bitbucket.org/OnionIRC/onionirc/src/94fd72f1982145468fc91559ebe60957e42f22cb/Old_BHA/school/?at=master

Server IRC:
onionirchubx5363.onion (sin ssl)
onionirchubx5363.onion:6697 (sasl, ssl)

## weechat (sin ssl)
/proxy add tor socks5 127.0.0.1 9050
/server add onionirc onionirchubx5363.onion
/set irc.server.onionirc.proxy "tor"
/connect onionirc



# Freenode
http://freenode.net/news/connecting-to-freenode-using-tor-sasl
