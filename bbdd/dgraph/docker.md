mkdir -p data/{export,p,w,zw}
sudo podman run --rm -it -p 8000:8000 -p 8080:8080 -p 9080:9080 -p 5080:5080 -v "$PWD/data/export:/dgraph/export" -v "$PWD/data/p:/dgraph/p" -v "$PWD/data/w:/dgraph/w" -v "$PWD/data/zw:/dgraph/zw" dgraph/standalone:v2.0.0-beta1

Ejecuta ratel, dgraph zero y dgraph alpha

http://localhost:8000
ratel, la interfaz gráfica

Alpha
7080 internal
8080 HTTP
9080 gRPC

Zero
5080 gRPC
6080 HTTP
