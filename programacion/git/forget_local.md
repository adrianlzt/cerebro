http://stackoverflow.com/questions/9589814/git-force-a-pull-to-overwrite-everything-on-every-pull

git fetch origin master
git reset --hard FETCH_HEAD
git clean -df
