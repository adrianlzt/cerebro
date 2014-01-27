http://mobz.github.io/elasticsearch-head/

elasticsearch-head is a web front end for browsing and interacting with an Elastic Search cluster.


es-head has a three major operations.

A ClusterOverview, which shows the topology of your cluster and allows you to perform index and node level operations
A couple of search interfaces that allow you to query the cluster a retrieve results in raw json or tabular format
Several quick access tabs that show the status of the cluster
An input section that allows arbitrary call to the RESTful API to be made. This interface includes several options that can be combined to produce interesting results
  Select request method (get, put, post, delete), json query data, node, and path
  JSON validator
  Ability to repeat requests on a timer
  Ability to transform the result using javascript expressions
  Ability to collect results over time (using timer), or compare results
  Ability to chart the transformed results in a simple bar graph (including time series)

*CAUTION*, you can destroy and corrupt data from this interface if you are not careful
