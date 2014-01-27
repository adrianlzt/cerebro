http://librarian-puppet.com/

Versión de maestrodev con mejoras que no mergean a la versión oficial: 
https://github.com/maestrodev/librarian-puppet

Librarian-puppet is a bundler for your puppet infrastructure. You can use librarian-puppet to manage the puppet modules your infrastructure depends on. It is based on Librarian, a framework for writing bundlers, which are tools that resolve, fetch, install, and isolate a project's dependencies.

Librarian-puppet manages your modules/ directory for you based on your Puppetfile. Your Puppetfile becomes the authoritative source for what modules you require and at what version, tag or branch.

Once using Librarian-puppet you should not modify the contents of your modules directory. The individual modules' repos should be updated, tagged with a new release and the version bumped in your Puppetfile.

Podemos instalar módulos definiendo un Puppetfile.

Instalacion:
$ gem install librarian-puppet

Prepare your puppet infrastructure repository:
$ cd ~/path/to/puppet-inf-repos
$ (git) rm -rf modules
$ librarian-puppet init

$ vi Puppetfile
forge 'forge.puppetlabs.com'
mod "maestrodev/maven", "1.0.0"
mod "maven",
  :git => "https://github.com/maestrodev/puppet-maven.git",
  :ref => 'v1.0.0'

$ librarian-puppet install [--clean] [--verbose]
This command looks at each mod declaration and fetches the module from the source specified. This command writes the complete resolution into Puppetfile.lock and then copies all of the fetched modules into your modules/ directory, overwriting whatever was there before.
Instala los modulos en ./modules/

Get an overview of your Puppetfile.lock with:

$ librarian-puppet show
Inspect the details of specific resolved dependencies with:

$ librarian-puppet show NAME1 [NAME2, ...]
Find out which dependencies are outdated and may be updated:

$ librarian-puppet outdated [--verbose]
Update the version of a dependency:

$ librarian-puppet update apt [--verbose]
$ git diff Puppetfile.lock
$ git add Puppetfile.lock
$ git commit -m "bumped the version of apt up to 0.0.4."


http://blog.csanchez.org/2013/01/24/managing-puppet-modules-with-librarian-puppet/
Puppetfile:
# This is currently a noop but will be supported in the future.
forge 'forge.puppetlabs.com'

# Modulo de puppet forge
mod "maestrodev/maven", "1.0.0"

# Modulo de git
mod "maven",
  :git => "https://github.com/maestrodev/puppet-maven.git",
  :ref => 'v1.0.0'  # Si no definimos ref, cogerá el master
  # :ref => 'feature/master/dans_refactor' #

mod "maven",
  :git => "https://github.com/maestrodev/puppet-maven.git",
  :ref => 'feature/master/dans_refactor' # Si queremos usar una rama del git

# If we use a :ref =>, we can use anything that Git will recognize as a ref. This includes any branch name, tag name, SHA, or SHA unique prefix

# Tambien se puede definir un path
mod 'mymodule', 
  :path => './private/mymodule'
