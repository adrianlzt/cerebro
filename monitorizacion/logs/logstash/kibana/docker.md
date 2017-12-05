https://www.elastic.co/guide/en/kibana/current/_configuring_kibana_on_docker.html
https://www.docker.elastic.co/

docker run --rm -it -p 5601:5601 --link heuristic_mirzakhani:elasticsearch docker.elastic.co/kibana/kibana:5.6.2
docker run -d -p 5601:5601 --link heuristic_mirzakhani:elasticsearch docker.elastic.co/kibana/kibana:6.0.0
