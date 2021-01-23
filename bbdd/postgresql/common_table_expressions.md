https://momjian.us/main/writings/pgsql/cte.pdf
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



Ejemplo con talbas de zabbix, donde queremos hacer un outer left join de una lista de hosts obtenidos de una manera, con otra lista de hosts obtenidos por otro método:
WITH hosts_notification
     AS (SELECT hosts.hostid,
                hosts.NAME
         FROM   hosts
                JOIN hosts_groups
                  ON hosts_groups.hostid = hosts.hostid
         WHERE  hosts_groups.groupid = (SELECT groupid
                                        FROM   groups
                                        WHERE  NAME = 'NOTIFICATION')),
     notif_hosts
     AS (SELECT hosts.NAME,
                hosts.hostid,
                Count(*)
         FROM   functions,
                triggers,
                hosts
                JOIN items
                  ON hosts.hostid = items.hostid
         WHERE  functions.triggerid = triggers.triggerid
                AND functions.itemid = items.itemid
                AND triggers.description LIKE '%(NOTIF)'
         GROUP  BY hosts.NAME,
                   hosts.hostid)
SELECT hosts_notification.NAME,
       notif_hosts.count
FROM   hosts_notification
       LEFT OUTER JOIN notif_hosts
                    ON hosts_notification.hostid = notif_hosts.hostid
ORDER  BY count;



Delete a given order, all the items associated with order an dplace order in a historical table:
WITH source (order_id) AS (
  DELETE FROM orders WHERE name = ’my order’ RETURNING order_id
), source2 AS (
  DELETE FROM items USING source WHERE source.order_id = items.order_id
)
INSERT INTO old_orders SELECT order_id FROM source;
