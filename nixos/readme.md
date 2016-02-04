http://nixos.org/

The Purely Functional Linux Distribution

El nix package manager almacena todas las versiones en disco.
Almacena en un directorio diferente cada version de un mismo programa, así podemos tener instalados todos las versiones de un programa y no hay conflictos porque un programa necesite una version y otro otra.
Esto tambien ayuda a hacer rollbacks más sencillos.

Declarative
NixOS has a completely declarative approach to configuration management: you write a specification of the desired configuration of your system in NixOS’s modular language, and NixOS takes care of making it happen.

Reliable
NixOS has atomic upgrades and rollbacks. It’s always safe to try an upgrade or configuration change: if things go wrong, you can always roll back to the previous configuration.

DevOps-friendly
Declarative specs and safe upgrades make NixOS a great system for DevOps use. NixOps, the NixOS cloud deployment tool, allows you to provision and manage networks of NixOS machines in environments like Amazon EC2 and VirtualBox.
