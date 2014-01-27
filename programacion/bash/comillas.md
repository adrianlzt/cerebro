target='test'
mysql -e "INSERT INTO nagiosql.tbl_configtarget (target) VALUES(\"$target\");"
