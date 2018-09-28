Para poder permitir subir ficheros más grandes:
# set client body size to 2M
client_max_body_size 2M;



Y en php:
;This sets the maximum amount of memory in bytes that a script is allowed to allocate
memory_limit = 32M

;The maximum size of an uploaded file.
upload_max_filesize = 2M

;Sets max size of post data allowed. This setting also affects file upload. To upload large files, this value must be larger than upload_max_filesize
post_max_size = 3M
