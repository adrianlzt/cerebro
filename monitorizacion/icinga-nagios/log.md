Substituir una fecha de un log en Unix Time to Epoch a fecha normal
echo "[1373855136] SERVICE ALERT: Tomcat2-live;Checkeo de Logs" | awk -F, '{x=$1;sub(/\[/,"",$1);sub(/.*]/,strftime("%Y-%m-%d %H:%M:%S",$1),x);$1=x;}1'


# Rotado
Rotado del fichero de log (icinga.log)

Opciones de configuración
log_file=/srv/nagios/icinga/log/icinga.log
log_rotation_method=d
log_archive_path=/srv/nagios/icinga/log/archives/
use_daemon_log=1


Donde se llama a la función de rotado:
https://github.com/Icinga/icinga-core/blob/v1.11.6/base/events.c#L1519
int handle_timed_event(timed_event *event) {
  switch (event->event_type) {
  case EVENT_LOG_ROTATION:
    rotate_log_file(event->run_time);

Función que rota el fichero:
https://github.com/Icinga/icinga-core/blob/v1.11.6/base/logging.c#L533
int rotate_log_file(time_t rotation_time) {
  // pongo lo que hace la funcion en pseudo lenguaje

	method_string = "DAILY"
  last_log_rotation = date +%s
  t = localtime_r(&rotation_time, &tm_s); //Convierte la fecha a la zona horaria local
  stat_result = stat(log_file, &log_file_stat); //pone en &log_file_stat los datos del fichero
  close_log_file();
     	fflush(log_fp);
    	fclose(log_fp);
  /* get the archived filename to use */
  /* rotate the log file */
	rename_result = my_rename(log_file, log_archive); //https://github.com/Icinga/icinga-core/blob/v1.11.6/base/utils.c#L3309

       struct tm *localtime(const time_t *timep);
       struct tm *localtime_r(const time_t *timep, struct tm *result);


Tras rotar se escribe la traza:
https://github.com/Icinga/icinga-core/blob/v1.11.6/base/logging.c#L579
"LOG ROTATION: %s\n", method_string

