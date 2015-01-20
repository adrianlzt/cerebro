http://docs.icinga.org/icinga2/latest/doc/module/icinga2/chapter/migration#manual-config-migration-hints-host-parents

object Host "vmware-master" {
  import "linux-server-template"
  groups += [ "vmware" ]
  address = "192.168.1.10"
  vars.is_vmware_master = true
}

object Host "vmware-vm1" {
  import "linux-server-template"
  groups += [ "vmware" ]
  address = "192.168.27.1"
}

object Host "vmware-vm2" {
  import "linux-server-template"
  groups += [ "vmware" ]
  address = "192.168.28.1"
}

apply Dependency "vmware-master" to Host {
  parent_host_name = "vmware-master"

  assign where "vmware" in host.groups
  ignore where host.vars.is_vmware_master
  ignore where host.name == "vmware-master"
}
