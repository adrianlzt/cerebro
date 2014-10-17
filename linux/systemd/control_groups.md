Los procesos del system.slice y user.slice tienen el mismo tiempo en el scheduler.

systemd-cgls
Mostrar los procesos en forma de arbol según su control group

systemd-cgtop
Muestra el consumo de cada proceso (tasks, cpu, memoria, inputs/s, outputs/s).

Activar accounting:
systemctl set-property httpd CPUAccounting=yes
systemctl set-property httpd MemoryAccounting=yes
systemctl set-property httpd BlockIOAccounting=yes
  Al activar el accounting en cualquier service se activa para todos

Mostrar la prioridad:
systemctl show -p CPUShares user.slice
systemctl show -p CPUShares system.slice

Modificar la prioridad:
systemctl set-property --runtime user.slice CPUShares=1500
