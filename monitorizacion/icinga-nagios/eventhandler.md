http://docs.icinga.org/latest/en/eventhandlers.html

Event handlers are optional system commands (scripts or executables) that are run whenever a host or service state change occurs. They are executed on the system where the check is scheduled (initiated).


 define command{
        command_name    restart-httpd
        command_line    /usr/local/icinga/libexec/eventhandlers/restart-httpd  $SERVICESTATE$ $SERVICESTATETYPE$ $SERVICEATTEMPT$
        }

 define service{
        host_name               somehost
        service_description     HTTP
        max_check_attempts      4
        event_handler           restart-httpd
        ...
        }

# Global
http://docs.icinga.org/latest/en/eventhandlers.html

Global host and service event handlers are run for every host or service state change that occurs, immediately prior to any host- or service-specific event handler that may be run
