Imagen gratuita en docker hub

https://hub.docker.com/_/sap-hana-express-edition/plans/f2dc436a-d851-4c22-a2ba-9de07db7a9ac?tab=instructions



mkdir mnt

➜ cat mnt/password.json
{
"master_password" : "HXEHana1"
}

sudo chown -R 12000:79 mnt


docker run -h hana --name hana --rm -it -p 39013:39013 -p 39017:39017 -p 39041-39045:39041-39045 -p 1128-1129:1128-1129 -p 59013-59014:59013-59014 \
  -v $PWD/mnt:/hana/mounts \
store/saplabs/hanaexpress:2.00.045.00.20200121.1 \
--passwords-url file:///hana/mounts/password.json \
--agree-to-sap-license


Conectar:
docker exec -it hana bash
hdbsql -u SYSTEM -p HXEHana1 -n localhost:39017 -mA
