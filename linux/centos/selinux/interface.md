Como la "API pública" de nuestro módulo por si se quiere usar por otros módulos. Terceros usuarios podrán llamar a macros para interactuar con este módulo, en vez de tener que conocer los detalles de implementación.

Para evitar repetir código se pueden usar macros de selinux. Es lo común al crear políticas.

Listar todas las intefaces:

```bash
sepolicy interface -l
```

Descripción de una interface (no muestra el contenido):

```bash
sepolicy interface -vi application_domain
```


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
