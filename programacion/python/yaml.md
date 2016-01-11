http://pyyaml.org/
http://pyyaml.org/wiki/PyYAMLDocumentation


# Arch
pacman -S python2-yaml


# Ficheros
witai.yml:
---
  clave: "nig8abuasd"

  array: 
    - "elem1"
    - "elem2"

  array_dicc: 
    - foo: "VAR"
      cosa: "asd12"
    - pepe: "MAR"



import yaml
with open("witai.yml") as fd:
    config = yaml.load(fd)

print(config['clave'])
yaml.dump(config, file('otro.yml','w'), default_flow_style=False)

