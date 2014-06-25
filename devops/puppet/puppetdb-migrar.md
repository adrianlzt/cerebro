http://docs.puppetlabs.com/puppetdb/latest/migrate.html
http://docs.puppetlabs.com/puppetdb/latest/release_notes.html

## Backup ##
sudo puppetdb export --outfile ./my-puppetdb-export.tar.gz
sudo puppetdb import --infile ./my-puppetdb-export.tar.gz

