<https://selinuxproject.org/page/TypeRules>

Disponemos de dos métodos para crear polítias (lo que creamos son _modules_):

- usar modo permisivo y crear una política a partir de los errores
- generar un esquelo de política usando sepolicy

Si hemos desarrollado una aplicación nueva, típicamente haremos el esqueleto desde 0 y luego ejecutaremos la aplicación en modo permisivo para ver que requiere.

Para usar `sepolicy` necesitamos:

```bash
dnf -y install selinux-policy-devel
```

# Generar un esquelo de una política

Este comando necesita acceder a los repos para bajar los rpms (/usr/lib/python3.9/site-packages/sepolicy/generate.py self.__extract_rpms). Parece que se usa para añadirlos a algún listado de ficheros que usa.

```bash
sepolicy generate --init /usr/bin/mi_app
```

El flag `--init` es para programas que se arrancarán por systemd.

El flag `--application` es para programas que ejecutará un usuario.

Típicamente pimero pondremos la app en modo permisivo y analizaremos los errores que genera e iremos corrigiendo la política:

```bash
semanage permissive -a mywebapp_t
```

mi_app.te, Type Enforcement file, reglas básicas

mi_app.fc Contextos de archivo: define los contextos de los distintos ficheros, se puede usar regex para matchear los ficheros. `restorecon` usará lo definido aquí para definir los contextos de los ficheros.

mi_app_selinux.spec (Para crear un RPM)

mi_app.sh (Script de instalación, hace el build del módulo y genera el RPM)

mi_app.if # Interface file. Como la "API pública" de nuestro módulo por si se quiere usar por otros módulos. Terceros usuarios podrán llamar a macros para interactuar con este módulo, en vez de tener que conocer los detalles de implementación.

Los ficheros .te, .if y .fc son usados por sepolicy para crear el módulo para crear el paquete de módulo (.pp).

Si ejecutamos el script bash:

- build de la policy
- instalar la policy
- generar man page. Podemos abrirla con `man -l foo_selinux.8`
- restorecon del fichero binario al que apuntamos
- generar rpm

## Permisos que otorga

Si usamos `--application`:

- creará el domain `prueba_t`
- definirá el binario como entrypoint para el domain `prueba_t` (estos dos primeros puntos usando la interface `application_domain`)`
- seteará el binario con el contexto `system_u:object_r:prueba_exec_t,s0`

NOTA: por defecto marcará ese dominio como permissive, por lo que selinux logueará las cosas pero no bloqueará nada.

## Files context

Nombres típicos que se suelen asignar a ficheros:

Ejecutables: XXX_exec_t

Configuración: XXX_conf_t

PID files: XXX_var_run_t

Data: XXX_data_t

## Compilar una política

A partir de los ficheros x.te, x.fc, etc genera una política.

```bash
make -f /usr/share/selinux/devel/Makefile OUTPUT.pp
```

O también podemos usar el fichero .sh que genera `sepolicy generate` (comentar la parte de generar el RPM si no lo queremos).

# audit2allow, generar políticas dejando correr la aplicación

Si la aplicación ya la tenemos en un dominio (punto anterior), podemos solo poner en modo permisivo ese dominio:

```bash
sudo semanage permissive -a mi_app_t
```

Si no, tendremos que poner todo el sistema en modo permisivo.

Luego arrancaremos nuesta aplicación, recorriendo todos los caminos posibles para registrar las posibles violaciones de la política, que se registrarán en el log de audit.

Luego usaremos audit2allow para generar el esquema de la poilicy a partir de los errores registrados en el log de audit:

```bash
sudo grep "mi_app_t" /var/log/audit/audit.log | audit2allow -M mi_app_refinada
```

Luego tendremos que instalar la nuva política y desactivar el modo permisivo.

# Estructura de una política (ficheros .te)

## Cabecera

Definimos el nombre y la versión, que iremos subiendo según modifiquemos la política.

```
policy_module(testprog, 1.0.0)
```

## Requisitos

Es donde "importamos" types ya existentes para usarlos en nuestra policy.

También hace falta especificar que clases y permisos de esas clases necesitas.

Ejemplo:

```
require {
        type unconfined_t;
        role unconfined_r;
        class file { ioctl getattr setattr create read write unlink open relabelto };
        class process transition;
}
```

La `class file` se usa para definir que operaciones se podrán realizar contra los ficheros. `relabelto` es para permitir cambiar la label de un fichero.
El `process transition` permite al proceso cambiar de dominio al proceso.

### Definiciones

Creamos/defimos los types que vamos a usar.

Primero declaramos el type y luego marcamos este type para que sea de un tipo determinado.

Ejemplo:

```
type testprog_t;
domain_type(testprog_t);

type testprog_exec_t;
files_type(testprog_exec_t);
```

Creamos un tipo domain y uno tipo fichero.

### Role Authorization / RBAC

Permitimos a user roles acceso a dominios.

### Reglas de transición

Definen cómo un proceso pasa de un estado a otro (ej. cuando init ejecuta el binario, el proceso se convierte en mi_app_t).

Ejemplo, definimos que el método de entrada (entrypoint) al dominio testprog_t es el fichero testprog_exec_t. Se definen que permisos se tienen sobre los ficheros con ese type (testprog_exec_t).

```
allow testprog_t testprog_exec_t : file { ioctl read getattr lock execute execute_no_trans entrypoint open } ;
```

### Reglas de acceso (allow rules)

Las reglas que permiten las acciones.

# interaces (ficheros .if)

Declaramos una epsecie de "macros" que puede usar otras políticas para intereactuar con nuestro dominio.

Ejemplo básico, tenemos un programa que genera ficheros de datos bajo la label `testprog_data_t`.

Creamos en la política de ese programa una interfaz que permita a otros programas leer estos datos:

```
interface(`testprog_read_data',`
        gen_require(`
                type testprog_data_t;
        ')

        # Allow the domain passed as argument 1 to access the testprog data
        allow $1 testprog_data_t:dir { search add_name };
        allow $1 testprog_data_t:file { open read getattr };
')
```

# Administrar módulos / semodule

mirar administracion.md "semodule"

# Mostrar contenido módulos / desensamblar / sedismod

Para ver el contenido de un módulo instalado.

Primero extraemos el modulo a un fichero:

```bash
semodule -E ntp
```

Luego usamos el desensamblador:

```bash
sedismod ntp.pp
```

No es muy intuitivo, y no tendremos los posibles comentarios añadidos por los desarrolladores.

Suele ser mejor las fuentes donde se hayan definido esos módulos.

## Código fuente políticas

Para rocky linux 9 sería:
<https://download.rockylinux.org/pub/rocky/9/AppStream/source/tree/Packages/s/selinux-policy-38.1.45-3.el9_5.src.rpm>

Al abrir el RPM tendremos un .tgz y dentro las políticas.

Ejemplo para ntp: selinux-policy/selinux-policy-b010cd37abae61184154e1f2b0db330aaa81fbdb/policy/modules/contrib/ntp.te

Puede ser útil consultar las man pages asociadas, por ejemplo:

```bash
man ntpd_selinux
```
