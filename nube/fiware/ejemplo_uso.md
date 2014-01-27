Creo un blueprint template, donde defino mi arquitectura: nodo icinga core + nodo esclavo
Los nodos que creo dentro del template se llaman tiers, y definen un tipo de nodo.
Les puedo definir una ip pública y un keypair al igual que openstack/amazon.

Cuando instancio un blueprint, se me crean dos VM, una por cada tier.
Puedo decidir crear más VM de los tiers.

Si no le defino un grupo de seguridad, me creará uno por cada máquina.
