https://developers.google.com/web/fundamentals/performance/webpack/monitor-and-analyze


https://github.com/vuejs-templates/webpack/issues/1297
Si el fichero de vendor es muy grande chequear el culpable con:

npm install
npm run build --report
  esto solo nos dice los ficheros generados y su tamaño.

Si queremos un analisis tip "baobab" del fichero usar:
npm i webpack-cli
npm install --save-dev webpack-bundle-analyzer
node_modules/.bin/webpack --profile --json --config build/webpack.prod.conf.js > stats.json
node_modules/.bin/webpack-bundle-analyzer --host 0.0.0.0 stats.json
