Ingest nodes provide the ability to pre-process a document right before it gets indexed
  an ingest node intercepts an index or bulk API request
  applies transformations
  passes the documents back to the index or bulk API

Por defecto todos los nodos son capaces de hacer ingestion (si queremos evitarlo node.ingest:false)


# Pipeline
A pipeline is a set of processors
  a processor is similar to a filter in Logstash
  has read and write access to documents that pass through the pipeline

PUT _ingest/pipeline/my-pipeline-id {
  "description": "DESCRIPTION",
  "processors": [
    {
      ...
    }
  ],
  "on_failure": [
    {
      ...
    }
  ]
}

## Processors
https://www.elastic.co/guide/en/elasticsearch/reference/current/ingest-processors.html

### set
PUT _ingest/pipeline/my_pipeline {
  "processors": [
    {
      "set": {
        "field": "number_of_views",
        "value": 0
      }
    }
  ]
}

### split
PUT _ingest/pipeline/blogs_pipeline{
  "processors": [
    {
      "split": {
        "field": "locales",
        "separator": ","
      }
    }
  ]
}

### script
PUT _ingest/pipeline/blogs_pipeline{
  "processors": [
    {
      "split": {
        "field": "locales",
        "separator": ","
      }
    },
    {
      "script": {
        "source": """ if(ctx.containsKey("content")) {  ctx.content_length = ctx.content.length(); } else {  ctx.content_length = 0; } """
      }
    }
  ]
}


Modificar el índice destino según un campo:
"processors": [
  {
    "script": {
      "source": "ctx._index=ctx.clientip.country_iso_code.toLowerCase()"
    }
  }
]


# Pasar un indice por una pipeline
POST blogs_fixed/_update_by_query?pipeline=blogs_pipeline


# Testear una pipeline
POST _ingest/pipeline/fix_seo_title/_simulate
{
  "docs": [
    {
      "_source": {
        "title": "Where in the World is Elastic? - Elastic{ON}Tour London & Paris",
        "seo_title": ""
      }
    },
    {
      "_source": {
        "title": "This week in Elasticsearch and Apache Lucene",
        "seo_title": "What's new in Elasticsearch and Apache Lucene"
      }
    }
  ]
}
