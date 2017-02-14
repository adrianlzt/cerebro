http://epochjs.github.io/

A general purpose real-time charting library for building beautiful, smooth, and high performance visualizations.


# Ejemplo
npm install epoch-charting

vi index.html
<html>
  <head>
        <meta charset="utf-8" />
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
        <script src="node_modules/d3/d3.min.js"></script>
        <script src="node_modules/epoch-charting/dist/js/epoch.min.js"></script>
        <link rel="stylesheet" type="text/css" href="node_modules/epoch-charting/dist/css/epoch.min.css">
        <title>Index</title>
  </head>
  <body>
    <div id="area" class="epoch category10" style="height: 200px;"></div>
    <script>
      var data = [
        { label: 'Layer 1', values: [ {x: 0, y: 0}, {x: 1, y: 1}, {x: 2, y: 2} ] },
        { label: 'Layer 2', values: [ {x: 0, y: 0}, {x: 1, y: 1}, {x: 2, y: 4} ] }
      ];
      var areaChartInstance = $('#area').epoch({
        type: 'area',
        data: data,
        axes: ['left', 'right', 'bottom']
      });
    </script>
  </body>
</html>


Ejemplos: http://stackoverflow.com/questions/28072443/trying-to-use-epoch-charts-by-fastly-cant-even-follow-the-tutorial

