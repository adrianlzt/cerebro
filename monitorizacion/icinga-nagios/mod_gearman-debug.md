Bajar zip:
https://github.com/sni/mod_gearman/tree/nagios3

INSTALL: https://github.com/sni/mod_gearman/blob/nagios3/INSTALL

Hace falta libgearman: paquete gearmand
Mejor hacer un install de mod_gearman y asi tenemos todas las dependencias
repo para instalarlo:   rpm -Uvh "https://labs.consol.de/repo/stable/rhel6/i386/labs-consol-stable.rhel6.noarch.rpm"

yum groupinstall -y "Development tools"
yum install -y  autoconf automake ncurses-devel libtool libtool-ltdl-devel libevent-devel gearmand-devel

%> ./autogen.sh
%> ./configure
%> make
%> make test
%> make install



# Problema con pérdida de paquetes


     * save this result to a file, so when nagios crashes,
     * we have at least the crashed package
Aqui se almacena en un fichero de texto el resultado. Podría valer para guardarlos en el formato que icinga lee tras arrancar?




Activo GM_DEBUG metiendo en include/common.h
/* constants */
#define GM_DEBUG                        1


Ahora si envío un service que no existe, el log de mod_gearman_neb dirá:
[2015-04-16 07:55:12][2061][ERROR] service 'servic' on host 'perfdata-project-1_host-1' could not be found

Y se creará el fichero: /tmp/mod_gearman_result.txt
con el contenido leído de la cola gearman.




La inserción de tareas de mod_gearman_neb a icinga sigue las funciones:

neb_module/result_thread.c
Coje los datos de la cola gearman y los mete en la lista mod_gm_result_list
void *get_results( gearman_job_st *job, void *context, size_t *result_size, gearman_return_t *ret_ptr ) {
    mod_gm_add_result_to_list( chk_result );


neb_module/mod_gearman.c
Inserta la tarea en la cola mod_gm_result_list
void mod_gm_add_result_to_list(check_result * newcr) {
  mod_gm_result_list

Se procesa la cola mod_gm_result_list
static void move_results_to_core() {
   check_result_list = merge_result_lists(local, check_result_list);

La variable check_result_list está declarada como extern y es usada también por icinga.


No me queda clara la comunicación entre mod_gearman_neb e icinga.
Parece que es escribiendo la variable check_result_list, pero imprimiendo el tamaño de esta variable en mod_gearman_neb no me queda claro su funcionamiento.
Seguir haciendo pruebas subiendo el reaper time y sin reiniciar icinga para ver si esta variable mantiene el tamaño hasta que pase icinga leyendola.
