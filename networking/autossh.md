http://blogs.perl.org/users/smylers/2011/08/ssh-productivity-tips.html

Restarting Connections

Sometimes your connection will completely end, for example if you suspend your computer overnight or take it somewhere there isn’t internet access. When you have connectivity again the connection needs to be restarted. AutoSSH can spot when connections have failed, and automatically restart them; it doesn’t do this if a connection has been closed by user request. The AutoSSH works as a drop-in replacement for ssh.
