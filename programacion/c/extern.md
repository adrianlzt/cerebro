https://es.wikipedia.org/wiki/Variable_externa

Se hace para "coger prestada" una variable de otro fichero:

moduloA.c:
int variable;

moduloB.c:
extern int variable;


Debe protegerse el acceso mediante semáforos.
