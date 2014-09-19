https://docs.puppetlabs.com/references/latest/type.html#cron

cron { logrotate:
  command => "/usr/sbin/logrotate",
  user    => root,
  minute  => '*/10'
}

logrotate cada 10 minutos
