https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/6/html/Security-Enhanced_Linux/sect-Security-Enhanced_Linux-Confining_Users-xguest_Kiosk_Mode.html

The xguest package provides a kiosk user account. This account is used to secure machines that people walk up to and use, such as those at libraries, banks, airports, information kiosks, and coffee shops. The kiosk user account is very limited: essentially, it only allows users to log in and use Firefox to browse Internet websites. Any changes made while logged in with this account, such as creating files or changing settings, are lost when you log out.

yum install xguest

You can only log in to this account via the GNOME Display Manager (GDM). Once the xguest package is installed, a Guest account is added to the GDM login screen
