Cuando está importando imágenes veo esto:

20322 ?        Ssl    0:32 /usr/bin/python /usr/bin/twistd --nodaemon --uid=maas --gid=maas --pidfile=/run/maas-cluster.pid --logfile=/dev/null maas-pserv --config-file=/etc/maas/pserv.yaml
20462 ?        S      0:00  \_ sudo /usr/bin/uec2roottar --user=maas /var/lib/maas/boot-resources/cache/root-image-79b4bc5a7ab03a26a91ce3c7081f5054421960f878a93223b58f0c88259c07e0 /var/lib/maas/boot-resources/cache/root-tgz-79b4bc5a7ab03a26a91ce3c7081f5054421960f878a93223b58f0c88259c07e0
20463 ?        S      0:00      \_ /usr/bin/python2.7 /usr/bin/uec2roottar --user=maas /var/lib/maas/boot-resources/cache/root-image-79b4bc5a7ab03a26a91ce3c7081f5054421960f878a93223b58f0c88259c07e0 /var/lib/maas/boot-resources/cache/root-tgz-79b4bc5a7ab03a26a91ce3c7081f5054421960f878a93223b58f0c88259c07e0
20471 ?        S      0:08          \_ tar -C /tmp/maas-VKDwn6 -cpSzf /var/lib/maas/boot-resources/cache/root-tgz-79b4bc5a7ab03a26a91ce3c7081f5054421960f878a93223b58f0c88259c07e0 --numeric-owner .
20472 ?        R      1:03              \_ gzip

