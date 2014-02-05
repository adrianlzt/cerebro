"Rapid schema development with PostgreeSQL" Andrew Godwin (Eventbrite)

COMMENTS: I did not like at all. It is like use a SQL database as NoSQL and moving code from client to DB.
to be more flexible on schemas, use complex data in columns and make it schemaless
hstore: key value store as a column type
json: structured JSON as a column type
and use embedded languages (python and js are the most maintained) in DB instead of on client.
schema vs schemaless
schema: faster querying, data integrity, slightly too easy to JOIN
schemaless: faster prototyping, cleaner for sparse data, encourages messy code
Recommendation: hybrid schemas

https://speakerdeck.com/andrewgodwin/rapid-schema-development-with-postgresql
