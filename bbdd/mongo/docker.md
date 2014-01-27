Instancia para montar mongodb en docker
https://index.docker.io/u/waitingkuo/mongodb/

sudo docker pull  waitingkuo/mongodb
sudo docker run -d -p 27017:27017 -p 28017:28017 -v /path/to/data/db/:/data/db waitingkuo/mongodb
