https://packagist.org

Paquetes para php estilo gemas de ruby.


Para usarlo tenemos que instalar Composer:
curl -s http://getcomposer.org/installer | php

Solo crea un fichero, composer.phar

Para instalar un paquete:
php composer.phar install

cat << FIN > composer.json
{
    "require": {
        "vendor/package": "1.3.2",
    }
}
FIN
