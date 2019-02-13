-- Procedimiento para modificar las interfaces de los hosts que pertenezcan al template 'Template Ping'.
-- Se modificará la interfaz para usar el DNS en vez de la IP.
-- En el DNS se pondrá el nombre del host.

BEGIN;

-- Almacenamos los datos originales para luego poder comparar los cambios
CREATE TEMP TABLE original(kind text, host text, useip int, ip text, dns text);
INSERT INTO original
	SELECT
    'ORIGINAL' as kind,
		hosts.host,
		interface.useip,
		interface.ip,
		interface.dns
	FROM
		hosts_templates,
		hosts,
		interface
	WHERE
		interface.type=1 and  -- interface tipo agent
		not (interface.useip = 0 and interface.dns = hosts.host) and
		interface.hostid=hosts.hostid and
		hosts.hostid=hosts_templates.hostid and
		hosts_templates.templateid = (select hostid from hosts where status=3 and host = 'Template Ping');

-- Actualizamos las interfaces
UPDATE
  interface
SET
  dns = hosts.host,
  useip = 0
FROM
  hosts_templates,
  hosts
WHERE
  interface.type=1 and  -- interface tipo agent
	not (interface.useip = 0 and interface.dns = hosts.host) and
  interface.hostid=hosts.hostid and
  hosts.hostid=hosts_templates.hostid and
  hosts_templates.templateid = (select hostid from hosts where status=3 and host = 'Template Ping')
;

-- Mostramos la tabla original y la modificada
SELECT
  *
FROM
  (
    SELECT
      'MODIFICADA'::text as kind,
      hosts.host,
      interface.useip,
      interface.ip,
      interface.dns
    FROM
      hosts_templates,
      hosts,
      interface
    WHERE
      hosts.host IN (SELECT host FROM original) and
      interface.type=1 and  -- interface tipo agent
      interface.hostid=hosts.hostid and
      hosts.hostid=hosts_templates.hostid and
      hosts_templates.templateid = (select hostid from hosts where status=3 and host = 'Template Ping')
  ) a
FULL OUTER JOIN
  original USING (kind,host,useip,ip,dns)
ORDER BY host,kind
;

-- Deshacemos cambios
ROLLBACK;

-- vim:et
