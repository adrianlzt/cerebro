https://docs.gitlab.com/ce/user/project/import/svn.html

gem install svn2git

svn2git svn+ssh://10.0.2.3/data/svn/repo/

Hace algo tipo
git svn init --prefix=svn/ --no-metadata --trunk='trunk' --tags='tags' --branches='branches' svn+ssh://10.0.2.3/data/svn/repo/

