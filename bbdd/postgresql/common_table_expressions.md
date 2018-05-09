https://di.nmfay.com/postgres-vs-mysql
Common Table Expressions or CTEs allow complex queries to be broken up and assembled from self-contained parts. You might write this:

WITH page_visits AS (
  SELECT p.id, p.site_id, p.title, COUNT(*) AS visits
  FROM pages AS p
  JOIN page_visitors AS v ON v.page_id = p.id
  GROUP BY p.id, p.site_id, p.title
), max_visits AS (
  SELECT DISTINCT ON (site_id)
    site_id, title, visits
  FROM page_visits
  ORDER BY site_id, visits DESC
)
SELECT s.id, s.name,
  max_visits.title AS most_popular_page,
  SUM(page_visits.visits) AS total_visits
FROM sites AS s
JOIN page_visits ON page_visits.site_id = s.id
JOIN max_visits ON max_visits.site_id = s.id
GROUP BY s.id, s.name, max_visits.title
ORDER BY total_visits DESC;
