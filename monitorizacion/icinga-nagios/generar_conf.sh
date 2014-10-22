#!/bin/bash
# ./generar_services cpu load

for s in $*; do
  cat <<END
define service {
        host_name                      controller
        service_description            $s
        check_command                  check_nrpe!$s
        use                            l2scom
}
END
done
