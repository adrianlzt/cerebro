Razón para sacar /tmp de /
Logrotate hace uso de /tmp para comprimir los ficheros de log. Si un fichero fuese muy grande podría llenar / al intentar hacer el logrotate
