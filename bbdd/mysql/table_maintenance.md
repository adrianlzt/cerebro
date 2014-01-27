http://dev.mysql.com/doc/refman/5.5/en/table-maintenance-sql.html
http://www.tocker.ca/2013/05/02/optimize-check-repair-analyze-table-InnoDB-edition.html

CHECK TABLE command does not really have any practical use for me.
REPAIR TABLE only applies to MyISAM, ARCHIVE, and CSV tables

For InnoDB tables, OPTIMIZE TABLE is mapped to ALTER TABLE, which rebuilds the table to update index statistics and free unused space in the clustered index. Beginning with MySQL 5.1.27, this is displayed in the output of OPTIMIZE TABLE when you run it on an InnoDB table, as shown here:


