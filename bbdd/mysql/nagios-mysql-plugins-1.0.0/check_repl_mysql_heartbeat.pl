#!/usr/bin/perl

# http://nagios.sourceforge.net/docs/3_0/embeddedperl.html
# nagios: -epn

# (C) 2006-2015 by Oli Sennhauser <oli.sennhauser@fromdual.com>
# FromDual: Neutral and vendor independent consulting for MySQL,
# MariaDB and Percona Server www.fromdual.com
#
# This program is free software; you can redistribute it and/or modify it
# under the terms of the GNU General Public License as published by
# the Free Software Foundation; version 2 of the License.
#
# This program is distributed in the hope that it will be useful, but
# WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
# General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program; if not, write to the Free Software
# Foundation, Inc., 51 Franklin Street - Fifth Floor, Boston, MA
# 02110-1301, USA.

use strict;
use warnings "all";

use DBI;
use Getopt::Long;
use File::Basename;

my $lMyName = basename($0);

my %lError = (
  'OK'       => 0
, 'Warning'  => 1
, 'Critical' => 2
, 'Unknown'  => 3
);

my $pHelp               = 0;
my $pMasterUser         = 'check_db';
my $pMasterPassword     = '';
my $pMasterHost         = 'localhost';
my $pMasterPort         = '3306';
my $pSlaveUser          = 'check_db';
my $pSlavePassword      = '';
my $pSlaveHost          = 'localhost';
my $pSlavePort          = '3306';
my $pHeartbeatSchema    = 'test';
my $pHeartbeatTable     = 'heartbeat';
my $pHeartbeatBeatField = 'beat';
my $pHeartbeatIdField   = 'id';
my $pHeartbeatId        = 1;
my $pWarning            = 4;
my $pCritical           = 16;

sub Usage
{
	print <<EOF;

SYNOPSIS

  $lMyName flags parameters

DESCRIPTION

  Nagios/Icinga plugin to find differences in heartbeat for MySQL Master/Slave
  replication...

  For security reasons use a user with as little privileges as possible. For
  example a user called $pMasterUser:

  On Master:
  GRANT SELECT ON `$pHeartbeatSchema`.`$pHeartbeatTable` TO '$pMasterUser'\@'$pMasterHost' IDENTIFIED BY 'secret';

  On Slave:
  GRANT SELECT ON `$pHeartbeatSchema`.`$pHeartbeatTable` TO '$pSlaveUser'\@'$pSlaveHost' IDENTIFIED BY 'secret';

  The heartbeat table should look as follows:
  CREATE TABLE `$pHeartbeatSchema`.`$pHeartbeatTable` (
    `$pHeartbeatIdField`   INT UNSIGNED NOT NULL DEFAULT 0
  , `$pHeartbeatBeatField` INT UNSIGNED NOT NULL DEFAULT 0
  , PRIMARY KEY (`$pHeartbeatIdField`)
  );
  INSERT INTO `$pHeartbeatSchema`.`$pHeartbeatTable` VALUES ($pHeartbeatId, 1);

FLAGS

  --help, -?              Display this help and exit.
  --critical, -c          Difference in beats which causes a CRITICAL (default $pCritical).
  --master-host           Master host (default $pMasterHost)
  --master-password       Master password of user $pMasterUser (default >$pMasterPassword<)
  --master-port           Master port where database listens to (default $pMasterPort)
  --master-user           User on master for connecting to the database (default $pMasterUser)
  --warning, -w           Difference in beats which causes a WARNING (default $pWarning).
  --slave-host            Slave host (default $pSlaveHost)
  --slave-password        Slave password of user $pSlaveUser (default >$pSlavePassword<)
  --slave-port            Slave port where database listens to (default $pSlavePort)
  --slave-user            User on slave for connecting to the database (default $pSlaveUser)
  --heartbeat-schema      Schema were heartbeat table is located (default $pHeartbeatSchema)
  --heartbeat-table       Table name of heartbeat table (default $pHeartbeatTable)
  --heartbeat-beat-field  Attribute where beat is storred (default $pHeartbeatBeatField)
  --heartbeat-id-field    Attribute where id is storred (default $pHeartbeatIdField)
  --heartbeat-id          Id in heartbeat table to check (default $pHeartbeatId)

PARAMETERS

  none

EXAMPLE

  $lMyName --master-user=$pMasterUser --master-password=secret --master-host=$pMasterHost --master-port=$pMasterPort \\
    --slave-user=$pSlaveUser --slave-password=secret --slave-host=$pSlaveHost --slave-port=$pSlavePort \\
    --heartbeat-schema=$pHeartbeatSchema --heartbeat-table=$pHeartbeatTable --heartbeat-beat-field=$pHeartbeatBeatField --heartbeat-id-field=$pHeartbeatIdField --heartbeat-id=$pHeartbeatId \\
    --warning=$pWarning --critical=$pCritical

EOF
}

my $rc = GetOptions(
  'help|?'                 => \$pHelp
, 'master-user=s'          => \$pMasterUser
, 'master-password=s'      => \$pMasterPassword
, 'master-host=s'          => \$pMasterHost
, 'master-port=i'          => \$pMasterPort
, 'slave-user=s'           => \$pSlaveUser
, 'slave-password=s'       => \$pSlavePassword
, 'slave-host=s'           => \$pSlaveHost
, 'slave-port=i'           => \$pSlavePort
, 'warning|w=i'            => \$pWarning
, 'critical|c=i'           => \$pCritical
, 'heartbeat-schema=s'     => \$pHeartbeatSchema
, 'heartbeat-table=s'      => \$pHeartbeatTable
, 'heartbeat-beat-field=s' => \$pHeartbeatBeatField
, 'heartbeat-id-field=s'   => \$pHeartbeatIdField
, 'heartbeat-id=i'         => \$pHeartbeatId
);

if ( $pHelp ) {
	&Usage();
	exit($lError{'OK'});
}

if ( ! $rc ) {
	print("Error in parameters.");
	exit($lError{'Unknown'});
}

if ( @ARGV != 0 ) {
	print("Error in parameters. To many arguments: @ARGV");
	exit($lError{'Unknown'});
}

# Start here
# ----------

my ($dbhM, $dbhS, $sql, $sth, $dsn);

my $lTimeout = 10;
$dsn = "DBI:mysql::host=$pMasterHost:port=$pMasterPort;mysql_connect_timeout=$lTimeout";
$dbhM = DBI->connect($dsn, $pMasterUser, $pMasterPassword
	, { RaiseError => 0
	, PrintError => 0
	, AutoCommit => 0
		}
);

if ( DBI::err ) {

	if ( DBI::errstr =~ m/Can't connect to/ ) {
		print("Error during connection: " . DBI::errstr);
		exit($lError{'Critical'});
	}

	if ( DBI::errstr =~ m/Access denied for user/ ) {
		print("User does not have access privileges to database: " . DBI::errstr);
		exit($lError{'Warning'});
	}

	print("Error during connection: " . DBI::errstr);
	exit($lError{'Critical'});
}

$lTimeout = 10;
$dsn = "DBI:mysql::host=$pSlaveHost:port=$pSlavePort;mysql_connect_timeout=$lTimeout";
$dbhS = DBI->connect($dsn, $pSlaveUser, $pSlavePassword
	, { RaiseError => 0
	, PrintError => 0
	, AutoCommit => 0
		}
);

if ( DBI::err ) {

	if ( DBI::errstr =~ m/Can't connect to/ ) {
		print("Error during connection: " . DBI::errstr);
		exit($lError{'Critical'});
	}

	if ( DBI::errstr =~ m/Access denied for user/ ) {
		print("User does not have access privileges to database: " . DBI::errstr);
		exit($lError{'Warning'});
	}

	print("Error during connection: " . DBI::errstr);
	exit($lError{'Critical'});
}

$sql = "
SELECT $pHeartbeatBeatField
	FROM $pHeartbeatSchema.$pHeartbeatTable
WHERE $pHeartbeatIdField = ?
";

# ----------------------------------------------------------------------

$sth = $dbhM->prepare( $sql );
if ( DBI::err ) {
	print("Error in preparing on Master: " . DBI::errstr);
	$dbhM->disconnect;
	exit($lError{'Critical'});
}

$sth->execute($pHeartbeatId);
if ( $sth->err ) {
	print("Error in executing on Master: " . $sth->errstr);
	$dbhM->disconnect;
	exit($lError{'Critical'});
}

my ($lMasterBeat);
$sth->bind_columns(undef, \$lMasterBeat);
if ( $sth->err ) {
	print("Error in binding on Master");
	$sth->finish;
	$dbhM->disconnect;
	exit($lError{'Critical'});
}

$sth->fetchrow_arrayref();
if ( $sth->err ) {
	print("Error in fetchting on Master");
	$sth->finish;
	$dbhM->disconnect;
	exit($lError{'Critical'});
}
$sth->finish;

$dbhM->disconnect;

# ----------------------------------------------------------------------

$sth = $dbhS->prepare( $sql );
if ( DBI::err ) {
	print("Error in preparing on Slave");
	$dbhS->disconnect;
	exit($lError{'Critical'});
}

$sth->execute($pHeartbeatId);
if ( $sth->err ) {
	print("Error in executing on Slave: " . $sth->errstr );
	$dbhS->disconnect;
	exit($lError{'Critical'});
}

my ($lSlaveBeat);
$sth->bind_columns(undef, \$lSlaveBeat);
if ( $sth->err ) {
	print("Error in binding on Slave");
	$sth->finish;
	$dbhS->disconnect;
	exit($lError{'Critical'});
}

$sth->fetchrow_arrayref();
if ( $sth->err ) {
	print("Error in fetchting on Slave");
	$sth->finish;
	$dbhS->disconnect;
	exit($lError{'Critical'});
}
$sth->finish;

$dbhS->disconnect;

# ----------------------------------------------------------------------

if (! defined($lMasterBeat) ) {
	print("Heartbeat is not yet setup properly on master");
	exit($lError{'Warning'});
}

if (! defined($lSlaveBeat) ) {
	print("Heartbeat is not yet setup properly on slave");
	exit($lError{'Warning'});
}

my $lBeatDelta = $lMasterBeat - $lSlaveBeat;

if ( $lBeatDelta >= $pCritical ) {
	print("Slave is $lBeatDelta beats behind master which is more than the allowed CRITICAL level of $pCritical beats");
	exit($lError{'Critical'});
}
elsif ( $lBeatDelta >= $pWarning ) {
	print("Slave is $lBeatDelta beats behind master which is more than the allowed WARNING level of $pWarning beats");
	exit($lError{'Warning'});
}

print $lMasterBeat . ' ' . $lSlaveBeat;

print("Heartbeat looks fine, Slave is $lBeatDelta beats behind master");
exit($lError{'OK'});
