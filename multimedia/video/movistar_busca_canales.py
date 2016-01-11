import socket
import struct
import datetime



now = datetime.datetime.now()
f = open('channels_' + str(now.strftime("%Y-%m-%d__%H_%M_%S")) + ".m3u",'a')
f.write("#EXTM3U\n")


for i in range(0,254):
	for e in range(0,254):
		MCAST_GRP = '239.0.' + str(i) + '.' + str(e)
		MCAST_PORT = 8208
		
		try:
			sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM, socket.IPPROTO_UDP)
			sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
			sock.settimeout(1)
			sock.bind(('', MCAST_PORT))
			mreq = struct.pack("4sl", socket.inet_aton(MCAST_GRP), socket.INADDR_ANY)

			sock.setsockopt(socket.IPPROTO_IP, socket.IP_ADD_MEMBERSHIP, mreq)
		
			print ("checking " + MCAST_GRP + ":" + str(MCAST_PORT) + "...")
			
			if sock.recv(128):
				f.write("#EXTINF:0,rtp://" + MCAST_GRP + ":" + str(MCAST_PORT) + '\n')
				f.write("rtp://@" + MCAST_GRP + ":" + str(MCAST_PORT) + '\n')
		except:
			pass
f.close