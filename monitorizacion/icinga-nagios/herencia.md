http://docs.icinga.org/latest/en/objectinheritance.html


Si queremos usar los valores heredados del template más otros custom:

define host{
        host_name               linuxserver1
        hostgroups              +linux-servers,web-servers
                
        use                     generichosthosttemplate
        }

De esta manera el host linuxserver1 tendrá los hostgroups linux-servers,web-servers más los que vengan definidos en el template generichosthosttemplate
