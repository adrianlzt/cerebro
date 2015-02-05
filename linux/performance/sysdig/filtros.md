fd.type=ipv4
fd.type=file

fd.type=ipv4 and proc.name=cur

fd.type=ipv4 and \( proc.name=curl or proc.name=nc \)

fd.cip=127.0.0.1

evt.type=accept and proc.name!=httpd

evt.type=open and fd.name contains /etc

evt.type=chdir

env.type=execve
  comandos ejecutados

fd.port=8000 or fd.port=3128


