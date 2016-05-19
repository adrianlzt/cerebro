Las yum-utils estan escritas en python y hacen uso de la lib "yum" de python
git clone git://yum.baseurl.org/yum-utils.git

# Basico
sudo python

import yum

class YumBaseQuery(yum.YumBase):
    def __init__(self, pkgops = [], sackops = [], options = None):
        yum.YumBase.__init__(self)

yb = YumBaseQuery()


# Buscar dependencias de un paquete
yum.YumBase.searchPackageProvides(yb, ["*check_uptime.pl"])

Termina en la funcion searchFiles de sqlitesack.py:912

>>> params                                                                                          
[u'/usr/lib64/nagios/plugins', u'%check!_uptime.pl%', '/',u'/usr/lib64/nagios/plugins/check_uptime.pl'] 
>>> query                                                                                           
'select pkgKey from filelist where dirname = ? and filenames LIKE ?  ESCAPE "!" and  length(filetypes) = 1 and dirname || ? || filenames = ?'

Query:
select pkgKey from filelist where dirname = '/usr/lib64/nagios/plugins' and filenames LIKE '%check!_uptime.pl%'  ESCAPE "!" and  length(filetypes) = 1 and dirname || '/' || filenames = '/usr/lib64/nagios/plugins/check_uptime.pl';

De esta query se obtiene el pkgKey que se pasa a esta función para obtener el nombre:
pkg = self._packageByKey(repo, ob['pkgKey'])o

En esta función se utiliza la otra base de datos: primary.xml.sqlite
Y se realiza la query:
SELECT pkgKey, pkgId, name, epoch, version, release, arch FROM packages WHERE pkgKey = 223;

Bug en sqlitesack.py:750
Paso el id 223 y me devuelve el package name dsmctools-commonlinux-memory


## Generacion de las bases de datos sqlite
yumRepo.py:187
def populate(self, repo, mdtype='metadata', callback=None, cacheonly=0):

Aqui es cuando se crea el fichero: sqlitecachec.py:31
Pero esta vacía.

_sqlitecache.update_filelist(location,checksum,self.callback,self.repoid)
esta función (no python) es la que genera el fichero
>>> location                                                                                        
'/var/tmp/yum-adrian-TlcJa4/x86_64/$releasever/yum-dsmc-prod/gen/filelists.xml'
>>> checksum                                                                                        
'67dd2041f82cad9b27cd8b07bb5dc021c4142b44'
>>> self.callback is None                                                                           
True 
>>> self.repoid                                                                                     
'yum-dsmc-prod'

_sqlitecache -> /usr/lib/python2.7/site-packages/_sqlitecache.so
yum-metadata-parser 1.1.4-7

sqlitecache.c:582
py_update_filelist (PyObject *self, PyObject *args)
info.update_info.info_init = update_filelist_info_init;
info.update_info.info_clean = update_filelist_info_clean;
info.update_info.create_tables = yum_db_create_filelist_tables; <- aqui se crean las tablas
info.update_info.write_package = write_filelist_package_to_db;
info.update_info.xml_parse = yum_xml_parse_filelists;
info.update_info.index_tables = yum_db_index_filelist_tables; //crea los index, no es la culpable

return py_update (self, args, (UpdateInfo *) &info);

Esto termina llamando a sqlitecache.c:420
    update_info->xml_parse (md_filename,
                            count_cb,
                            update_package_cb,
                            update_info,
                            err);

xml-parser.c:812
    rc = xmlSAXUserParseFile (&filelist_sax_handler, &ctx, filename);

Este es un parser generico, no puede generar el pkgKey

Trozo que nos interesa del filelist.xml
<package pkgid='984a6355476a30cd35d34c8bde51a7b400bef911' name='dsmctools-commonlinux-uptime' arch='noarch'><version epoch='0' ver='1.1.0' rel='20150813125526.35d1eb6f'/><file type='dir'>/usr/lib/python2.7/site-packages/dsmctools_commonlinux_uptime-1.1.0-py2.7.egg-info</file><file>/usr/lib/python2.7/site-packages/dsmctools_commonlinux_uptime-1.1.0-py2.7.egg-info/PKG-INFO</file><file>/usr/lib/python2.7/site-packages/dsmctools_commonlinux_uptime-1.1.0-py2.7.egg-info/SOURCES.txt</file><file>/usr/lib/python2.7/site-packages/dsmctools_commonlinux_uptime-1.1.0-py2.7.egg-info/dependency_links.txt</file><file>/usr/lib/python2.7/site-packages/dsmctools_commonlinux_uptime-1.1.0-py2.7.egg-info/not-zip-safe</file><file>/usr/lib/python2.7/site-packages/dsmctools_commonlinux_uptime-1.1.0-py2.7.egg-info/requires.txt</file><file>/usr/lib/python2.7/site-packages/dsmctools_commonlinux_uptime-1.1.0-py2.7.egg-info/top_level.txt</file><file>/usr/lib64/nagios/plugins/check_uptime.pl</file></package>


Parece que el que genera el pkgKey es:
        p->pkgKey = sqlite3_last_insert_rowid (db);

sqlite -> src/main.c:902
/*
** Return the ROWID of the most recent insert
*/
sqlite_int64 sqlite3_last_insert_rowid(sqlite3 *db){
#ifdef SQLITE_ENABLE_API_ARMOR
  if( !sqlite3SafetyCheckOk(db) ){
    (void)SQLITE_MISUSE_BKPT;
    return 0;
  }
#endif
  return db->lastRowid;
}


Parece que se van analizando uno a uno y metiendo los ids en orden.
Ver cuando se desvian los ids

El problema es que el orden en el que están metidos los paquetes en primary.xml y filelist.xml no sigue un patrón.
Culpa de artifactory??

Modificar las herramientas de yum para que hagan el mapeo por el pkgId en vez de pkgKey?



///////////// Aqui ya tiene definida pkgKey, solo la esta consultando //////////////////
Busco donde se define pkgKey
db.c:300
        pkgKey = sqlite3_column_int (handle, 1);

Esto parece que coge la segunda columna (la primera seria con 0) de la query que se haya lanzando almacenada en handle

sqlite -> src/vdbeapi.c:1018
int sqlite3_column_int(sqlite3_stmt *pStmt, int i){
  int val = sqlite3_value_int( columnMem(pStmt,i) );
  columnMallocFailure(pStmt);
  return val;
}

/////////// Fin mal camino //////////////////////




De donde saca que el pkgKey=223 debe asignarlo a los ficheros de dsmctools_commonlinux_uptime


En la bbdd filelist:
sqlite> select * from packages where  pkgKey=223;
223|984a6355476a30cd35d34c8bde51a7b400bef911

En la bbdd primary:
sqlite> select name,pkgKey,pkgId from packages where pkgId="984a6355476a30cd35d34c8bde51a7b400bef911";
dsmctools-commonlinux-uptime|221|984a6355476a30cd35d34c8bde51a7b400bef911


# Repos

## Listar
yb.repos.findRepos("*")

for r in yb.repos.findRepos("*"):
  r.name

## Desactivar
for repo in yb.repos.findRepos(repo_match):
    repo.disable()

## Activar
yb.repos.findRepos("yum-dsmc-prod")[0].enable()


# Debug
## Activar debug de Yum
import logging
lll = logging.getLogger("yum.verbose.YumBase")
lll.setLevel(logging.DEBUG)


