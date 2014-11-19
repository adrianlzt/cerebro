object Service "disk" {
  import "generic-service"

  host_name = "localhost"
  check_command = "disk"
  vars.sla = "24x7"
}


object Service "icinga_proc" {
  import "generic-service"
  check_command = "nrpe"
  vars.nrpe_command = "icinga_proc"
  host_name = "controller"
}


# NRPE
apply Service "nrpe-load" {
  import "generic-service"
  check_command = "nrpe"
  vars.nrpe_command = "check_load"
  assign where match("nrpe-*", host.name)
}

# Aplica el service si se cumple alguno de los assign
apply Service "mysql_port" {
  import "generic-service"
  check_command = "nrpe"
  vars.nrpe_command = "mysql_port"
  assign where host.vars.mysql-ndb-master
  assign where host.vars.mysql-ndb-data
  assign where host.vars.mysql-ndb-mgmt
}

