http://serverspec.org/

With serverspec, you can write RSpec tests for checking your servers are configured correctly.

Serverspec tests your servers' actual state through SSH access, so you don't need to install any agent softwares on your servers and can use any configuration management tools, Puppet, Chef, CFEngine and so on.

gem install serverspec
serverspec-init
...
require 'spec_helper'
describe package('httpd') do
  it { should be_installed }
end
describe file('/etc/httpd/conf/httpd.conf') do
  it { should be_file }
  it { should contain "ServerName www.example.jp" }
end
...
rake spec


