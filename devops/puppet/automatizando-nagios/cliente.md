hostname cliente
echo "cliente" > /etc/hostname

/etc/hosts
10.0.3.251  puppet


/etc/puppet/puppet.conf:
[main]  
server=puppet


rm -f /var/lib/puppet/ssl
puppet agent -t

