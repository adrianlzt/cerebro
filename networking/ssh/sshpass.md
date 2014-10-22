http://sourceforge.net/projects/sshpass/

sshpass -f password.txt ssh-copy-id user@yourserver


for i in host host2 host3 maquina3; do
sshpass -f password.txt ssh-copy-id user@$i
done
