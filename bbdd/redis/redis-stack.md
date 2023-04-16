https://redis.io/docs/stack/
Redis con una serie de plugins para:
 Search
 JSON
 Graph
 TimeSeries
 Bloom

Licencia SSPL (evita proveedores cloud)

# Docker
docker run -d --name redis-stack-server -v $PWD/redis:/data -p 8001:8001 -p 6379:6379 redis/redis-stack:latest
