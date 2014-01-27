# http://superuser.com/questions/222912/how-can-i-log-all-process-launches-in-linux

apt-get install auditd
auditctl -a task,always
ausearch -i -sc execve
