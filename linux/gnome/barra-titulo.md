http://mikeyshelpdesk.blogspot.com.es/2011/04/gnome-3-massive-title-bar.html

Open a terminal window
sudo cp /usr/share/themes/Adwaita/metacity-1/metacity-theme-3.xml /usr/share/themes/Adwaita/metacity-1/metacity-theme-3.xml.orig
sudo sed -i "/title_vertical_pad/s/value=\"[0-9]\{1,2\}\"/value=\"0\"/g" /usr/share/themes/Adwaita/metacity-1/metacity-theme-3.xml
Close terminal window
Hit ALT-F2
type restart 
enter

