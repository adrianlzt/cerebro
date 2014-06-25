DHCP.io allows you to control the DNS entry belonging to a name beneath the .dhcp.io domain (both IPv4 and IPv6).

This will allow you to configure a name such as gateway.dhcp.io to point to the IP of your home gateway.

To set the value of your hostname to please run:
            $ curl http://dhcp.io/set/xxxxxx-xxxxx-xxxxx-xxxxxx
          
If you wish to set the value to a specific IP please run:
            $ curl http://dhcp.io/set/xxxxx-xxxxxx-xxxxxx-xxxxx/1.2.3.4
       
