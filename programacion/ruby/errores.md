Installing atomic (1.1.14) 
Gem::Installer::ExtensionBuildError: ERROR: Failed to build gem native extension.

        /usr/bin/ruby1.9.1 extconf.rb 
/usr/lib/ruby/1.9.1/rubygems/custom_require.rb:36:in `require': cannot load such file -- mkmf (LoadError)
	from /usr/lib/ruby/1.9.1/rubygems/custom_require.rb:36:in `require'
	from extconf.rb:13:in `<main>'


Gem files will remain installed in /var/lib/gems/1.9.1/gems/atomic-1.1.14 for inspection.
Results logged to /var/lib/gems/1.9.1/gems/atomic-1.1.14/ext/gem_make.out

An error occurred while installing atomic (1.1.14), and Bundler cannot continue.
Make sure that `gem install atomic -v '1.1.14'` succeeds before bundling.


sudo apt-get install ruby1.9.1-dev



pg.rb:6: syntax error, unexpected ':', expecting ')'
conn = PG.connect(dbname: 'sales')
Esto es porque estamos usando la nueva forma de pasar parámetros con una versión de ruby < 1.9
Tenemos que cambiarlo a:  :dbname => 'sales'



OpenSSL::PKey::RSAError: BN lib
Existe /dev/urandom?
Ejecutar con strace:
prueba.rb
  require 'openssl'; OpenSSL::PKey::RSA.new(3)

strace ruby prueba.rb
