Tipos de datos para fechas/horas/duración
https://help.sap.com/viewer/4fe29514fd584807ac9f2a04f6754767/2.0.00/en-US/20a1569875191014b507cf392724b7eb.html#loio20a1569875191014b507cf392724b7eb___csql_data_types_1sql_data_types_introduction_datetime


Tenemos tipo de dato DATE, TIME y TIMESTAMP
DATE es solo dia
TIME solo hora
TIMESTAMP día y hora


https://help.sap.com/viewer/4fe29514fd584807ac9f2a04f6754767/2.0.00/en-US/209f228975191014baed94f1b69693ae.html

select YEAR(CURRENT_DATE) from dummy;

select now() from dummy
2019-01-22 17:24:56.949000000

Restar una hora
select ADD_SECONDS(now(),-3600) from dummy


Convertir a un formato determinado:
TO_VARCHAR(CURRENT_TIMESTAMP, 'YYYYMMDD')

select TO_VARCHAR(CURRENT_TIMESTAMP, 'HH24:MI:SS') from dummy;


SELECT CURRENT_TIME "current time" FROM DUMMY;
