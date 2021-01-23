https://postgresql.verite.pro/blog/2018/06/19/crosstab-pivot.html

SELECT
  y,
  (CASE WHEN x='value 1' THEN v END) "value 1",
  (CASE WHEN x='value 2' THEN v END) "value 2",
  ...repeated for each x transposed into into a column
  FROM table or subquery
  [ORDER BY 1]


SELECT
  city,
  SUM(raindays) FILTER (WHERE year=2012) AS "2012",
  SUM(raindays) FILTER (WHERE year=2013) AS "2013",
  SUM(raindays) FILTER (WHERE year=2014) AS "2014",
  SUM(raindays) FILTER (WHERE year=2015) AS "2015",
  SUM(raindays) FILTER (WHERE year=2016) AS "2016",
  SUM(raindays) FILTER (WHERE year=2017) AS "2017"
FROM rainfall
GROUP BY city
ORDER BY city;
