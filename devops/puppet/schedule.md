http://docs.puppetlabs.com/references/latest/metaparameter.html#schedule

schedule { 'daily':
  period => daily,
  range  => "2-4"
}

exec { "/usr/bin/apt-get update":
  schedule => 'daily'
}
