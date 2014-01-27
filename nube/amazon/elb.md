Elastic Load Balancing
http://aws.amazon.com/elasticloadbalancing/

ELB only works for requests coming in from the public Internet - it cannot be used for internal requests, unless you route your requests out to the public address of the ELB and then pay for all the traffic. Second, ELB is a very simple balancer - you can't apply any rules or patterns to how it works and you can't have stand-by servers
