#! /bin/sh
#
# autocommit.sh
# Copyright (C) 2019 Adrián López Tejedor <adrianlzt@gmail.com>
#
# Distributed under terms of the GNU GPLv3 license.
#


/usr/bin/git add *
COMMIT_MSG=$(/usr/bin/git commit -a -m "Auto save")
if [[ $? -eq 1 ]]; then
  echo "${COMMIT_MSG}" | grep "nada para hacer commit" >& /dev/null
  if [[ $? -eq 1 ]]; then
    # Error comiteando
    echo "${COMMIT_MSG}"
    exit 1
  else
    # Nada que comitear, ignoramos el push
    exit 0
  fi
fi

/usr/bin/git push
