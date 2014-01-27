## Conectar a la consola de la maquina
lxc-console --name NOMBRE
Para salir de la consola: Control+a q

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
