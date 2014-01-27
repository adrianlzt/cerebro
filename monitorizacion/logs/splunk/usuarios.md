Primero creamos un usuario, y nos dará la opción de crear un role para este usuario.
Nos creará el role user-NOMBRE, y en este role será donde asignemos el índice. En ese role también heredaremos un role predefinido, para permitirle hacer cosas. Por lo general heredaremos "power" (capabilities de real time search y scheduled search, y hereda del rol user: change_own_password get_metadata get_typeahead input_file list_inputs output_file request_remote_tok rest_apps_view rest_properties_get rest_properties_set schedule_rtsearch search).
Luego creamos un índice, y lo metemos en el role para que el usuario pueda buscar sobre él. (también podríamos haber creado antes el índice que el usario)


Script creacion usuarios by basilis:

splunk add index NOMBRE
Se puede crear desde la web

En la UI web creas un role, que hereda características de otro, le dices que índice tiene permiso
Default app: primera vista que ve cuando entra
Role power, tiene cierdas habilidades: búsqueda en tiempo real, programar, etc.

Se le especifica en que index busca por defecto, y tambien podemos darle permisos para que busque en más índices


El usuario se coge el rol


