Nos sirve como un medio para agrupar services.

define servicegroup {
        servicegroup_name               public-pepe
        alias                           Checks for pepe via public
        register                        1
}


define service {
        host_name                       xxxx
        ....
        servicegroups                   public-pepe
}
