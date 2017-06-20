docker stats
utilización por container

El consumo de memoria tiene en cuenta el page cache.
https://github.com/moby/moby/issues/10824
mergeado el 27/4/2017 https://github.com/docker/cli/commit/82600b7021232ecd3c7c77cf18d0f86f5d17f48b#diff-6461907ebcb6301af53f701fc953b949

A partir del merge la memoria es: usage-pagecache


Si queremos estadísticas más detalladas consultar la api: v1.24/containers/f89b0294c3f7/stats
