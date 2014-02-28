http://forge.puppetlabs.com/garethr/docker

  	require docker
  	docker::image { 'centos': }
  	docker::run { 'helloworld':
  	  image   => 'centos',
  	  command => '/bin/sh -c "for i in {0..30}; do echo hello world; sleep 1; done"',
  	  require => Docker::Image['centos'],
  	}
  	# Run above manifest, then execute these commands
  	$ docker ps #should see your command, grab container ID
  	$ docker attach _container-id_

