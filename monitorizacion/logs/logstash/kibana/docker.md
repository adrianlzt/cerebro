https://www.elastic.co/guide/en/kibana/current/_configuring_kibana_on_docker.html

docker run --rm -it -P 5601:5601 --link heuristic_mirzakhani:elasticsearch docker.elastic.co/kibana/kibana:5.6.2 
