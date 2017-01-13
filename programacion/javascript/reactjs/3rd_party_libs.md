https://www.fullstackreact.com/articles/how-to-write-a-google-maps-react-component/


# Cargar el javascript de Google Maps
Hacemos uso de este gist, que nos carga dinámicamente la libreria
https://gist.github.com/auser/1d55aa3897f15d17caf21dc39b85b663
Esto no está listo para usar (los nombres a donde apuntan no existen o deben estar en un dir que no existe).
Mejor usar:
https://github.com/fullstackreact/google-maps-react/blob/master/src/GoogleApiComponent.js
https://github.com/fullstackreact/google-maps-react/blob/master/src/lib/GoogleApi.js
https://github.com/fullstackreact/google-maps-react/blob/master/src/lib/ScriptCache.js

Uso:
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GoogleApiComponent from './GoogleApiComponent';

const Container = React.createClass({
    render: function() {
          return <div>Google</div>;
        }
})

export default GoogleApiComponent({
    apiKey: "AIzaSyAQSmXmUodk_rAfJlXv234fYqIyGmSYKmU"
})(Container)

