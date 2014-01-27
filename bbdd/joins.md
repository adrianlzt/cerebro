La forma básica es:
SELECT cosa FROM tablaA a, tablaB b WHERE a.id=b.id;

Un ejemplo un poco más complejo:
SELECT 
  hg.hostgroup_name,
  h.host_name,
  htt.template_name 
FROM 
  tbl_lnkHostToHosttemplate htht, 
  tbl_hosttemplate htt, 
  tbl_host h,
  tbl_hostgroup hg,
  tbl_lnkHostToHostgroup hthg
WHERE 
  htht.idSlave = htt.id 
  AND 
  htht.idMaster = h.id 
  AND 
  h.id = hthg.idMaster
  AND
  hthg.idSlave = hg.id
ORDER BY
  hg.hostgroup_name;
