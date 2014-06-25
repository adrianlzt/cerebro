https://enterprise.github.com/help/articles/moving-a-repository-from-github-com-to-github-enterprise

git clone git@github.com:[owner]/[repo-name].git --bare
cd [repo-name]
git remote add enterprise git@[hostname]:[owner]/[repo-name].git
git push enterprise --mirror



Para mover las issues:
https://github.com/IQAndreas/github-issues-import
