#
# nodes.pp - defines all puppet nodes
#

# self-manage the puppet master server
node 'puppet' { }

##### CLIENTS

node 'client1' {
  class { 'motd': 
	var => 'GRILLO',
	path => '/tmp',
  }
}

node 'client2' { }
