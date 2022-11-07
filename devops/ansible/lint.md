https://ansible-lint.readthedocs.io/configuring/
https://ansible-lint.readthedocs.io/rules/

Verificar que el rol cumple los estándares.

En el directorio de un rol, ejecutar:
ansible-lint

Generalmente también pasaremos el yamllint.


# Configuración
Podemos crear un fichero .ansible-lint para definir como queremos que sea el lint para este proyecto.

Excluir ficheros o directorios del análisis:
```
exclude_paths:
  - .cache/ # implicit unless exclude_paths is defined in config
  - .github/
```

Ejemplos de exclude
https://opendev.org/openstack/bifrost/src/branch/master/.ansible-lint
