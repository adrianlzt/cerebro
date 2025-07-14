https://elixir.bootlin.com/linux/v6.15.6/source/mm/vmscan.c

The goal of the "kswapd" is to reclaim pages when memory is running low. In the old days, the "kswapd" was woken every 10 seconds but today it is only wakened by the page allocator, by calling "wakeup_kswapd".

Si no tenemos swap activa, intentará recuperar páginas del buffer/cache.
