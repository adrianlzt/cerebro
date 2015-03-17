http://docs.ansible.com/gem_module.html

# Installs version 1.0 of vagrant.
- gem: name=vagrant version=1.0 state=present user_install=no

# Installs latest available version of rake.
- gem: name=rake state=latest user_install=no

# Installs rake version 1.0 from a local gem on disk.
- gem: name=rake gem_source=/path/to/gems/rake-1.0.gem state=present user_install=no


user_install
Install gem in user's local gems cache or for all users

Instalar desde rvm:
  ¦ - name: Install compass and susy gems
  ¦ ¦ gem: name={{item}} state=present user_install=no
  ¦ ¦ ¦ ¦ ¦executable=/usr/local/rvm/rubies/default/bin/gem
  ¦ ¦ with_items:
  ¦ ¦ ¦- ffi
  ¦ ¦ environment:
        PATH: "/usr/local/rvm/rubies/default/bin:/sbin:/bin:/usr/sbin:/usr/bin"


