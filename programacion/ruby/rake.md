http://rake.rubyforge.org/

This package contains Rake, a simple ruby build program with capabilities similar to make.

task :default => [:test]

task :test do
  ruby "test/unittest.rb"
end
