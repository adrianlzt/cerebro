https://docs.microsoft.com/en-us/windows/win32/wmisdk/wmi-start-page

Se pueden escribir SQL

Consola:
wmic

Clases disponibles:
https://docs.microsoft.com/en-us/windows/win32/wmisdk/wmi-classes

Buscar clases en todos los namespaces
https://gallery.technet.microsoft.com/scriptcenter/WMI-Explorer-Search-WMI-cd87e309

Parece que se puede usar con SQL (visto en https://social.msdn.microsoft.com/Forums/en-US/18ce0701-e87d-4414-a8b5-8be3908a21b8/reading-cpu-temperature-wmi?forum=vblanguage)
"root\WMI", "SELECT * FROM MSAcpi_ThermalZoneTemperature"

# Temperatura
http://wutils.com/wmi/root/wmi/msacpi_thermalzonetemperature/

Obtener temperatura (en kelin*10)
wmic /namespace:\\root\wmi PATH MSAcpi_ThermalZoneTemperature get CurrentTemperature

Todos los valores del MSAcpi_ThermalZoneTemperature
wmic /namespace:\\root\wmi PATH MSAcpi_ThermalZoneTemperature

Parece que la gente instala apps especificas para obtener esos valores
https://superuser.com/questions/395434/how-can-i-check-the-temperature-of-my-cpu-in-windows


# WQL (SQL for WMI)
https://learn.microsoft.com/en-us/windows/win32/wmisdk/wql-sql-for-wmi
