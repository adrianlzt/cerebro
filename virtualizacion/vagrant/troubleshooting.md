# CPU al 100%

Probar a meter esto al final del Vagrantfile:
```
  config.vm.provider "virtualbox" do |vb|                                         │
    vb.customize ["modifyvm", :id, "--audio", "none"]                             │
    vb.customize ["modifyvm", :id, "--usb", "off"]                                │
    vb.customize ["modifyvm", :id, "--usbehci", "off"]                            │
    vb.customize ["modifyvm", :id, "--usbxhci", "off"]                            │
    vb.customize ["modifyvm", :id, "--vram", "16"]                                │
  end                                                                             │
```
