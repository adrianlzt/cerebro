https://docs.openshift.com/container-platform/3.5/install_config/install/planning.html

Podemos instalar con un script interactivo o usando los playbooks de ansible. https://docs.openshift.com/container-platform/3.5/install_config/install/quick_install.html#install-config-install-quick-install

Tambien podemos instalar de forma interactiva y luego modificar con ansible. https://docs.openshift.com/container-platform/3.5/install_config/install/advanced_install.html#install-config-install-advanced-install

Si montamos HA para los master deberemos elegir una VIP accesible por el resto de nodos del cluster.



# Quick install
Lanzamos desde la máquina que hayamos configurado como "bastion"

Lanzar la instalación
atomic-openshift-installer install
