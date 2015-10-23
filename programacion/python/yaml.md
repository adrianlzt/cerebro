http://pyyaml.org/
http://pyyaml.org/wiki/PyYAMLDocumentation


# Arch
pacman -S python2-yaml


# Ficheros
import yaml
vars = yaml.load(open('botools.yml','r'))
print(vars['clave'])
yaml.dump(vars, file('otro.yml','w'), default_flow_style=False)

