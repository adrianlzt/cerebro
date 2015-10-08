https://docs.pnp4nagios.org/pnp-0.6/tpl_special

Generar gráficas agrupando sources de distintos hosts y services

De donde se leeran las templates se define en la config en: special_template_dir
Por defecto: /usr/share/nagios/html/pnp4nagios/templates.special

Recordar que sea legible por apache (chmod a+r por si acaso)


Nos deja jugar bastante con los valores que conoce pnp4nagios de las graficas y perfdata.

# Funciones
https://docs.pnp4nagios.org/pnp-0.6/tpl_helper
https://docs.pnp4nagios.org/pnp-0.6/tpl_helper_pnp

# Sacar info de un service
$a = $this->tplGetData("master-1","disk");
throw new Kohana_exception(print_r($a,TRUE));

Estructura de los datos para una gráfica con multiples data sources (DS):
ejemplo_pnp4data.data

Ejemplos de extracción de datos:
$a['MACRO']['CHECK_COMMAND']



# Errores
Unknown Exception: Special Template 'adri' not found

Chequear que esta en el dir adecuado y que tiene permisos de lectura
