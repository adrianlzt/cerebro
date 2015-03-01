http://unix.stackexchange.com/questions/12985/how-to-check-rx-ring-max-backlog-and-max-syn-backlog-size

http://enterprisesystemsmedia.com/article/the-10-commandments-of-tcp-ip-performance#sr=g&m=o&cp=or&ct=-tmc&st=(opu%20qspwjefe)&ts=1424440891

Backlog dropped
cat /proc/net/netstat | grep TcpExt | cut -d ' ' -f 75
