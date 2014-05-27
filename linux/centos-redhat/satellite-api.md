Ejemplo en ruby:
require "xmlrpc/client"
require 'pp'

#server = XMLRPC::Client.new("satellite.com","/rpc/api",443,nil,nil,nil,nil,true)
server = XMLRPC::Client.new("satellite.com","/rpc/api")
begin
  # Login
  key = server.call("auth.login", "USER", "PASS")
  puts "login key = #{key}"

  # User roles
  roles = server.call("user.listRoles", key, "USER")
  puts "Roles de USER: "
  pp roles
rescue XMLRPC::FaultException => e
  puts "Error:"
  puts e.faultCode
  puts e.faultString
end


Info del usuario
server.call("user.getDetails",key,"USER")

Lista de grupos del usuario
server.call("systemgroup.listAllGroups", key)

Listar servidores activos:
server.call("system.listActiveSystems", key)

Listar servidores:
server.call("system.listSystems", key)
[{"name"=>"HOSTNAME", "last_checkin"=>#<XMLRPC::DateTime:0x7fbda3d698c8 @sec=14, @month=5, @min=19, @year=2014, @hour=13, @day=27>, "id"=>1000012042},{},...]

Buscar un servidor por su hostname:
server.call("system.search.hostname", key, "HOSTNAME")

Obtener info sobre la CPU de un server:
server.call("system.getCpu", key, 1000010192)

Busca un package (nos devolverá varios con distintas releases):
server.call("packages.search.advanced", key, "name:nrpe AND version:2.13")
server.call("packages.search.advanced", key, "name:nrpe AND version:2.13 AND release:1.el6")

Obtener versión de un paquete en un servidor:
server.call("system.listNewerInstalledPackages", key, 1000010188,"NOMRE-PAQUETE","0","0","")

Dado un paquete, me dice si el sistema tiene instalada una versión anterior:
server.call("system.listOlderInstalledPackages", key, 1000010130,"upstart","0.6.5","13.el6_5.3","")

Listar packages:
server.call("system.listPackages", key, 1000010130)

Listar paquetes que contienen por 'abc':
server.call("system.listPackages", key, 1000010188).select {|hg| hg["name"].include? "abc"}

Ejecutar script en una serie de servidores (meter mas en el array), se puede quitar el array si solo queremos ejecutar en un server:
server.call("system.scheduleScriptRun", key, [1000010188], "USER", "GRUPO", 5, "echo hola > /tmp/test.txt", DateTime.now)

Info sobre la tarea de ejecutar el script (el id lo devuelve la llamada a system.scheduleScriptRun):
server.call("system.getScriptActionDetails", key, 195582)

Obtener información sobre la ejecucción del check (el id lo devuelve la llamada a system.scheduleScriptRun):
server.call("system.getScriptResults", key, 195581)
