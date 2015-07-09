https://github.com/sbitio/ansible-pacemaker/blob/master/library/pcs_resource

Eg.:
- name: Create MySQL VIP
  pcs_resource: >
    command=create
    resource_id=mysql-vip
    group=group-mysql
    type=ocf:heartbeat:IPaddr2
  args:
    options:
      ip: "{{ mysql_vip_ipv4 }}"
      cidr_netmask: "{{ mysql_vip_cidr }}"
    operations:
      - action: monitor
        options:
          interval: 10s

