https://github.com/net-ssh/net-ssh

require 'net/ssh'

Net::SSH.start('10.0.9.2', 'user', :password => "mipass") do |ssh|
  ssh.logger.level = Logger::DEBUG
  output = ssh.exec!("hostname")
  puts output
end

