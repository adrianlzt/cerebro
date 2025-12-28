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

```bash
$ sudo sepolicy generate --init /usr/bin/mi_app
mi_app.te # Type Enforcement file
mi_app.if # Interface file
mi_app.fc # File Contexts file
mi_app_selinux.spec # Spec file
mi_app.sh # Setup Script
```

mi_app.te Reglas básicas

mi_app.fc Contextos de archivo: define los contextos de los distintos ficheros, se puede usar regex para matchear los ficheros. `restorecon` usará lo definido aquí para definir los contextos de los ficheros.

mi_app_selinux.spec (Para crear un RPM)

mi_app.sh (Script de instalación, hace el build del módulo y genera el RPM)

mi_app.if # Interface file. Como la "API pública" de nuestro módulo por si se quiere usar por otros módulos. Terceros usuarios podrán llamar a macros para interactuar con este módulo, en vez de tener que conocer los detalles de implementación.

Los ficheros .te, .if y .fc son usados por sepolicy para crear el módulo para crear el paquete de módulo (.pp).

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

# Definiciones

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

# Role Authorization / RBAC

Permitimos a user roles acceso a dominios.

# Reglas de transición

Definen cómo un proceso pasa de un estado a otro (ej. cuando init ejecuta el binario, el proceso se convierte en mi_app_t).

Ejemplo, definimos que el método de entrada (entrypoint) al dominio testprog_t es el fichero testprog_exec_t. Se definen que permisos se tienen sobre los ficheros con ese type (testprog_exec_t).

```
allow testprog_t testprog_exec_t : file { ioctl read getattr lock execute execute_no_trans entrypoint open } ;
```

# Reglas de acceso (allow rules)

Las reglas que permiten las acciones.

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

# Macros

Para evitar repetir código se pueden usar macros de selinux. Es lo común al crear políticas.

Podemos usar estas funciones de bash para poder encontrar de forma sencilla las definiciones de las macros:
<https://gist.githubusercontent.com/jamesfreeman959/40d41810beccc4ded23dc049d6ed570d/raw/5da8c9b2aae21e38777d0d2c0e4ac615cc2a2455/selinux-funcs-el9.txt>

```bash
source selinux-funcs-el9.txt
export POLICY_LOCATION=$HOME/selinux-policy-0113b35519369e628e7fcd87af000cfcd4b1fa6c/ # el fichero .tgz extraído del src.rpm, mirar sección anterio
seshowif files_pid_filetrans
```

Funciones que se definen:

sefindif - Find interface definitions that have a string that matches the given regular expression

seshowif - Show the interface definition

sefinddef - Find macro definitions that have a string that matches the given regular expression

seshowdef - Show the macro definition

sefindcon - Find macro definitions for constrains

selist - List all templates/interfaces in the order allowed by refpolicy

Ejemplo de macro.

Uso:

```
files_pid_filetrans(ntpd_t, ntpd_var_run_t, file)
```

Definición (es una _interface_):

```
interface(`files_pid_filetrans',`
        gen_require(`
                type var_t, var_run_t;
        ')


        allow $1 var_t:dir search_dir_perms;
        filetrans_pattern($1, var_run_t, $2, $3, $4)
')
```

Y mostrando las macros que usa esta _interface_:

```
define(`gen_require',`
        ifdef(`self_contained_policy',`
                ifdef(`__in_optional_policy',`
                        require {
                                $1
                        } # end require
                ')
        ')
')

define(`search_dir_perms',`{ getattr search open }')

define(`filetrans_pattern',`
        allow $1 $2:dir rw_dir_perms;
        type_transition $1 $2:$4 $3 $5;
')
```

Resolviendo las macros quedaría:

```
files_pid_filetrans(ntpd_t, ntpd_var_run_t, file)
```

->

```
ifdef(`self_contained_policy',`
        ifdef(`__in_optional_policy',`
                require { type var_t, var_run_t }
        ')
')


allow ntpd_t var_t:dir { getattr search open };

allow ntpd_t var_run_t:dir { open read getattr lock search ioctl add_name remove_name write };
type_transition ntpd_t var_run_t:file ntpd_var_run_t;

```

Esa interface en concreto está definida en /usr/share/selinux/devel/include/kernel/files.if
En ese fichero hay un xml con documentación:

```xml
## <summary>
##      Create an object in the process ID directory, with a private type.
## </summary>
## <desc>
##      <p>
##      Create an object in the process ID directory (e.g., /var/run)
##      with a private type.  Typically this is used for creating
##      private PID files in /var/run with the private type instead
##      of the general PID file type. To accomplish this goal,
##      either the program must be SELinux-aware, or use this interface.
##      </p>
##      <p>
##      Related interfaces:
##      </p>
##      <ul>
##              <li>files_pid_file()</li>
##      </ul>
##      <p>
##      Example usage with a domain that can create and
##      write its PID file with a private PID file type in the
##      /var/run directory:
##      </p>
##      <p>
##      type mypidfile_t;
##      files_pid_file(mypidfile_t)
##      allow mydomain_t mypidfile_t:file { create_file_perms write_file_perms };
##      files_pid_filetrans(mydomain_t, mypidfile_t, file)
##      </p>
## </desc>
...
```
