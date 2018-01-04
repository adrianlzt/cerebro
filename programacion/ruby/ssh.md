https://github.com/net-ssh/net-ssh

require 'net/ssh'


Net::SSH.start('10.1.9.2', 'usuario', :password => "contraseña", :verbose => :debug) do |ssh|
  output = ssh.exec!("hostname")
  puts output
end


# Dump hex paquetes
Si queremos ver el contenido de los paquetes que se envian antes de entrar al transport
/home/adrian/.gem/ruby/2.4.0/gems/net-ssh-4.2.0/lib/net/ssh/transport/packet_stream.rb

debug { "received packet nr #{server.sequence_number} type #{payload.getbyte(0)} len #{@packet_length}" }
debug { "payload #{payload}" }
line = payload.bytes.map { |b| sprintf(" %02X",b) }.join
debug { "bytes #{line}" }


debug { "queueing packet nr #{client.sequence_number} type #{payload.getbyte(0)} len #{packet_length}" }
debug { "payload #{payload}" }
line = payload.bytes.map { |b| sprintf(" %02X",b) }.join
debug { "bytes #{line}" }
