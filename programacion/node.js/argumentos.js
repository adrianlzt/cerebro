/*
 * argumentos.js
 * Copyright (C) 2016 Adrián López Tejedor <adrianlzt@gmail.com>
 *
 * Distributed under terms of the GNU GPLv3 license.
 */
(function(){
  'use strict';

   // print process.argv
   process.argv.forEach(function (val, index, array) {
     console.log(index + ': ' + val);
   });

   console.log("primer param: " + process.argv[2]);
})();
