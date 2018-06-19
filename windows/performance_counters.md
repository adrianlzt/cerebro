https://msdn.microsoft.com/en-us/library/windows/desktop/aa373083%28v=vs.85%29.aspx?f=255&MSPPError=-2147217396

Métricas de funcionamiento


Programa para ver los perf counters:
https://technet.microsoft.com/en-us/library/cc749249(v=ws.11).aspx


Counters relacionados con network:
https://technet.microsoft.com/en-us/library/jj574079%28v=ws.11%29.aspx?f=255&MSPPError=-2147217396


Sacar todos los perf:
Get-Counter -ListSet * | Sort-Object CounterSetName | Select-Object CounterSetName | Out-GridView
