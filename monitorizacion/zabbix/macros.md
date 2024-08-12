<https://www.zabbix.com/documentation/6.0/manual/config/macros>

Hay macros ha varios niveles: instalación, template, host, etc

{EJEMPLO}

User macro:
{$FOO}

# Macros con context

<https://www.zabbix.com/documentation/6.0/en/manual/config/macros/user_macros_context>

macros:
{$LOW_SPACE_LIMIT} 10
{$LOW_SPACE_LIMIT:"/opt"} 25

trigger:
{ca_001:vfs.fs.size[{#FSNAME},pfree].last()} < {$LOW_SPACE_LIMIT:"{#FSNAME}"}

Para el sistema de fichero /opt el trigger saltará al 25%
Para el resto, 10%

Podemos usar también macros con regexp:

```
{$LOW_SPACE_LIMIT:regex:"^/var/log/.*$"}
```

Por las pruebas que he hecho, se intenta primero matchear las macros con contexto estático y luego las regex (probado en 6.0.32).
La prueba fue definir las regex:

```
{$LOW_SPACE_LIMIT}=1
{$LOW_SPACE_LIMIT:dbuno,1} = 30
{$LOW_SPACE_LIMIT:regex:"^[^,]*,1$"} = 10
{$LOW_SPACE_LIMIT:zdbxx,1} = 50
```

Y comprobar que el item `disk[dbuno,1]` saltaba con 30 y el `disk[zdbxx,1]` saltaba con 50 (intentaba comprobar si el orden alfabético tenía algo que ver).

# Internal

Internamente las macros lanzan una query a la bbdd para resolverlas.
Parece una mejor idea evitar las macros en los triggers names, para evitar lanzar tantas queries contra la bbdd.
Esto al menos sucede con la macro {HOST.NAME} cuando los timer están chequeando un evento contra los actions, cuando hay una condition con el nombre del trigger.
