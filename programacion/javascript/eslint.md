Ignorar fallos:

En JS, en la primera linea para todo el fichero:
/* eslint-disable camelcase */


TypeScript with enabled @typescript-eslint plugin
/* eslint-disable @typescript-eslint/camelcase */

Con ponerlo una vez desactiva en todo el fichero.
Podemos ponerlo al comienzo del fichero



For the next line:
// eslint-disable-next-line no-return-assign, no-param-reassign
( your code... )

For this line:
( your code... ) // eslint-disable-line no-return-assign, no-param-reassign

Or alternatively for an entire code block (note that this only works with multi-line comment syntax):
/* eslint-disable no-return-assign, no-param-reassign */
( your code... )
/* eslint-enable no-return-assign, no-param-reassign */
