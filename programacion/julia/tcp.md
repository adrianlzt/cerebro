Servidor:
@async begin
  server = listen(2001)
  while true
    sock = accept(server)
    @async while true
      write(sock,readline(sock))
    end
  end
end

Cliente:
sock = connect(2001)
@async while true
  write(STDOUT,readline(sock))
end
println(sock,"hola")


Si queremos enviar caracteres hexadecimales:
write(STDOUT,0x61)
data = Uint8['A','M','Q','P',0x00,0x00,0x09,0x01];
write(sock,data)
