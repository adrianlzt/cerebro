CREATE DATABASE "nombre";

DROP DATABASE [ IF EXISTS ] name;


# Rename
ALTER DATABASE db RENAME TO newdb;


# Atributos

## Definir atributos
ALTER DATABASE XXX SET ...

## Ver atributos de una db
\drds

## Quitar
ALTER DATABASE name RESET configuration_parameter;
ALTER DATABASE name RESET ALL;
