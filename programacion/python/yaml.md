http://pyyaml.org/
http://pyyaml.org/wiki/PyYAMLDocumentation

# Pip
pip install pyaml

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

yaml.dump(data, file("/tmp/test.yml","w"), default_flow_style=False)

with open("otro.yml", "w") as fd:
    yaml.dump(config, fd, default_flow_style=False)


# Si es el texto es unicode
yaml.safe_dump(data, file("/tmp/test.yml","w"), encoding='utf-8', allow_unicode=True, default_flow_style=False)



Si queremos mergear ficheros yaml
https://github.com/zerwes/hiyapyco/
