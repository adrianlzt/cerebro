http://sapstudent.com/hana/sql-datetime-functions-in-sap-hana

select YEAR(CURRENT_DATE) from dummy;

select now() from dummy
2019-01-22 17:24:56.949000000

Restar una hora
select ADD_SECONDS(now(),-3600) from dummy
