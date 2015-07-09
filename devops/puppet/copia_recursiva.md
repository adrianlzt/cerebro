https://docs.puppetlabs.com/guides/techniques.html#how-can-i-manage-whole-directories-of-files-without-explicitly-listing-the-files

file { "/etc/httpd/conf.d":
  source  => "puppet://server/vol/mnt1/adm/httpd/conf.d",
  recurse => true,
}

