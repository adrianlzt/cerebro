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
  echo "${COMMIT_MSG}" | grep "para hacer commit" >& /dev/null
  if [[ $? -eq 1 ]]; then
    # Error comiteando
    echo "${COMMIT_MSG}"
    exit 1
  else
    echo "${COMMIT_MSG}" | grep "git push" >& /dev/null
    if [[ $? -eq 1 ]]; then
      exit 0
    else
      /usr/bin/git push
      exit 0
    fi
  fi
fi

