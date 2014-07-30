source = "#{ROOT_DIR}/$project/App.config"


https://github.com/puppetlabs/puppetlabs-concat
concat { '/tmp/file':
  ensure => present,
}

concat::fragment { 'tmpfile':
  target  => '/tmp/file'
  content => 'test contents',
  order   => '01'
}
