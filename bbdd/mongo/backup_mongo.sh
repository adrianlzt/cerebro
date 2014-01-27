#!/bin/sh

#
# Small routine to save all mongodb collections on basedatos
#

NOW=$(date +"%Y-%m-%d")
host=`uname -n`
echo "host=$host"

export BASEDATOS_BACKUPDIR=`pwd`/../backups/tmp

mkdir -p $BASEDATOS_BACKUPDIR

COLLECTIONS=$(mongo basedatos --quiet --eval "db.getCollectionNames()" | sed 's/,/ /g')

echo $COLLECTIONS

# Export all collections
for collection in $COLLECTIONS
do
    mongoexport -db basedatos -c $collection > $BASEDATOS_BACKUPDIR/$collection.json
done

tar cfvz $BASEDATOS_BACKUPDIR/../mongodb_json_"${host}"_$NOW.tar.gz $BASEDATOS_BACKUPDIR/*.json

mongodump --db basedatos -o $BASEDATOS_BACKUPDIR/../mongodb_dump_"${host}"_$NOW

rm -rf $BASEDATOS_BACKUPDIR
