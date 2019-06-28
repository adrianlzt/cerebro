# Obtener dia de la semana
SELECT DATENAME(dw,GETDATE()) -- Friday
SELECT DATEPART(dw,GETDATE()) -- 6


# Date to unix time stamp
select DATEDIFF(second,{d '1970-01-01'},@datetime)
  @datetime es el campo con la fecha
  Parece que tenemos que dejar lo de 1970-01-01, aunque en nuestra fecha no veamos ese formato


# Convertir formatos
Una fecha con formato YYYYMMDD (int) lo convertimos a timestamp:
    DATEDIFF(second,{d '1970-01-01'},CAST(CAST(SJH.run_date as varchar) as datetime)) AS LastRunDate,
