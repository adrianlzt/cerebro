import GoogleApiComponent from './GoogleApiComponent';

Del fichero, en el mismo directorio, GoogleApiComponent.js, importa el componente "GoogleApiComponent"


https://medium.com/@thejasonfile/a-simple-intro-to-javascript-imports-and-exports-389dd53c3fac

//App.js
import React, {Component} from 'react';
import './App.css';
import {Color, Animal} from './Shapes';
...
export default App;
//Shapes.js
import React, {Component} from 'react';
export class Color extends Component {...
export class Animal extends Component {...


const Validator = require("validator");
Equivalente a
import Validator from "validator";
