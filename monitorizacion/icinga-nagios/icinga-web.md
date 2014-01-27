## Resetear password de root ##
https://wiki.icinga.org/display/howtos/Reset+Icinga+Web+root+password

Una de las formas, volver a poner la password a root:
mysql icinga_web -e "UPDATE nsm_user SET user_password='42bc5093863dce8c150387a5bb7e3061cf3ea67d2cf1779671e1b0f435e953a1', user_salt='0c099ae4627b144f3a7eaa763ba43b10fd5d1caa8738a98f11bb973bebc52ccd' WHERE user_name='root';"
