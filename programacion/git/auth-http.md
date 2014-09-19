http://maymay.net/blog/2008/08/08/how-to-use-http-basic-authentication-with-git/

~/.netrc
machine yourserver.example.com
username your_username
password your_password

testear:
curl --netrc --location -v http://example.com/git/public-repo.git/HEAD
