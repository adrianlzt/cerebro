https://github.com/peterherrmann/BetterLog
Libreria externa para meter trazas de logs en una sheet

Recursos > Bibliotecas > MYB7yzedMbnJaMKECt6Sm7FLDhaBgl_dE

En la sheet que le pasemos, creará una nueva pestaña llamada "Log" donde meterá las trazas.

// Add one line to use BetterLog
Logger = BetterLog.useSpreadsheet('your-spreadsheet-key-goes-here');

//Now you can log and it will also log to the spreadsheet
Logger.log("That's all you need to do");



# El de google
https://developers.google.com/apps-script/reference/base/logger

Logger.log(JSON.stringify(var))
