sysctl vm.block_dump=1
  activar IO debugging

Nos saca por dmesg trazas con los bloques leídos y escritos
[ 2642.127148] btrfs-submit-1(242): WRITE block 10673392 on sda3 (8 sectors)


"dirtied inode" un inodo que se ha llevado a memoria, se ha modificado y aún no se ha cambiado en disco (los datos entre memoria y disco es distinta)
