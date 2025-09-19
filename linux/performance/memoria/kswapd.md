<https://elixir.bootlin.com/linux/v6.15.6/source/mm/vmscan.c>

The goal of the "kswapd" is to reclaim pages when memory is running low. In the old days, the "kswapd" was woken every 10 seconds but today it is only wakened by the page allocator, by calling "wakeup_kswapd".

Si no tenemos swap activa, intentará recuperar páginas del buffer/cache.

/proc/vmstat

pgsteal_kswapd: Number of pages reclaimed by kswapd.
pgscan_kswapd: Number of pages scanned by kswapd.

A low ratio of pgsteal_kswapd to pgscan_kswapd (e.g., less than 0.3) can indicate kswapd is struggling to find reclaimable pages, leading to high CPU usage without much memory being freed

Un ratio bajo quiere decir que kswapd necesita escanear muchas páginas para "robar" una.
