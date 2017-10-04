https://www.elastic.co/guide/en/elasticsearch/reference/5.6/search-request-sort.html

{
  "sort": [{"@timestamp": "desc"}]
}

{
    "sort" : [
        { "post_date" : {"order" : "asc"}},
        "user",
        { "name" : "desc" },
        { "age" : "desc" },
        "_score"
    ],
    ...
}
