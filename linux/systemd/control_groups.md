https://www.certdepot.net/rhel7-get-started-cgroups/
https://www.certdepot.net/whats-new-rhel-7-cgroups/
Para más info mirar cgroups.md

Cada proceso en un grupo, junto con sus hijos

Jerarquía:
 - system.slice: cuelgan los services del sistema
   - sshd.service: un cgroup por proceso, todos los hijos colgando
 - user.slice: un slice por cada user
   - user-1000.slice: ejemplo user UID 1000
 - machine.slice: vms y containers


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


# Crear un grupo cpuset
mkdir /sys/fs/cgroup/cpuset/my_cpuset
cd /sys/fs/cgroup/cpuset/my_cpuset

echo 0 > cpuset.cpus
  este cgroup solo puede usar la cpu 0
  Obligatorio definirlo
echo 0 > cpuset.mems
  este cgroup solo puede usar el nodo de memoria 0
  Obligatorio definirlo

echo $$ > tasks
  meto el PID de mi shell en el cgroup. Todo lo que cree con esta shell heredará las restricciones de este cgroup

echo $$ > /sys/fs/cgroup/cpuset/tasks
  para sacarlo del grupo my_cpuset y meterlo en el general
