Nos sirve como un medio para agrupar services.

define servicegroup {
        servicegroup_name               public-pepe
        alias                           Checks for pepe via public
}


define service {
        host_name                       xxxx
        service_description             yyyy
        ....
        servicegroups                   public-pepe
}

Tambien se puede asociar desde el servicegroup
define servicegroup {
        servicegroup_name               public-pepe
        alias                           Checks for pepe via public
        members                         xxxx,yyyy,host2,service2
}

