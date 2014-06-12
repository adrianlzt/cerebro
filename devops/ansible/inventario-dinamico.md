http://docs.ansible.com/list_of_inventory_modules.html

Crear hosts y hostgroups "al vuelo"

# add host to group 'just_created' with variable foo=42
- add_host: name={{ ip_from_ec2 }} groups=just_created foo=4

- name: create node host group
  add_host: name={{ item.id }} ansible_ssh_host={{ item.address }}
            ansible_ssh_user=root lb_id={{ lb.balancer.id }}
            groups=web
  with_items: lb.balancer.nodes
