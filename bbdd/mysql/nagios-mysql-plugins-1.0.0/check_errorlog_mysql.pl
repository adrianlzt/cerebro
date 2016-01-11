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

my $pHelp              = 0;
chomp($_ = `hostname`);
my $pErrorLog          = '/var/lib/mysql/' . $_  . '.err';
my $pInstanceName      = 'mysqld';
my $pConfigurationFile = '/var/tmp/check_errorlog_mysql.conf';
my $pDebug             = 0;

sub Usage
{
	print <<EOF;

SYNOPSIS

  $lMyName flags parameters

DESCRIPTION

  Nagios/Icinga plugin to check the MySQL error log...

FLAGS

  --help, -?           Display this help and exit.
  --error-log, -e      Name of the error log file (default $pErrorLog).
  --instance, -i       Name of the MySQL instance. This is important if more than
                       one instance is running on the same host (default $pInstanceName).
  --configuration, -c  Location of the configuration file where last read position is
                       stored (default $pConfigurationFile).
  --debug              Enable debug output.

PARAMETERS

  none

EXAMPLE

  $lMyName --instance=$pInstanceName --error-log=$pErrorLog --configuration=$pConfigurationFile

EOF
}

my $rc = GetOptions(
  'help|?'            => \$pHelp
, 'error-log|e=s'     => \$pErrorLog
, 'instance|i=s'      => \$pInstanceName
, 'configuration|c=s' => \$pConfigurationFile
, 'debug'             => \$pDebug
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

my $lConfigurationFileTmp = "$pConfigurationFile.tmp";

# include filter rules
use errorLogFilterRules qw(getRules);
my @aFilterConfiguration = getRules();


# Read last position form configuration file
# ------------------------------------------

my $lOldTs = 0;

if ( -r $pConfigurationFile ) {
	open(CONF, '<' . $pConfigurationFile);
	while ( <CONF> ) {
		chomp;
		if ( m/^$pInstanceName:(\d*)$/ ) {
			$lOldTs = $1;
			last;
		}
	}
	close(CONF);
}
else {
	my $cmd = "touch $pConfigurationFile";
	if ( $pDebug ) { print "DEBUG: $cmd\n"; }
	`$cmd`;
}
if ( $pDebug ) { print "DEBUG: lOldTs=$lOldTs\n"; }

# Parse the error log
# -------------------

my $lFilter;
my $lTs;
my $f;
my $lNewTs = 0;
my $lErrorCounter = 0;
my $lWarningCounter = 0;

if ( ! -r $pErrorLog ) {
	print("Cannot read $pErrorLog. Please verify that you have read access!");
	exit($lError{'Warning'});
}

# Timestamp for 5.6 and older
# my $lTimestamp = '^(\d{4,6}(-\d{2}){0,2})\s*(\d{1,2}):(\d{2}:\d{2})';
# Timestamp for 5.7 and older
my $lTimestamp = '^(\d{4,6}(-\d{2}){0,2})[\sT]{1}(\d{1,2}):(\d{2}:\d{2})(\.\d{6}Z)?';

open(LOG, '<' . $pErrorLog);
my $lInTime = 0;
my $rows = 0;
while ( <LOG> ) {

	$rows++;
	# skip empty lines
	if ( m/^$/ ) {
		next;
	}

	# Calculate new timestamp
	# Time stamps can occur like this:
	# 110523 11:08:38
	# 110803  2:20:59
	# 2013-02-10 17:32:24

	if ( m/$lTimestamp/ ) {
		$lNewTs = sprintf("%s%02d%s", $1, $3, $4);
		$lNewTs =~ s/[ :-]//g;
	}

	# Find end of last run = start of this run
	if ( (! $lInTime) and m/$lTimestamp/ ) {

		$lTs = $1;
		$lTs =~  s/[ :-]//g;
		# potential loss of records within the same second!!!
		if ( $lTs lt $lOldTs ) {
			next;
		}
		else {
			$lInTime = 1;
			if ( $pDebug ) { print "DEBUG: lInTime=$lInTime\n"; }
		}
	}

	if ($lInTime) {

		$f = 0;
		foreach $lFilter (@aFilterConfiguration) {

			if ( m/$lFilter/ ) {
				$f++;
				last;
			}
		}
		if ( $f ) {
			next;
		}

		print $_;
		if ( m/error/i ) {
			$lErrorCounter++;
		}
		elsif ( m/warning/i ) {
			$lWarningCounter++;
		}
		if ( $pDebug ) { print "DEBUG: lErrorCounter=$lErrorCounter, lWarningCounter=$lWarningCounter\n"; }
	}
	# if ( $pDebug ) { print "DEBUG: rows=$rows\n"; }
}
close(LOG);

$lNewTs =~ s/^0*//;

if ( $lNewTs eq '' ) {
	$lNewTs = $lOldTs;
}
if ( $pDebug ) { print "DEBUG: lNewTs=$lNewTs\n"; }

# Set last position
# -----------------

open(CONF, '<' . $pConfigurationFile);
open(TMP, '>' . $lConfigurationFileTmp);
while ( <CONF> ) {
	if ( ! m/^$pInstanceName:(\d*)$/ ) {
		print(TMP $_);
	}
}
print(TMP "$pInstanceName:$lNewTs\n");
close(TMP);
close(CONF);
`mv $lConfigurationFileTmp $pConfigurationFile`;
$rc = $?;

if ( $rc ) {
	print("Cannot move temporary file from $lConfigurationFileTmp to $pConfigurationFile");
	exit($lError{'Warning'});
}

if ( $lErrorCounter gt 0 ) {
	# print("Some new errors found!");
	exit($lError{'Critical'});
}
elsif ( $lWarningCounter ) {
	exit($lError{'Warning'});
}

print("No errors or warnings found.");
exit($lError{'OK'});
