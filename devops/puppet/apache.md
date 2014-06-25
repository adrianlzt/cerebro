https://github.com/puppetlabs/puppetlabs-apache


class { 'apache': }

apache::vhost { $virtualhost:
  docroot => "$document_root/public",
  port => $port,
  directories => [
    { 
      path => "$document_root/public",
      allow => "from all",
      options => ["-MultiViews"],
    },
  ],
  custom_fragment => template("${module_name}/apache_rails_prod.erb"),
}

::apache::mod { 'authn_core': } 
apache::listen { '80': }
