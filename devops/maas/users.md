Se almacenan en la postgresql:
su -c "psql maasdb" postgres
maasdb=# select * from auth_user;



http://askubuntu.com/questions/120436/how-do-i-reset-my-maas-username-password
Para cambiar la password, en el region admin:

maas-region-admin changepassword <user>
