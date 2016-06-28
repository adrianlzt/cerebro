/*
Environment sera pre o prod
old_proj es el nombre del proyecto que ya existe
new_proj es el nombre del nuevo proyecto
como user postgres
psql monitoring -f copiar_entorno.sql -v env="'prod'" -v old_proj="'UNO'" -v new_proj="'DOS'"

ID del entorno
SELECT id FROM environments WHERE name = :env;

ID de proyecto existente
SELECT id FROM projects WHERE name = :old_proj;

ID del nuevo proyecto
SELECT id FROM projects WHERE name = :new_proj;
*/

\set ON_ERROR_STOP on

-- Chequeamos que los argumentos son correctos
CREATE OR REPLACE FUNCTION check_args(IN env TEXT, IN old_proj TEXT, IN new_proj TEXT) RETURNS text AS
$$
  import plpy
  if env != "pre" and env != "prod":
    raise Exception("env debe ser \"'pre'\" o \"'prod'\"")

  if len(plpy.execute("SELECT * FROM projects WHERE name = '%s'" % old_proj)) == 0:
    raise Exception("El proyecto %s no existe" % old_proj)

  if len(plpy.execute("SELECT * FROM projects WHERE name = '%s'" % new_proj)) > 0:
    raise Exception("El proyecto %s ya existe" % new_proj)
$$
LANGUAGE 'plpythonu' VOLATILE;

select check_args(:env, :old_proj, :new_proj);



-- Creamos el nuevo proyecto
INSERT INTO projects(name, description, created_at, updated_at) VALUES(:new_proj, :new_proj, now(), now());

-- Copiamos los hostgroups del antiguo proyecto al nuevo proyecto
INSERT INTO host_groups(name,created_at,updated_at,environment_id,project_id) SELECT name,now(),now(),environment_id,(SELECT id FROM projects WHERE name = :new_proj) as project_id from host_groups where environment_id=(SELECT id FROM environments WHERE name = :env) AND project_id = (SELECT id FROM projects WHERE name = :old_proj);

-- Copiamos los hosts del antiguo proyecto al nuevo proyecto
INSERT INTO hosts(hostname,created_at,updated_at,environment_id,project_id) select hostname,now(),now(),environment_id,(SELECT id FROM projects WHERE name = :new_proj) as project_id from hosts where environment_id=(SELECT id FROM environments WHERE name = :env) AND project_id = (SELECT id FROM projects WHERE name = :old_proj);

-- Copiamos las vips del antiguo proyecto al nuevo proyecto
INSERT INTO vips(name,ip,created_at,updated_at,environment_id,project_id) select name,ip,now(),now(),environment_id,(SELECT id FROM projects WHERE name = :new_proj) as project_id from vips where environment_id=(SELECT id FROM environments WHERE name = :env) AND project_id = (SELECT id FROM projects WHERE name = :old_proj);




-- Copiamos los services de cada hostgroup del proyecto antiguo a los hostgroups del mismo nombre del proyecto nuevo
CREATE OR REPLACE FUNCTION copy_hostgroups(env TEXT, old_proj TEXT, new_proj TEXT) RETURNS text AS
$$
import plpy
plpy.notice("copy_hostgroups(%s,%s,%s)" % (env, old_proj, new_proj))
output = "ok"

hgs = plpy.execute("SELECT name FROM host_groups WHERE environment_id=(SELECT id FROM environments WHERE name = '%s') AND project_id = (SELECT id FROM projects WHERE name = '%s');" % (env,old_proj))
plpy.notice("Numero de hostgroups %s" % hgs.nrows())

for i in hgs:
  oldhgs = plpy.execute("SELECT id FROM host_groups WHERE project_id = (SELECT id FROM projects WHERE name = '%s') AND name = '%s' AND environment_id=(SELECT id FROM environments WHERE name = '%s')" % (old_proj,i["name"], env))
  plpy.notice("ID del viejo hostgroup: %s" % oldhgs[0]["id"])

  newhgs = plpy.execute("SELECT id FROM host_groups WHERE project_id = (SELECT id FROM projects WHERE name = '%s') AND name = '%s' AND environment_id=(SELECT id FROM environments WHERE name = '%s')" % (new_proj,i["name"],env))
  plpy.notice("ID del nuevo hostgroup: %s" % newhgs[0]["id"])

  update = plpy.execute("INSERT INTO services(check_id,name,created_at,updated_at,params,host_id,environment_id,vip_id,initial_state,max_check_attempts,retry_interval,check_interval,active_checks_enabled,passive_checks_enabled,check_freshness,freshness_threshold,obsess_over_service,retain_status_information,retain_nonstatus_information,is_volatile,sudo,command_id,args,eventhandler_id,host_group_id) SELECT check_id,name,created_at,updated_at,params,host_id,environment_id,vip_id,initial_state,max_check_attempts,retry_interval,check_interval,active_checks_enabled,passive_checks_enabled,check_freshness,freshness_threshold,obsess_over_service,retain_status_information,retain_nonstatus_information,is_volatile,sudo,command_id,args,eventhandler_id,%s as host_group_id from services where host_group_id = %s;" % (newhgs[0]["id"],oldhgs[0]["id"]))
  plpy.notice("Update result (%s): %s" % (update.status(), update.nrows()))

return output
$$
LANGUAGE 'plpythonu' VOLATILE;

SELECT copy_hostgroups(:env, :old_proj, :new_proj);




-- Copiamos los services de cada host del proyecto antiguo a los hosts del mismo nombre del proyecto nuevo
CREATE OR REPLACE FUNCTION copy_hosts(env TEXT, old_proj TEXT, new_proj TEXT) RETURNS text AS
$$
import plpy
plpy.notice("copy_hosts(%s,%s,%s)" % (env, old_proj, new_proj))
output = "ok"

hgs = plpy.execute("SELECT hostname FROM hosts WHERE environment_id=(SELECT id FROM environments WHERE name = '%s') AND project_id = (SELECT id FROM projects WHERE name = '%s');" % (env, old_proj))
plpy.notice("Numero de hosts %s" % hgs.nrows())

for i in hgs:
  oldhgs = plpy.execute("SELECT id FROM hosts WHERE project_id = (SELECT id FROM projects WHERE name = '%s') AND hostname = '%s' AND environment_id=(SELECT id FROM environments WHERE name = '%s')" % (old_proj,i["hostname"],env))
  plpy.notice("ID del viejo host: %s" % oldhgs[0]["id"])

  newhgs = plpy.execute("SELECT id FROM hosts WHERE project_id = (SELECT id FROM projects WHERE name = '%s') AND hostname = '%s' AND environment_id=(SELECT id FROM environments WHERE name = '%s')" % (new_proj,i["hostname"],env))
  plpy.notice("ID del nuevo host: %s" % newhgs[0]["id"])
  update = plpy.execute("INSERT INTO services(check_id,name,created_at,updated_at,params,environment_id,vip_id,initial_state,max_check_attempts,retry_interval,check_interval,active_checks_enabled,passive_checks_enabled,check_freshness,freshness_threshold,obsess_over_service,retain_status_information,retain_nonstatus_information,is_volatile,sudo,command_id,args,eventhandler_id,host_id) SELECT check_id,name,created_at,updated_at,params,environment_id,vip_id,initial_state,max_check_attempts,retry_interval,check_interval,active_checks_enabled,passive_checks_enabled,check_freshness,freshness_threshold,obsess_over_service,retain_status_information,retain_nonstatus_information,is_volatile,sudo,command_id,args,eventhandler_id,%s as host_id FROM services WHERE host_id = %s;" % (newhgs[0]["id"],oldhgs[0]["id"]))
  plpy.notice("Update result (%s): %s" % (update.status(), update.nrows()))

return output
$$
LANGUAGE 'plpythonu' VOLATILE;

SELECT copy_hosts(:env, :old_proj, :new_proj);




-- Copiamos los services de cada vip del proyecto antiguo a los vips del mismo nombre del proyecto nuevo
CREATE OR REPLACE FUNCTION copy_vips(env TEXT, old_proj TEXT, new_proj TEXT) RETURNS text AS
$$
import plpy
plpy.notice("copy_vips(%s,%s,%s)" % (env, old_proj, new_proj))

output = "ok"
hgs = plpy.execute("SELECT name FROM vips WHERE environment_id=(SELECT id FROM environments WHERE name = '%s') AND project_id = (SELECT id FROM projects WHERE name = '%s');" % (env, old_proj))
plpy.notice("Numero de vips %s" % hgs.nrows())

for i in hgs:
  oldhgs = plpy.execute("SELECT id FROM vips WHERE project_id = (SELECT id FROM projects WHERE name = '%s') AND name = '%s' AND environment_id=(SELECT id FROM environments WHERE name = '%s')" % (old_proj, i["name"], env))
  plpy.notice("ID de la vieja vip: %s" % oldhgs[0]["id"])

  newhgs = plpy.execute("SELECT id FROM vips WHERE project_id = (SELECT id FROM projects WHERE name = '%s') AND name = '%s' AND environment_id=(SELECT id FROM environments WHERE name = '%s')" % (new_proj,i["name"],env))
  plpy.notice("ID de la nueva vip: %s" % newhgs[0]["id"])

  update = plpy.execute("INSERT INTO services(check_id,name,created_at,updated_at,params,environment_id,initial_state,max_check_attempts,retry_interval,check_interval,active_checks_enabled,passive_checks_enabled,check_freshness,freshness_threshold,obsess_over_service,retain_status_information,retain_nonstatus_information,is_volatile,sudo,command_id,args,eventhandler_id,vip_id) SELECT check_id,name,created_at,updated_at,params,environment_id,initial_state,max_check_attempts,retry_interval,check_interval,active_checks_enabled,passive_checks_enabled,check_freshness,freshness_threshold,obsess_over_service,retain_status_information,retain_nonstatus_information,is_volatile,sudo,command_id,args,eventhandler_id,%s as vip_id FROM services WHERE vip_id = %s;" % (newhgs[0]["id"],oldhgs[0]["id"]))
  plpy.notice("Update result (%s): %s" % (update.status(), update.nrows()))

return output
$$
LANGUAGE 'plpythonu' VOLATILE;

SELECT copy_vips(:env, :old_proj, :new_proj);
