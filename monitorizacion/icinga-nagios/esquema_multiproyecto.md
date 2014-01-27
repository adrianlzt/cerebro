Contact group por cada proyecto.
Contacts que pertenezcan a cada proyecto.


Host template generic -> donde definimos las propiedades básicas
Por cada proyecto una nueva template que herede de la generic, donde definiremos un grupo de contactos al que avisar y el hostgroup al que pertenecer.
Cada host creado por ese proyecto deberá heredar este host template.


Para los services funcionaremos parecido. Definimos un service generic, y luego un service template que herede de este, y donde se defina el contact group al que avisar en caso de fallo (aquí no asociaremos al hostgroup, ya que entonces estaríamos aplicando todos los services a todos los hsots del hostgroup).
Todos los services del proyecto deberán usar este service template.
