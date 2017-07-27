https://www.csoft.net/docs/svn.html.en
http://unix.stackexchange.com/questions/27143/how-to-configure-svn-ssh-with-ssh-on-non-standard-port

svn co svn+ssh://user@ssh.yourdomain.com/path


Para usar una conf de ssh lo mejor es definirla en .ssh/config


Para especificar puerto:
svn --config-option="config:tunnels:ssh=ssh -p 20010" co svn+ssh://usuario@20.10.28.21/data/svn/repo/api/trunk src/api .

