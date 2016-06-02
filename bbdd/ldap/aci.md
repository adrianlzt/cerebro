Las ACI son las reglas que controlan quien puede hacer que sobre que ramas.

Para consultarlas:
ldapsearch -o ldif-wrap=no -x -h SERVER -b ou=Groups,dc=inet -s base aci
