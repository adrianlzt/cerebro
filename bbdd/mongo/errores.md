2015-02-16T12:15:28.560+0100 [initandlisten] ERROR: Insufficient free space for journal files
2015-02-16T12:15:28.560+0100 [initandlisten] Please make at least 3379MB available in /var/lib/mongo/journal or use --smallfiles
2015-02-16T12:15:28.560+0100 [initandlisten] 
2015-02-16T12:15:28.560+0100 [initandlisten] exception in initAndListen: 15926 Insufficient free space for journals, terminating


For MongoDb 2.6+ (latest version)

storage:
   smallFiles: true
For MongoDb 2.4 and less

smallfiles = true
Then just execute mongod to accept your config file (here it assumes that location of the config is /etc/mongodb.conf):

mongod -f /etc/mongodb.conf
Documentation for smallfiles parameter:

Set to true to modify MongoDB to use a smaller default data file size. 
Specifically, smallfiles reduces the initial size for data files and
limits them to 512 megabytes. The smallfiles setting also reduces the
size of each journal files from 1 gigabyte to 128 megabytes.

There are some things that you can do to minimize the space that is used, but these tequniques (such as using the --smallfiles option) are usually only recommended for development and testing use - never for production.
