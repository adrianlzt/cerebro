If you plan to use .htaccess files, you will need to have a server configuration that permits putting authentication directives in these files. This is done with the AllowOverride directive, which specifies which directives, if any, may be put in per-directory configuration files.

Eg.:
AllowOverride AuthConfig

