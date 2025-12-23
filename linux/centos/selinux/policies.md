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

mi_app.te (Reglas básicas)

mi_app.fc (Contextos de archivo: define los contextos de los distintos ficheros, se puede usar regex para matchear los ficheros)

mi_app_selinux.spec (Para crear un RPM)

mi_app.sh (Script de instalación, hace el build del módulo y genera el RPM)

mi_app.if # Interface file. Como la "API pública" de nuestro módulo por si se quiere usar por otros módulos. Terceros usuarios podrán llamar a macros para interactuar con este módulo, en vez de tener que conocer los detalles de implementación.

Los ficheros .te, .if y .fc son usados por sepolicy para crear el módulo para crear el paquete de módulo (.pp).

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
