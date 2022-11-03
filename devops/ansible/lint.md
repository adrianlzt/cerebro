https://ansible-lint.readthedocs.io/configuring/

Verificar que el rol cumple los estándares.

En el directorio de un rol, ejecutar:
ansible-lint


# Configuración
Podemos crear un fichero .ansible-lint para definir como queremos que sea el lint para este proyecto.

Excluir ficheros o directorios del análisis:
```
exclude_paths:
  - .cache/ # implicit unless exclude_paths is defined in config
  - .github/
```
