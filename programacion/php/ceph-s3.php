<?php
use Aws\S3\S3Client;
use League\Flysystem\AwsS3v3\AwsS3Adapter;
use League\Flysystem\Filesystem;

include __DIR__ . '/vendor/autoload.php';

$client = new S3Client([
    'endpoint' => 'http://ceph.com',
    'base_url' => 'http://ceph.com',
    'credentials' => [
        'key'    => 'aaaaaaaaaaaaaa',
        'secret' => 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
    ],
    'region' => '',
    'version' => 'latest',
    'use_path_style_endpoint' => true,
]);

$adapter = new AwsS3Adapter($client, 'app');
$filesystem = new Filesystem($adapter);

$contents = $filesystem->read("test2.txt");
echo $contents;
