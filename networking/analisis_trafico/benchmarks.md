qperf <REMOTE_HOST> tcp_bw udp_bw

iperf

netperf
 -l 30            # duracion
 -T1,2            # cpu pinning en cliente y/o servidor
 -t TCP_SENDFILE  # test a realizar

