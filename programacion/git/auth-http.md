http://maymay.net/blog/2008/08/08/how-to-use-http-basic-authentication-with-git/

~/.netrc
machine yourserver.example.com
login your_username
password your_password


Para evitar que chequee el certificado ssl
GIT_SSL_NO_VERIFY=true git clone https://user:pass@github.com/nombre/repo.git
