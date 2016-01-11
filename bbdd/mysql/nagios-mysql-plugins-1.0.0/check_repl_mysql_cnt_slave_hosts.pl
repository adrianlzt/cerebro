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

my $pHelp           = 0;
my $pUser           = 'check_db';
my $pPassword       = '';
my $pHost           = 'localhost';
my $lDefaultPort    = '3306';
my $lDefaultSocket  = '/var/run/mysqld/mysqld.sock';
my $pWarning        = 2;
my $pCritical       = 1;
my $pExpectedSlaves = 1;

sub Usage
{
	print <<EOF;

SYNOPSIS

  $lMyName flags parameters

DESCRIPTION

  Nagios/Icinga plugin to count connected MySQL Slaves on host...

  For security reasons use a user with as little privileges as possible. For
  example a user called $pUser:

  GRANT REPLICATION CLIENT ON *.* TO '$pUser'\@'$pHost' IDENTIFIED BY 'secret';

FLAGS

  --help, -?           Display this help and exit.
  --host=name, -h      Host where database to check is located (default $pHost).
  --password=name, -p  Password of user $pUser to use when connecting to server
                       $pHost (default '$pPassword').
  --port=#, -P         Port number where database listens to (default $lDefaultPort).
  --socket=name, -S    Socket file to use for connection (default
                       $lDefaultSocket).
  --user=name, -u      Check user for connecting to the database (default
                       $pUser).
  --warning, -w        Number of slaves that are expected to be available (default $pWarning).
  --critical, -c       Number of slaves that are expected to be available (default $pCritical).
  --expected, -e       Number of slaves expected on master (default $pExpectedSlaves)

PARAMETERS

  none

EXAMPLE

  $lMyName --user=$pUser --password=secret --host=$pHost --port=$lDefaultPort --expected=3 --critical=1 --warning=2

EOF
}

my ($pPort, $pSocket);

my $rc = GetOptions(
  'help|?'       => \$pHelp
, 'user|u=s'     => \$pUser
, 'password|p=s' => \$pPassword
, 'host|h=s'     => \$pHost
, 'port|P=i'     => \$pPort
, 'socket|S=s'   => \$pSocket
, 'warning|w=i'  => \$pWarning
, 'critical|c=i' => \$pCritical
, 'expected|e=i' => \$pExpectedSlaves
);

# On Unix, MySQL programs treat the host name localhost specially. For connec-
# tions to localhost, MySQL programs attempt to connect to the local server by
# using a Unix socket file. This occurs even if a --port or -P  option is given
# to specify a port number. To ensure that the client makes a TCP/IP connection
# to the local server, use --host or -h to specify a host name value of
# 127.0.0.1, or the IP address or name of the local server.
#
# Lit: refman-5.6-en.html-chapter/programs.html

my $lConnectionMethod = 'socket';

if ( ! defined($pHost) || $pHost eq '' ) {
	$pHost = 'localhost';
}
if ( $pHost eq 'localhost' ) {
	if ( defined($pPort) && $pPort ne '' ) {
		print("Port is overspecified when using host=localhost.");
		exit($lError{'Warning'});
	}
	if ( ! defined($pSocket) || $pSocket eq '' ) {
		$pSocket = $lDefaultSocket;
	}
	$lConnectionMethod = 'socket';
}
# host != localhost
else {
	if ( defined($pSocket) && $pSocket ne '' ) {
		print("Socket is overspecified when using host=localhost.");
		exit($lError{'Warning'});
	}
	if ( ! defined($pPort) || $pPort eq '' ) {
		$pPort = $lDefaultPort;
	}
	$lConnectionMethod = 'port';
}

if ( $pHelp ) {
	&Usage();
	exit($lError{'OK'});
}

if ( ! $rc ) {
	print("Error in parameters. User = $pUser, Password=hidden, Host = $pHost, Port = $pPort, Socket = $pSocket");
	exit($lError{'Unknown'});
}

if ( @ARGV != 0 ) {
	print("Error in parameters. To many arguments: @ARGV");
	exit($lError{'Unknown'});
}

# Start here
# ----------

my ($dbh, $sql, $sth);

my $lTimeout = 10;
my $dsn;
if ( $lConnectionMethod eq 'socket' ) {
	$dsn = "DBI:mysql::mysql_socket=$pSocket;mysql_connect_timeout=$lTimeout";
}
else {
	$dsn = "DBI:mysql::host=$pHost:port=$pPort;mysql_connect_timeout=$lTimeout";
}
$dbh = DBI->connect($dsn, $pUser, $pPassword
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
	SHOW SLAVE HOSTS
";

$sth = $dbh->prepare( $sql );
if ( DBI::err ) {
	print("Error in preparing: " . DBI::errstr);
	$dbh->disconnect;
	exit($lError{'Critical'});
}

$sth->execute();
if ( $sth->err ) {
	print("Error in executing: " . $sth->errstr);
	$dbh->disconnect;
	exit($lError{'Critical'});
}

my ($lServerId, $lHost, $lPort, $lRplRecoveryRank, $lMasterId);
# $sth->bind_columns(undef, \$lServerId, \$lHost, \$lPort, \$lRplRecoveryRank, \$lMasterId);
if ( $sth->err ) {
	print("Error in binding: " . $sth->errstr);
	$sth->finish;
	$dbh->disconnect;
	exit($lError{'Critical'});
}

my $lCnt = 0;
while ( $sth->fetchrow_arrayref() ) {
	$lCnt++;
};
if ( $sth->err ) {
	print("Error in fetchting:" . $sth->errstr);
	$sth->finish;
	$dbh->disconnect;
	exit($lError{'Critical'});
}

$sth->finish;
$dbh->disconnect;

if ( $lCnt < $pCritical ) {
	if ( $lCnt == 1 ) {
		print("$lCnt slave is connected to the master which is less than the allowed CRITICAL level of $pCritical");
	}
	else {
		print("$lCnt slaves are connected to the master which is less than the allowed CRITICAL level of $pCritical");
	}
	exit($lError{'Critical'});
}
elsif ( $lCnt < $pWarning ) {
	if ( $lCnt == 1 ) {
		print("$lCnt slave is connected to the master which is less than the allowed WARNING level of $pWarning");
	}
	else {
		print("$lCnt slaves are connected to the master which is less than the allowed WARNING level of $pWarning");
	}
	exit($lError{'Warning'});
}

print("$lCnt slaves are connected to the master which is more or equal than the allowed WARNING level of $pWarning");
exit($lError{'OK'});
