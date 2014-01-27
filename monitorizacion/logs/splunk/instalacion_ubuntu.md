http://docs.splunk.com/Documentation/Splunk/latest/SearchTutorial/Systemrequirements
http://docs.splunk.com/Documentation/Splunk/latest/SearchTutorial/InstallSplunk
http://docs.splunk.com/Documentation/Splunk/latest/SearchTutorial/GetthetutorialdataintoSplunk

dpkg -i splunk-6.0-182037-linux-2.6-amd64.deb
Instala todo en /opt/splunk

cd /opt/splunk/bin
root@quantal:/opt/splunk/bin# ./splunk enable boot-start
 Adding system startup for /etc/init.d/splunk ...

http://ip.addr.ess:8000



Si queremos correr splunk como otro usuario:
root@quantal:/opt/splunk/bin# ./splunk enable boot-start -user splunk
Pero tendremos que cambiar el owner de los ficheros de /opt/splunk. chown -R splunk /opt/splunk ?
