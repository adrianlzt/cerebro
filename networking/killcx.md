http://killcx.sourceforge.net/

Killcx works by creating a fake SYN packet with a bogus SeqNum, spoofing the remote client IP/port and sending it to the server. It will fork a child process that will capture the server response, extract the 2 magic values from the ACK packet and use them to send a spoofed RST packet. The connection will then be closed.
Note that the fake SYN packet is sent because even if the connection was somehow stuck (no incoming/outgoing packets), killcx would still be able to close it. 

Es perl, y necesita unas librerias un poco raras:
  - Net::RawIP
       http://search.cpan.org/search?query=Net::RawIP&mode=all
  - Net::Pcap
       http://search.cpan.org/search?query=Net::Pcap&mode=all
  - NetPacket::Ethernet
       http://search.cpan.org/search?query=NetPacket::Ethernet&mode=all
