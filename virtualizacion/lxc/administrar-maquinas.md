## Arrancar máquina
lxc-start -dn NOMBRE
  arrancar en modo daemon, si no, nos entra en el login de la máquina

## Entrar en la maquina
lxc-attach -n NOMBRE --clear-env
  por defecto ejecutara /bin/bash
lxc-attach -n centos-base --clear-env -- ip a

## Conectar a la consola de la maquina
lxc-console --name NOMBRE
Para salir de la consola: Control+a q
No funciona screen.

## Deter máquina
lxc-stop --name NOMBRE

# Destruir máquina
sudo lxc-destroy -f -n nombreContainer
  -f: para la máquina si está arrancad

## Listar máquinas
lxc-ls --fancy
  --active
  --frozen
  --running
  --stopped

## Info de una máquina
lxc-info -n NOMBRE
