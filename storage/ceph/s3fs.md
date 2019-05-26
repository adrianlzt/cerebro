https://github.com/s3fs-fuse/s3fs-fuse
Montar S3/rados como un sistema de ficheros FUSE

echo ACCESS_KEY_ID:SECRET_ACCESS_KEY > passwd
chmod 600 passwd
mkdir mnt
s3fs mybucket mnt -o passwd_file=passwd -o url=https://url.to.s3/ -o use_path_request_style

