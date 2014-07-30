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

# Configuracion basica
apache::vhost { "basica":
  docroot => "/var/www/html",
  vhost_name => "*",
  port => 80,
  default_vhost => true,
}

Crea:
<VirtualHost *:80>
  ServerName basico 
  DocumentRoot "/var/www/html"
  <Directory "/var/www/html">
    Options Indexes FollowSymLinks MultiViews
    AllowOverride None
    Require all granted
  </Directory>
  ErrorLog "/var/log/apache2/basico.log"
  ServerSignature Off
  CustomLog "/var/log/apache2/basico_access.log" combined
</VirtualHost>
