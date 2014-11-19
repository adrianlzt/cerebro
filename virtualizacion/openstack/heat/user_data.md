user_data_format parece que solo es para icehouse
Genera un fichero de log en el cliente (mirar log.md)


server:
  type: OS::Nova::Server
  properties:
    user_data_format: RAW
    user_data: ...


Por defecto el CWD es / y el usuario es root.
user_data: |
  #!/bin/bash
  id > ID.log
  echo "hola en el script"
  echo "contenido" > /tmp/fichero


user_data_format: RAW
user_data:
  get_file: http://example.com/my_other_instance_user_data.sh
# Solo icehouse. En Havana me dice que user_data value must be a string


user_data_format: RAW
user_data:
  str_replace:
    template: |
      #!/bin/bash -v
      yum -y install httpd wordpress
      systemctl enable httpd.service
      systemctl start httpd.service
      setsebool -P httpd_can_network_connect_db=1

      sed -i "/Deny from All/d" /etc/httpd/conf.d/wordpress.conf
      sed -i "s/Require local/Require all granted/" /etc/httpd/conf.d/wordpress.conf
      sed -i s/database_name_here/$db_name/ /etc/wordpress/wp-config.php
      sed -i s/username_here/$db_user/ /etc/wordpress/wp-config.php
      sed -i s/password_here/$db_password/ /etc/wordpress/wp-config.php
      sed -i s/localhost/$db_host/ /etc/wordpress/wp-config.php

      systemctl restart httpd.service
    params:
      $db_name: {get_param: database_name}
      $db_user: {get_param: database_user}
      $db_password: {get_attr: [database_password, value]}
      $db_host: {get_attr: [db, first_address]}

En params no hace falta poner el dolar, pero es mejor usarlo asi para evitar que esa palabra coincida con otra parte y lo sustituya.
