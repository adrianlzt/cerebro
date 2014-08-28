http://garylarizza.com/blog/2014/03/26/random-r10k-workflow-ideas/

Los environments deben usarse para probar nuevas versiones de nuestro código puppet.

Los tiers son conjuntos de máquinas que pertenecen a pre,qa,prod, etc.

Una máquina pertenecerá toda su vida a un tier y generalmente a un environment. Pero podrá cambiar temporalmente de environment para probar el nuevo código, para luego volver al environment original.
