Mirar persistent-storage.md


https://gist.github.com/djoreilly/e75e4e1e7e6ed371ef98
  config.vm.provider "virtualbox" do |v|
    file_to_disk = 'disk2.vdi'
    unless File.exist?(file_to_disk)
      # 50 GB
      v.customize ['createhd', '--filename', file_to_disk, '--size', 50 * 1024]
    end
    v.customize ['storageattach', :id, '--storagectl', 'SATAController', '--port', 1, '--device', 0, '--type', 'hdd', '--medium', file_to_disk]
  end


O meter el disco desde la interfaz de virtualbox

