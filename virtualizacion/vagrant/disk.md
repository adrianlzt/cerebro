Mirar persistent-storage.md

O
https://gist.github.com/leifg/4713995
  file_to_disk = './tmp/large_disk.vdi'
  config.vm.customize ['createhd', '--filename', file_to_disk, '--size', 500 * 1024]
  config.vm.customize ['storageattach', :id, '--storagectl', 'SATA Controller', '--port', 1, '--device', 0, '--type', 'hdd', '--medium', file_to_disk]

O meter el disco desde la interfaz de virtualbox

