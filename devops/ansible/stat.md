- name: check if active link already exists
  stat: path={{ cyclops_icinga_active_dir }}
  register: pepe

- pause: prompt="es true"
  when: pepe.stat.exists

- pause: prompt="es false"
  when: not pepe.stat.exists
