Prioritizar ciertas requests encoladas sobre otras.
Ejemplos:
  enviar CSS/JS antes que imágenes.
  dar más prioridad a ciertos usuarios
  dar menos prioridad a bots



acl is_jscss path_end .js .css
acl is_image path_end .png .jpg .jpeg
http-request set-priority-class int(1) if is_jscss
http-request set-priority-class int(10) if is_image
http-request set-priority-class int(100) if !is_jscss !is_image

Un número menor indica más prioridad
