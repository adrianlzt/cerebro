import { GoogleLogin, GoogleLogout } from 'react-google-login';
Funciona, pero no me da acceso a la api
https://github.com/anthonyjgrove/react-google-login

https://github.com/lourd/react-google-sheet
Funciona, da acceso a google sheets
A veces se queda pillado en "Loading..."
Me funciona si también cargo https://github.com/LucasAndrad/gapi-script-live-example/blob/master/src/components/GoogleLogin.js
  para que ese funcione hay que ponerle al comienzo:
  import 'regenerator-runtime/runtime';
Si no renderizo el GoogleLogin, se queda en Loading
Tal vez tiene que ver con el tema de async/await (porque hace uso de ello)? Que no lo esté cargando si no pongo el GoogleLogin?
He probado a meterlo como import donde llamo a react-google-sheet, pero no me tiraba



GapiAppendComponent
https://github.com/halo8880/gapi-react-component
No me funciona


No probados:

https://github.com/LucasAndrad/gapi-script-live-example/blob/master/src/App.js
https://gist.github.com/mikecrittenden/28fe4877ddabff65f589311fd5f8655c
