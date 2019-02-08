AWS Lambda - https://aws.amazon.com/es/lambda/
"AWS Lambda can trigger compute functions such as creating thumbnails when new images are added to Amazon S3, running sophisticated calculations on data after it is loaded into Amazon DynamoDB, or perform watermarking or compression when new documents are uploaded to Amazon S3."


Leido en un comentario de hacker news:
serverless lambda is a terrible idea:

1. lock in to a specific platform with limited visibility tools and a dependency on a 3rd party when shit doesn't work
2. when functions change you run into function incompatibility chaos and no smart way to handle that mess
3. the "scalability" win is a lie, it's just deferred to whatever data storage service you are using - which ends up blowing up because while serverless scales, the db doesn't
4. addendum to 3, the statelessness of lambda means you can not use local caches to increase your throughput - increasing your hardware requirement
