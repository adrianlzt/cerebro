https://influxdb.com/docs/v0.9/administration/authentication_and_authorization.html#set-up-authentication

By default, authentication is disabled in the configuration file. Enable authentication by setting the auth-enabled option to true in the [http] section of the configuration file:

[http]  
enabled = true  
bind-address = ":8086"  
auth-enabled = true # ✨
log-enabled = true  
write-tracing = false  
pprof-enabled = false  
https-enabled = false  
https-certificate = "/etc/ssl/influxdb.pem"  
