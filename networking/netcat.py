# http://4thmouse.com/index.php/2008/02/22/netcat-clone-in-three-languages-part-ii-python/

#!/usr/bin/python
from optparse import OptionParser
import sys
import socket
import select

class NetTool:
        def run(self):
                self.parse_options()
                self.connect_socket()
                self.forward_data()

        def parse_options(self):
                parser = OptionParser(usage="usage: %prog [options]")

                parser.add_option("-c", "--connect", 
                        action="store_true", 
                        dest="connect", 
                        help="Connect to a remote host")

                parser.add_option("-l", "--listen", 
                        action="store_false", 
                        dest="connect", 
                        help="Listen for a remote host to connect to self host")

                parser.add_option("-r", 
                        "--remote-host", 
                        action="store", 
                        type="string", 
                        dest="hostname", 
                        help="Specify the host to connect to")

                parser.add_option("-p", 
                        "--port", 
                        action="store", 
                        type="int", 
                        dest="port",
                        help="Specify the TCP port")

                parser.set_defaults(connect=None, hostname=None)
                (options, args) = parser.parse_args();

                if (options.connect == None):
                        sys.stdout.write("no connection type specified\n")
                        parser.print_help()
                        sys.exit()

                if(options.port == None):
                        sys.stdout.write("no port specified\n")
                        parser.print_help()
                        sys.exit()

                if(options.connect and (options.hostname == None)):
                        sys.stdout.write("connect type requires a hostname\n")
                        parser.print_help()
                        sys.exit()

                self.connect = options.connect
                self.hostname = options.hostname
                self.port = options.port

        def connect_socket(self):
                if(self.connect):
                        self.socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
                        self.socket.connect( (self.hostname, self.port) )
                else:
                        server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
                        server.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR,  1)
                        try:
                                server.setsockopt(socket.SOL_SOCKET, socket.TCP_NODELAY, 1)
                        except socket.error:
                                sys.stderr.write("Warning: unable to set TCP_NODELAY...")
                        server.bind(('localhost', self.port))
                        server.listen(1)
                        self.socket, address = server.accept()

        def forward_data(self):
                self.socket.setblocking(0)
                while(1):
                        read_ready, write_ready, in_error = select.select([self.socket, sys.stdin], [], [self.socket, sys.stdin])
                        try:
                                buffer = self.socket.recv(100)
                                while( buffer  != ''):
                                        sys.stdout.write(buffer)
                                        sys.stdout.flush()
                                        buffer = self.socket.recv(100)
                                if(buffer == ''):
                                        return
                        except socket.error:
                                pass
                        while(1):
                                r, w, e = select.select([sys.stdin],[],[],0)
                                if(len(r) == 0):
                                        break;
                                c = sys.stdin.read(1)
                                if(c == ''):
                                        return;
                                if(self.socket.sendall(c) != None):
                                        return
tool = NetTool()

tool.run()
