#!/bin/bash
#
# go-cd-add_pipeline.sh
# Copyright (C) 2017 Adrián López Tejedor <adrianlzt@gmail.com>
#
# Distributed under terms of the GNU GPLv3 license.
#
# Le pasamos un nombre y crea una nueva pipeline en el grupo "DEV" apuntando a un repo de git en server.inet, organizacion tools (nombre del repo es el parametro)
# La pipeline usara el template "python_rpm"
#

NOMBRE=$1

cd /etc/go

xmlstarlet ed -s "/cruise/pipelines[@group='DEV']" -t elem -n "pipeline" -v "" cruise-config.xml | xmlstarlet ed -s '/cruise/pipelines[@group="DEV"]/pipeline[not(@name)]' -t attr -n name -v "$NOMBRE" | xmlstarlet ed -s "/cruise/pipelines[@group=\"DEV\"]/pipeline[@name=\"$NOMBRE\"]" -t attr -n template -v "python_rpm" | xmlstarlet ed -s "/cruise/pipelines[@group=\"DEV\"]/pipeline[@name=\"$NOMBRE\"]" -t elem -n materials -v '' | xmlstarlet ed -s "/cruise/pipelines[@group=\"DEV\"]/pipeline[@name=\"$NOMBRE\"]/materials" -t elem -n git -v "" | xmlstarlet ed -s "/cruise/pipelines[@group=\"DEV\"]/pipeline[@name=\"$NOMBRE\"]/materials/git" -t attr -n url -v "git@server.inet:tools/$NOMBRE.git" | xmlstarlet ed -s "/cruise/pipelines[@group=\"DEV\"]/pipeline[@name=\"$NOMBRE\"]/materials/git" -t attr -n branch -v "develop" | xmlstarlet ed -s "//environment[@name='DEV']/pipelines" -t elem -n pipeline -v '' | xmlstarlet ed -s "//environment[@name='DEV']/pipelines/pipeline[not(@name)]" -t attr -n name -v "$NOMBRE" > cruise-config.xml.new

mv cruise-config.xml.new cruise-config.xml
chown go:go cruise-config.xml
chmod 600 cruise-config.xml

git add cruise-config.xml
git commit -m "New project $NOMBRE"

