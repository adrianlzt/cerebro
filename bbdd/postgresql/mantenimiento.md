Firstly, set pg_hba.conf (by commenting client connection entries or setting method=reject) so that connections cannot be made to the database whilst under maintenance. Don’t forget to change it back when everything is back to normal.

