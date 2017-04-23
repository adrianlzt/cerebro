<?php
//
// Podemos ejecutarlo con este container
// https://hub.docker.com/r/imshashank/aws-sdk-php/
// Mas ejemplos: http://docs.aws.amazon.com/aws-sdk-php/v3/guide/examples/s3-examples-creating-buckets.html
// https://github.com/awsdocs/aws-doc-sdk-examples/tree/master/php/example_code/s3
//
// API: http://docs.aws.amazon.com/aws-sdk-php/v3/api/api-s3-2006-03-01.html
//
define('AWS_KEY', 'QO2K1W2H5KBXQNU378EA');
define('AWS_SECRET_KEY', 'WmylYB50xNPIOeMVhBoVfc0a5fRjxOp7Qpn6MdXW');
$HOST = 'http://store-2:7480';

require 'vendor/autoload.php';
use Aws\S3\S3Client;

// Instantiate an Amazon S3 client.
$s3Client = new S3Client([
    'endpoint' => $HOST,
    'version' => "2006-03-01",
    'region' => 'none',
    'credentials' => [
      'key'    => AWS_KEY,
      'secret' => AWS_SECRET_KEY
    ]
]);

//Listing all S3 Bucket
$buckets = $s3Client->listBuckets();
foreach ($buckets['Buckets'] as $bucket){
    echo $bucket['Name']."\n";
}
?>
