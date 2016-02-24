# Ejecucción de un check
https://github.com/Icinga/icinga-core/blob/fb5e3c84d6401a2e82815e544bc2cc0c81bc7f8a/base/checks.c#L393

Aqui se hace un fork donde se ejecuta relamente el check:
https://github.com/Icinga/icinga-core/blob/fb5e3c84d6401a2e82815e544bc2cc0c81bc7f8a/base/checks.c#L825

Este llama a https://github.com/Icinga/icinga-core/blob/fb5e3c84d6401a2e82815e544bc2cc0c81bc7f8a/base/checks.c#L205
Que copia la salida a la variable checkresult_dbuf

El output se almacena en el fichero check_result_info.output_file_fp como
output=%s\n
https://github.com/Icinga/icinga-core/blob/fb5e3c84d6401a2e82815e544bc2cc0c81bc7f8a/base/checks.c#L983

Ese fichero se mueve al queue directory
https://github.com/Icinga/icinga-core/blob/fb5e3c84d6401a2e82815e544bc2cc0c81bc7f8a/base/utils.c#L2716

Como se procesa la queue:
https://github.com/Icinga/icinga-core/blob/fb5e3c84d6401a2e82815e544bc2cc0c81bc7f8a/base/utils.c#L2778

Aqui se parsea el resultado
https://github.com/Icinga/icinga-core/blob/fb5e3c84d6401a2e82815e544bc2cc0c81bc7f8a/base/utils.c#L2887

Los datos del check se guardan en un struct new_cr y se almacena en memoria:
add_check_result_to_list

La lista es una variable externa: check_result_list

Aqui se procesa la lista: read_check_result (esta funcion va devolviendo resultados de la lista)
https://github.com/Icinga/icinga-core/blob/fb5e3c84d6401a2e82815e544bc2cc0c81bc7f8a/base/utils.c#L3074

checks.c es donde esta el while que va sacando elementos y procesándolos:
https://github.com/Icinga/icinga-core/blob/fb5e3c84d6401a2e82815e544bc2cc0c81bc7f8a/base/checks.c#L307

Y aqui se parsea: handle_async_service_check_result
https://github.com/Icinga/icinga-core/blob/fb5e3c84d6401a2e82815e544bc2cc0c81bc7f8a/base/checks.c#L307

La función que parsea el output: parse_check_output
parse raw plugin output and return: short and long output, perf data
https://github.com/Icinga/icinga-core/blob/fb5e3c84d6401a2e82815e544bc2cc0c81bc7f8a/base/checks.c#L4469

Aqui se separa, de la primera linea, el output del perfdata:
https://github.com/Icinga/icinga-core/blob/fb5e3c84d6401a2e82815e544bc2cc0c81bc7f8a/base/checks.c#L4543
