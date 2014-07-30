#############
# CONCEPTOS #
#############

Security-Enhanced Linux (SELinux) adds Mandatory Access Control (MAC) to the Linux kernel.
SELinux es chequeado despues de las reglas DAC (las que permiten o deniegan permisos según usuario y grupo, las típicas rwx)
When security-relevant access is taking place, such as when a process attempts to open a file, the operation is intercepted in the kernel by SELinux. If an SELinux policy rule allows the operation, it continues, otherwise, the operation is blocked and the process receives an error.

Las políticas de selinux se aplican sobre el sistema, no las pueden modificar los usuarios (evitamos riesgos de usuarios descuidados)

La política por defecto es denegar.

# User # (no se suele usar)
Mirar user.md

# Roles # (no se suele usar)
SELinux users are authorized for roles, and roles are authorized for domains.

# Type # (suele ser lo que se usa)
Para los ficheros el type indica el tipo.
Para los procesos especifica el dominio donde se va a ejecutar el proceso. Por defecto los procesos no pueden leer ni escribir ficheros de otros procesos.
Las reglas definirán como serán los accesos entre los tipos (dominio accediento a tipo, o dominio accediendo a otro dominio)

# Domain transition #
Dominio: passwd_t
Tipos: shadow_t, passwd_exec_t

Regla: permito al dominio passwd_t modificar ficheros del tipo shadow_t
Regla: permito al tipo passwd_exec_t entrar (entrypoint) al dominio passwd_t

De esta manera, al ejecutar el comando passwd, accederá al dominio passwd_t y por ello podrá modificar los ficheros del tipo shadow_t (/etc/shadow)
Si ejecutamos passwd y miramos su type (ps -eZ | grep passwd) veremos que corre en el dominio passwd_t

# Level #
sensitivity:category-sensitivity:category
category es opcional.

s0-s0 es igual que s0
En MCS solo tenemos s0

Category se definen como: cX
c0.c3 es igual que c0,c1,c2,c3
Desde 0 a 1023

En /etc/selinux/targeted/setrans.conf se hace el mapeo a texto legible
Solo se debe editar con semanage.
Ejemplos:
s0:c0=CompanyConfidential
s0:c1=PatientRecord
s0:c2=Unclassified
s0:c3=TopSecret

# Booleans #
Configuraciones que pueden modificarse en runtime

# Modos #
Enforcing: SELinux policy is enforced. SELinux denies access based on SELinux policy rules.
Permissive: SELinux policy is not enforced. SELinux does not deny access, but denials are logged for actions that would have been denied if running in enforcing mode.
Disabled: SELinux is disabled. Only DAC rules are used.o

# Ficheros #
Para ficheros en filesystems que aceptan extended attributes y no tienen definido un SELinux context, se pondrá file_t. Este tipo no se usará en ningún otro caso.
Para ficheros con SELinux que no matcheen ninguna pattern de file-context, se definirá default_t
Por ejemplo si creamos un directorio en / este será default_t. Tendremos que definirle un contexto si queremos que un servicio confinado pueda leer este directorio.


############
# Policies #
############

## Targeted ##
By default, logged-in users run in the unconfined_t domain, and system processes started by init run in the initrc_t domain; both of these domains are unconfined.
By default, subjects running in an unconfined domain cannot allocate writeable memory and execute it.

# Confined processes
Por defecto los procesos que escuchan en la red y procesos que ejecutan tareas sobre usuarios corren sobre sus propios dominios.
httpd -> dominio httpd_t

# Unconfined Processes
Processes running in unconfined domains fall back to using DAC rules exclusively

###############
# Enforcement #
###############

## Type enforcement ##
Definimos tipos de procesos: gatos y perros
Estos procesos quieren interactuar con 'object types': comida_gato y comida_perro

Definimos una política:
permitir + gatos + comida_gato + comer

## MCS (Multi Category Security) enforcement ##
Si tenemos varios procesos del mismo tipo y queremos filtrar por uno específico.

Podemos distinguir entre procesos del mismo tipo definiendo:
perro:random1
perro:random2

## Multi Level Security (MLS) enforcement ##
Poco usada.
Mirar mls.md

To use MLS restrictions, install the selinux-policy-mls package, and configure MLS to be the default SELinux policy. The MLS policy shipped with Red Hat Enterprise Linux omits many program domains that were not part of the evaluated configuration, and therefore, MLS on a desktop workstation is unusable (no support for the X Window System).
https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/6/html/Security-Enhanced_Linux/chap-Security-Enhanced_Linux-SELinux_Contexts.html

Los datos se configuran en niveles: información, secreto, top secret.
Luego se permite a los procesos acceder a determinados niveles.
