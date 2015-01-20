https://gist.github.com/rothgar/8793800


- name: "Build hosts file"
  lineinfile: dest=/etc/hosts regexp='.*{{ item }}$' line="{{ hostvars[item].ansible_default_ipv4.address }} {{item}}" state=present
  when: hostvars[item].ansible_default_ipv4.address is defined
  with_items: groups['all']
