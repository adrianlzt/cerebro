# Cambio moneda
https://support.google.com/docs/answer/3093281?hl=es

=GoogleFinance("CURRENCY:USDEUR";"price";DATE(2017;3;16))

Obtener el cambio $ -> € para la fecha especificada
Se expande para generar una matriz 2x2:
Date                | Close
16/03/2017 23:58:00 | 0,92837583


# funciones script
https://developers.google.com/apps-script/reference/spreadsheet/sheet
https://developers.google.com/apps-script/reference/spreadsheet/range

# trabajar con fechas
https://developers.google.com/google-ads/scripts/docs/features/date


# Triggers
Si ponemos funciones que se llamen onEdit, etc se ejecutarán automáticamente si se da la condición.

Pero hay ciertas operaciones que no se pueden ejeutar en ese formato, por ejemplo, enviar emails.
Para ese caso tendremos que instalar un trigger a mano, desde el editor de script, Edit -> Current project's triggers
