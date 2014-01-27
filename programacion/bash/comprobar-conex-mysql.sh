#!/bin/bash

if [[ $(mysql --user=nagiosql --password=nagios --host=10.6.6.9 -e 'show databases;') ]]; then
        echo "conectado"
else
	echo "NO conectado"
fi

