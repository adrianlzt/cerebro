# SAPABAP1.EDIDS
http://www.cvosoft.com/glosario-sap/edids/

Registro de estado
300M de rows para la db que analicé


## Columnas
Name    Length  Nullable  Type
APPL_L  20      NO        NVARCHAR
COUNTR  16      NO        NVARCHAR
CREDAT  8       NO        NVARCHAR
CRETIM  6       NO        NVARCHAR
_DATAA  8       NO        NVARCHAR
DOCNUM  16      NO        NVARCHAR
LOGDAT  8       NO        NVARCHAR
LOGTIM  6       NO        NVARCHAR
MANDT   3       NO        NVARCHAR
REPID   30      NO        NVARCHAR
ROUTID  30      NO        NVARCHAR
SEGFLD  30      NO        NVARCHAR
SEGNUM  6       NO        NVARCHAR
STACOD  8       NO        NVARCHAR
STAMID  20      NO        NVARCHAR
STAMNO  3       NO        NVARCHAR
STAMQU  3       NO        NVARCHAR
STAPA1  50      NO        NVARCHAR
STAPA2  50      NO        NVARCHAR
STAPA3  50      NO        NVARCHAR
STAPA4  50      NO        NVARCHAR
STATUS  2       NO        NVARCHAR
STATXT  70      NO        NVARCHAR
STATYP  1       NO        NVARCHAR
TID     24      NO        NVARCHAR
UNAME   12      NO        NVARCHAR

COUNTR
https://www.se80.co.uk/saptabfields/e/edid/edids-countr.htm
It states how many status records there are in the table EDIDS
Es un número creciente no repetible para cada DOCNUM.


## Estructura y datos
hdbsql H4T=> select DOCNUM,STAMID,STAMNO,STATUS,CREDAT,CRETIM,LOGDAT,LOGTIM,COUNTR from SAPABAP1.EDIDS order by LOGDAT desc, LOGTIM desc limit 10;
| DOCNUM           | STAM | STA | ST | CREDAT   | CRETIM | LOGDAT   | LOGTIM | COUNTR           |
| ---------------- | ---- | --- | -- | -------- | ------ | -------- | ------ | ---------------- |
| 0000000072915628 | MEPO | 000 | 51 | 20201215 | 105309 | 20201215 | 105309 | 0000000000002775 |
| 0000000072915628 | ME   | 039 | 51 | 20201215 | 105309 | 20201215 | 105309 | 0000000000002774 |
| 0000000072915628 | ME   | 589 | 51 | 20201215 | 105309 | 20201215 | 105309 | 0000000000002773 |
| 0000000072915628 | ME   | 039 | 51 | 20201215 | 105309 | 20201215 | 105309 | 0000000000002772 |
| 0000000072915628 | ME   | 589 | 51 | 20201215 | 105309 | 20201215 | 105309 | 0000000000002771 |
| 0000000072915628 | ME   | 039 | 51 | 20201215 | 105309 | 20201215 | 105309 | 0000000000002770 |
| 0000000072915628 | ME   | 589 | 51 | 20201215 | 105309 | 20201215 | 105309 | 0000000000002769 |
| 0000000072915628 | ME   | 039 | 51 | 20201215 | 105309 | 20201215 | 105309 | 0000000000002768 |
| 0000000072915628 | ME   | 589 | 51 | 20201215 | 105309 | 20201215 | 105309 | 0000000000002767 |
| 0000000072915628 | ME   | 039 | 51 | 20201215 | 105309 | 20201215 | 105309 | 0000000000002766 |


Un DOCNUM puede tener distintos STAMID/STAMNO
Un STAMID puede tener diferentes STAMNO (o al revés).


# SAPABAP1.EDIDC
http://www.cvosoft.com/glosario-sap/abap/edidc-465.html
Registros de control

19M de rows para la db que analicé

Para cada idoc (un MESTYP, IDOCTP, DOCNUM específico) nos dice el estado, cuando se creo y la última vez que se actualizó ese row.

## Columnas
Name    Length  Nullable  Type
ARCKEY  70      NO        NVARCHAR
CIMTYP  30      NO        NVARCHAR
CREDAT  8       NO        NVARCHAR
CRETIM  6       NO        NVARCHAR
DIRECT  1       NO        NVARCHAR
DOCNUM  16      NO        NVARCHAR
DOCREL  4       NO        NVARCHAR
DOCTYP  8       NO        NVARCHAR
EXPRSS  1       NO        NVARCHAR
IDOCTP  30      NO        NVARCHAR
MANDT   3       NO        NVARCHAR
MAXSEG  6       NO        NVARCHAR
MESCOD  3       NO        NVARCHAR
MESFCT  3       NO        NVARCHAR
MESTYP  30      NO        NVARCHAR
OUTMOD  1       NO        NVARCHAR
RCVLAD  70      NO        NVARCHAR
RCVPFC  2       NO        NVARCHAR
RCVPOR  10      NO        NVARCHAR
RCVPRN  10      NO        NVARCHAR
RCVPRT  2       NO        NVARCHAR
RCVSAD  10      NO        NVARCHAR
RCVSCA  3       NO        NVARCHAR
RCVSDF  1       NO        NVARCHAR
RCVSLF  3       NO        NVARCHAR
RCVSMN  3       NO        NVARCHAR
RCVSNA  1       NO        NVARCHAR
REFGRP  14      NO        NVARCHAR
REFINT  14      NO        NVARCHAR
REFMES  14      NO        NVARCHAR
SERIAL  20      NO        NVARCHAR
SNDLAD  70      NO        NVARCHAR
SNDPFC  2       NO        NVARCHAR
SNDPOR  10      NO        NVARCHAR
SNDPRN  10      NO        NVARCHAR
SNDPRT  2       NO        NVARCHAR
SNDSAD  10      NO        NVARCHAR
SNDSCA  3       NO        NVARCHAR
SNDSDF  1       NO        NVARCHAR
SNDSLF  3       NO        NVARCHAR
SNDSMN  3       NO        NVARCHAR
SNDSNA  1       NO        NVARCHAR
STATUS  2       NO        NVARCHAR
STD     1       NO        NVARCHAR
STDMES  6       NO        NVARCHAR
STDVRS  6       NO        NVARCHAR
TEST    1       NO        NVARCHAR
UPDDAT  8       NO        NVARCHAR
UPDTIM  6       NO        NVARCHAR


## Estructura y datos
hdbsql H4T=> SELECT MESTYP,IDOCTP,DOCNUM,STATUS,CREDAT,CRETIM,UPDDAT,UPDTIM FROM SAPABAP1.EDIDC WHERE STATUS='51' order by UPDDAT desc,UPDTIM desc limit 5;
| MESTYP | IDOCTP    | DOCNUM           | ST | CREDAT   | CRETIM | UPDDAT   | UPDTIM |
| ------ | --------- | ---------------- | -- | -------- | ------ | -------- | ------ |
| COND_A | ZCOND_A04 | 0000000072901877 | 51 | 20201211 | 011959 | 20201215 | 103514 |
| COND_A | ZCOND_A04 | 0000000072901892 | 51 | 20201211 | 011959 | 20201215 | 103514 |
| COND_A | ZCOND_A04 | 0000000072901891 | 51 | 20201211 | 011959 | 20201215 | 103514 |
| COND_A | ZCOND_A04 | 0000000072901875 | 51 | 20201211 | 011959 | 20201215 | 103514 |
| COND_A | ZCOND_A04 | 0000000072901887 | 51 | 20201211 | 011959 | 20201215 | 103514 |


Solo hay una entrada para cada MESTYP,IDOCTP,DOCNUM
Comprobado con:
select MESTYP,IDOCTP,DOCNUM,count(*) FROM SAPABAP1.EDIDC group by MESTYP,IDOCTP,DOCNUM,STATUS having count(*) > 1;

Cada MESTYP puede tener varios IDOCTP y cada IDOCTP puede tener varios DOCNUM.

Un DOCNUM solo tieene un MESTYP/IDOCTP
