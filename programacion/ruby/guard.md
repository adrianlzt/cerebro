gem install guard guard-shell --no-ri --no-rdoc
Then create a Guardfile in the roles top directory, with the following content:

# -- -*- mode: ruby; -*-
guard :shell do
  watch(%r{^(?!tests).*/.*\.yml$}) do |m|
    puts "#{m[0]} changed - running tests"
    system('vagrant ssh -c "specs -p"')
  end
end


This file will ask guard to execute vagrant ssh -c "specs -p" everytime it detects a change in a file ending with .yml in the project’s subdirectories. Note that we excluded the tests directory since it contains somewhere a test.yml
