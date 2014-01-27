Para que el OS guest no se entere de que está dentro de una máquina virtual, editamos el .vmx y añadimos al final:

monitor_control.virtual_rdtsc = "false"
monitor_control.restrict_backdoor = "true"
isolation.tools.getPtrLocation.disable = "true"
isolation.tools.setPtrLocation.disable = "true"
isolation.tools.setVersion.disable = "true"
isolation.tools.getVersion.disable = "true"
monitor_control.disable_directexec = "true
