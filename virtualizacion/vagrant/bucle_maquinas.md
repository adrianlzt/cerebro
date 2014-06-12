  (1..$num_instances).each do |i|
      config.vm.define vm_name = "core-%02d" % i do |config|
