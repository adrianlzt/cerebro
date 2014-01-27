http://puppetcookbook.com/posts/simple-syntax-check-manifests.html

puppet parser validate server.pp

find -name '*.pp' | xargs -n 1 -t puppet parser validate
