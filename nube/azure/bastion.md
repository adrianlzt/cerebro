Servicio para poder acceder a las VMs sin tener que exponerlas a internet.

Podemos integrarlo con ssh:
```
Host foo1
    HostName 172.16.0.7
    User azureadmin
    IdentityFile ssh-key.pem
    StrictHostKeyChecking no
    UserKnownHostsFile /dev/null
    ProxyCommand az network bastion ssh --name FooBastion --resource-group rg-bastion --target-resource-id /subscriptions/xxx/resourceGroups/rg-instances/providers/Microsoft.Compute/virtualMachines/foo1 --auth-type ssh-key --username azureadmin --ssh-key ssh-key.pem -- -W %h:%p
```

Y con ansible:
```
ansible_ssh_common_args: >-
  -o ProxyCommand="az network bastion ssh
  --name 'FooBastion'
  --resource-group 'rg-bastion'
  --target-resource-id '{{ id }}'
  --auth-type ssh-key
  --username '{{ ansible_user }}'
  --ssh-key '{{ ansible_ssh_private_key_file }}'
  -- -W %h:%p"
```
