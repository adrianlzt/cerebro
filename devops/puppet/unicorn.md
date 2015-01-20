Podemos usar nginx+unicorn en vez del puppetmaster.


## Instalación con NginX
https://linuxmoz.com/rhel-centos-install-puppet-nginx-unicorn/

yum install make gcc ruby-devel
gem install unicorn rack
cp /usr/share/puppet/ext/rack/config.ru /etc/puppet/
vi /etc/puppet/unicorn.conf

worker_processes 6
working_directory "/etc/puppet"
listen '/var/run/puppet/puppetmaster_unicorn.sock', :backlog => 512
timeout 350
pid "/var/run/puppet/puppetmaster_unicorn.pid"

preload_app true
if GC.respond_to?(:copy_on_write_friendly=)
  GC.copy_on_write_friendly = true
end

before_fork do |server, worker|
  old_pid = "#{server.config[:pid]}.oldbin"
  if File.exists?(old_pid) && server.pid != old_pid
    begin
      Process.kill("QUIT", File.read(old_pid).to_i)
    rescue Errno::ENOENT, Errno::ESRCH
      # someone else did our job for us
    end
  end
end

if RACKUP[:daemonized]
  #stdout_path "/var/log/puppet/unicorn.log"
  #stderr_path "/var/log/puppet/unicorn_error.log"
end


Copiar el puppetunicorn.init a /etc/init.d/puppetunicorn
chmod a+x /etc/init.d/puppetunicorn
/etc/init.d/puppetunicorn start


Configurar nginx:
yum install nginx
cd /etc/nginx/conf.d/
mv default.conf default.conf.off
/etc/nginx/conf.d/puppetmaster.conf

upstream puppetmaster_unicorn {
  server unix:/var/run/puppet/puppetmaster_unicorn.sock fail_timeout=0;
}
    
server {
  listen 8140;

  client_max_body_size 20M; # In order to avoid Error - 413 Request Entity Too Large

  ssl on;
  ssl_session_timeout 5m;
  ssl_certificate /var/lib/puppet/ssl/certs/CAMBIAR.pem;
  ssl_certificate_key /var/lib/puppet/ssl/private_keys/CAMBIAR.pem; 
  ssl_client_certificate /var/lib/puppet/ssl/ca/ca_crt.pem; 
  ssl_ciphers SSLv2:-LOW:-EXPORT:RC4+RSA; 
  ssl_verify_client optional; # Important to keep it like this, otherwise it gives a Forbidden request: localhost(127.0.0.1)
    
  root /usr/share/empty;
    
  proxy_set_header Host $host;
  proxy_set_header X-Real-IP $remote_addr;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  proxy_set_header X-Client-Verify $ssl_client_verify; 
  proxy_set_header X-Client-DN $ssl_client_s_dn;
  proxy_set_header X-SSL-Issuer $ssl_client_i_dn;
  proxy_read_timeout 500;
    
  location / { 
    proxy_pass http://puppetmaster_unicorn;
    proxy_redirect off; 
  } 
}


/etc/init.d/nginx start



Para activar el debug en este entorno:
/etc/puppet/config.ru
ARGV << "--debug"


Cada instancia unicorn consume unos 500MB de RSS y unos 700MB de VSZ.

Para 14 workers:
El master 850MB de RSS y 1GB de VSZ.
Unos 10 workers tendrán unos 500MB de consumo RSS y 700MB VSZ.
Los otros 4 unos 30MB RSS y 600MB de VSZ.

/etc/puppet/unicorn.conf
worker_processes 14
