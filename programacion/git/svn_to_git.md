https://docs.gitlab.com/ce/user/project/import/svn.html

gem install svn2git

mkdir mirepo/
cd mirepo
svn2git svn+ssh://10.0.2.3/data/svn/repo/

Hace algo tipo
git svn init --prefix=svn/ --no-metadata --trunk='trunk' --tags='tags' --branches='branches' svn+ssh://10.0.2.3/data/svn/repo/
git remote add origin git://...
git push


Por defecto se espera que el repo svn este organizado tal como:
trunk/
tags/
branches/

Podemos verlo con
svn ls svn+ssh://10.0.2.3/data/svn/repo/

Si por ejemplo queremos copiar todo a partir de la raiz (por porque ejemplo no se han seguido esos esquemas):
svn2git --rootistrunk svn+ssh://10.0.2.3/svn/systems
