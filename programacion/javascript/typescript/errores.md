TS7016: Could not find a declaration file for module 'react-websocket'. '/xxx/node_modules/react-websocket/build/index.js' implicitly has an 'any' type.

https://www.detroitlabs.com/blog/2018/02/28/adding-custom-type-definitions-to-a-third-party-library/

Editar tsconfig.json
{
     "compilerOptions": {
         ...
         "typeRoots": [ "./types", "./node_modules/@types"]
      }
}
