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

my $pHelp          = 0;
my $pUser          = 'check_db';
my $pPassword      = '';
my $pHost          = 'localhost';
my $lDefaultPort   = '3306';
my $lDefaultSocket = '/var/run/mysqld/mysqld.sock';
my $pModule        = 'uptime';

sub Usage
{
	print <<EOF;

SYNOPSIS

  $lMyName flags parameters

DESCRIPTION

  Nagios/Icinga plugin for gathering MySQL and MariaDB performance data...

  For security reasons use a user with as little privileges as possible. For
  example a user called $pUser:

  GRANT USAGE, PROCESS ON *.* TO '$pUser'\@'$pHost' IDENTIFIED BY 'check_db';

FLAGS

  --help, -?            Display this help and exit.
  --host=name, -h       Host where database to check is located (default $pHost).
  --password=value, -p  Password of user $pUser to use when connecting to server
                        $pHost (default '$pPassword').
  --port=#, -P          Port number where database listens to (default $lDefaultPort).
  --socket=name, -S     Socket file to use for connection (default
                        $lDefaultSocket).
  --user=name, -u       Check user for connecting to the database (default
                        $pUser).
  --module=name, -m     Module name. The following modules are available (default
                        $pModule): 
                        connections, thread_cache, network_traffic, queries,
                        query_cache, myisam_key_buffer, table_cache,
                        temporary_tables, tables, slow_queries, bin_log,
                        uptime, innodb_buffer_pool, innodb_buffer_pool_io,
                        innodb_io, innodb_data, innodb_logfile,
                        innodb_row_locking, innodb_queries

PARAMETERS

  none

EXAMPLE

  $lMyName --user=$pUser --password=secret --host=$pHost --port=$lDefaultPort --module=connections

EOF
}

sub callModule
{
	my $dbh = $_[0];
	my $lModule = $_[1];
	my $lOutput = '';

	if ( $lModule eq 'connections' ) {
		$lOutput = &gatherConnections($dbh);
	}
	elsif ( $lModule eq 'thread_cache' ) {
		$lOutput = &gatherThreadCache($dbh);
	} 
	elsif ( $lModule eq 'network_traffic' ) {
		$lOutput = &gatherNetworkTraffic($dbh);
	} 
	elsif ( $lModule eq 'queries' ) {
		$lOutput = &gatherQueries($dbh);
	} 
	elsif ( $lModule eq 'query_cache' ) {
		$lOutput = &gatherQueryCache($dbh);
	} 
	elsif ( $lModule eq 'myisam_key_buffer' ) {
		$lOutput = &gatherMyisamKeyBuffer($dbh);
	} 
	elsif ( $lModule eq 'table_cache' ) {
		$lOutput = &gatherTableCache($dbh);
	} 
	elsif ( $lModule eq 'temporary_tables' ) {
		$lOutput = &gatherTemporaryTables($dbh);
	} 
	elsif ( $lModule eq 'tables' ) {
		$lOutput = &gatherTables($dbh);
	} 
	elsif ( $lModule eq 'slow_queries' ) {
		$lOutput = &gatherSlowQueries($dbh);
	} 
	elsif ( $lModule eq 'bin_log' ) {
		$lOutput = &gatherBinLog($dbh);
	} 
	elsif ( $lModule eq 'uptime' ) {
		$lOutput = &gatherUptime($dbh);
	} 
	elsif ( $lModule eq 'innodb_buffer_pool' ) {
		$lOutput = &gatherInnodbBufferPool($dbh);
	} 
	elsif ( $lModule eq 'innodb_buffer_pool_io' ) {
		$lOutput = &gatherInnodbBufferPoolIo($dbh);
	} 
	elsif ( $lModule eq 'innodb_io' ) {
		$lOutput = &gatherInnodbIo($dbh);
	} 
	elsif ( $lModule eq 'innodb_data' ) {
		$lOutput = &gatherInnodbData($dbh);
	} 
	elsif ( $lModule eq 'innodb_logfile' ) {
		$lOutput = &gatherInnodbLogfile($dbh);
	} 
	elsif ( $lModule eq 'innodb_row_locking' ) {
		$lOutput = &gatherInnodbRowLocking($dbh);
	} 
	elsif ( $lModule eq 'innodb_queries' ) {
		$lOutput = &gatherInnodbQueries($dbh);
	}
	else {
		$lOutput = "Wrong module name: $lModule!";
	}
	return($lOutput);  
}

sub gatherConnections
{
	my $dbh = $_[0];

	my ($rc, %lSaV) = &gatherStatusAndVariables($dbh);
	if ( $rc ) {
		return($lSaV{'error'});
	}

	my ($lName, $lList);

	$lName = 'max_connections';
	$lList .= "'$lName'=$lSaV{$lName};;;;";

	$lList .= ' ';

	$lName = 'threads_connected';
	$lList .= "'$lName'=$lSaV{$lName};" . int($lSaV{'max_connections'}*0.8) . ';' . int($lSaV{'max_connections'}*0.9) . ';;';

	$lList .= ' ';

	$lName = 'max_used_connections';
	$lList .= "'$lName'=$lSaV{$lName};;;;";

	$lList .= ' ';

	$lName = 'aborted_clients';
	$lList .= "'$lName'=$lSaV{$lName};;;;";

	$lList .= ' ';

	$lName = 'aborted_connects';
	$lList .= "'$lName'=$lSaV{$lName};;;;";

	$lList .= ' ';

	$lName = 'threads_running';
	$lList .= "'$lName'=$lSaV{$lName};;;;";

	$lList .= ' ';

	$lName = 'slow_launch_threads';
	$lList .= "'$lName'=$lSaV{$lName};;;;";

	return($lList);
}

sub gatherThreadCache
{
	my $dbh = $_[0];

	my ($rc, %lSaV) = &gatherStatusAndVariables($dbh);
	if ( $rc ) {
		return($lSaV{'error'});
	}

	my ($lName, $lList);

	$lName = 'thread_cache_size';
	$lList .= "'$lName'=$lSaV{$lName};;;;";

	$lList .= ' ';

	$lName = 'threads_cached';
	$lList .= "'$lName'=" . $lSaV{$lName} . ';' . int($lSaV{'thread_cache_size'}*0.2) . ';' . int($lSaV{'thread_cache_size'}*0.1) . ';0;' . $lSaV{'thread_cache_size'};

	$lList .= ' ';

	$lName = 'threads_created';
	$lList .= "'$lName'=$lSaV{$lName};;;;";

	$lList .= ' ';

	$lName = 'connections';
	$lList .= "'$lName'=$lSaV{$lName};;;;";

	return($lList);
}

sub gatherNetworkTraffic
{
	my $dbh = $_[0];

	my ($rc, %lSaV) = &gatherStatusAndVariables($dbh);
	if ( $rc ) {
		return($lSaV{'error'});
	}

	my ($lName, $lList);

	$lName = 'bytes_sent';
	$lList .= "'$lName'=". int($lSaV{$lName}/1024) . 'KB;;;;';

	$lList .= ' ';

	$lName = 'bytes_received';
	$lList .= "'$lName'=". int($lSaV{$lName}/1024) . 'KB;;;;';

	return($lList);
}

sub gatherQueries
{
	my $dbh = $_[0];

	my ($rc, %lSaV) = &gatherStatusAndVariables($dbh);
	if ( $rc ) {
		return($lSaV{'error'});
	}

	my ($lName, $lList);

	$lName = 'questions';
	$lList .= "'$lName'=$lSaV{$lName};;;;";

	$lList .= ' ';

	$lName = 'com_select';
	$lList .= "'$lName'=$lSaV{$lName};;;;";

	$lList .= ' ';

	$lName = 'com_delete';
	$lList .= "'$lName'=$lSaV{$lName};;;;";

	$lList .= ' ';

	$lName = 'com_insert';
	$lList .= "'$lName'=$lSaV{$lName};;;;";

	$lList .= ' ';

	$lName = 'com_insert_select';
	$lList .= "'$lName'=$lSaV{$lName};;;;";

	$lList .= ' ';

	$lName = 'com_delete_multi';
	$lList .= "'$lName'=$lSaV{$lName};;;;";

	$lList .= ' ';

	$lName = 'com_update';
	$lList .= "'$lName'=$lSaV{$lName};;;;";

	$lList .= ' ';

	$lName = 'com_update_multi';
	$lList .= "'$lName'=$lSaV{$lName};;;;";

	$lList .= ' ';

	$lName = 'com_replace';
	$lList .= "'$lName'=$lSaV{$lName};;;;";

	$lList .= ' ';

	$lName = 'com_replace_select';
	$lList .= "'$lName'=$lSaV{$lName};;;;";

	$lList .= ' ';

	$lName = 'com_change_db';
	$lList .= "'$lName'=$lSaV{$lName};;;;";

	$lList .= ' ';

	$lName = 'qcache_hits';
	$lList .= "'$lName'=$lSaV{$lName};;;;";

	$lList .= ' ';

	my $dml = $lSaV{'com_insert'} + $lSaV{'com_insert_select'} + $lSaV{'com_update'} + $lSaV{'com_update_multi'} + $lSaV{'com_replace'} + $lSaV{'com_replace_select'} + $lSaV{'com_delete'} + $lSaV{'com_delete_multi'};

	$dml = ($dml == 0 ? 0.000001 : $dml);

	$lName = 'rw_ratio';
	$lList .= "'$lName'=" . int($lSaV{'com_select'}/$dml) . ";;;;";

	$lList .= ' ';

	$lName = 'rwq_ratio';
	$lList .= "'$lName'=" . int(($lSaV{'qcache_hits'}+$lSaV{'com_select'})/$dml) . ";;;;";

	return($lList);
}

sub gatherQueryCache
{
	my $dbh = $_[0];

	my ($rc, %lSaV) = &gatherStatusAndVariables($dbh);
	if ( $rc ) {
		return($lSaV{'error'});
	}

	# foreach ( sort keys(%lSaV) ) {
	#  	print $_ . ' - ' . $lSaV{$_} . "\n";
	# }

	my ($lName, $lList);

	$lName = 'qcache_free_memory';
	$lList .= "'$lName'=$lSaV{$lName};" . int($lSaV{'query_cache_size'}*0.1) . ';' . int($lSaV{'query_cache_size'}*0.1) . ';;';

	$lList .= ' ';

	$lName = 'query_cache_size';
	$lList .= "'$lName'=$lSaV{$lName};;;;";

	$lList .= ' ';

	$lName = 'qcache_inserts';
	$lList .= "'$lName'=$lSaV{$lName};;;;";

	$lList .= ' ';

	$lName = 'qcache_not_cached';
	$lList .= "'$lName'=$lSaV{$lName};;;;";

	$lList .= ' ';

	$lName = 'qcache_hits';
	$lList .= "'$lName'=$lSaV{$lName};;;;";

	$lList .= ' ';

	$lName = 'com_select';
	$lList .= "'$lName'=$lSaV{$lName};;;;";

	$lList .= ' ';

	$lName = 'qcache_hit_ratio';
	$lList .= "'$lName'=" . int($lSaV{'qcache_hits'}/(($lSaV{'qcache_hits'}+$lSaV{'qcache_inserts'}+$lSaV{'qcache_not_cached'} == 0) ? 0.000001 : ($lSaV{'qcache_hits'}+$lSaV{'qcache_inserts'}+$lSaV{'qcache_not_cached'}))*100) . ';;;;';

	$lList .= ' ';

	$lName = 'qcache_serv_ratio';
	$lList .= "'$lName'=" . int($lSaV{'qcache_hits'}/($lSaV{'qcache_hits'}+$lSaV{'com_select'})*100) . ";;;;";

	$lList .= ' ';

	$lName = 'qcache_miss_ratio';
	$lList .= "'$lName'=" . int($lSaV{'qcache_not_cached'}/($lSaV{'qcache_not_cached'}+$lSaV{'qcache_inserts'} == 0 ? 0.000001 : $lSaV{'qcache_not_cached'}+$lSaV{'qcache_inserts'})*100) . ";;;;";

	return($lList);
}

sub gatherMyisamKeyBuffer
{
	my $dbh = $_[0];

	my ($rc, %lSaV) = &gatherStatusAndVariables($dbh);
	if ( $rc ) {
		return($lSaV{'error'});
	}

	my ($lName, $lList);

	$lName = 'key_write_requests';
	$lList .= "'$lName'=$lSaV{$lName};;;;";

	$lList .= ' ';

	$lName = 'key_writes';
	$lList .= "'$lName'=$lSaV{$lName};;;;";

	$lList .= ' ';

	$lName = 'key_reads';
	$lList .= "'$lName'=$lSaV{$lName};;;;";

	$lList .= ' ';

	$lName = 'key_read_requests';
	$lList .= "'$lName'=$lSaV{$lName};;;;";

	$lList .= ' ';

	$lName = 'key_buffer_size';
	$lList .= "'$lName'=" . int($lSaV{$lName}/1024/1024) . "MB;;;;";

	$lList .= ' ';

	$lName = 'key_buffer_max_used';
	$lList .= "'$lName'=" . int($lSaV{'key_blocks_used'}*$lSaV{'key_cache_block_size'}/1024/1024) . "MB;;;;";

	$lList .= ' ';

	$lName = 'key_buffer_unused';
	$lList .= "'$lName'=" . int($lSaV{'key_blocks_unused'}*$lSaV{'key_cache_block_size'}/1024/1024) . "MB;;;;";

	$lList .= ' ';

	$lName = 'key_buffer_hit_ratio';
	$lList .= "'$lName'=" . int(($lSaV{'key_read_requests'}-$lSaV{'key_reads'})/($lSaV{'key_read_requests'})*100) . "%;99;95;100;0";

	return($lList);
}

sub gatherTableCache
{
	my $dbh = $_[0];

	my ($rc, %lSaV) = &gatherStatusAndVariables($dbh);
	if ( $rc ) {
		return($lSaV{'error'});
	}

	my ($lName, $lList);

# 	$lName = 'table_cache';
# 	$lList .= "'$lName'=$lSaV{$lName};;;;";
# 
# 	$lList .= ' ';

	$lName = 'table_open_cache';
	$lList .= "'$lName'=$lSaV{$lName};;;;";

	$lList .= ' ';

	$lName = 'open_tables';
	$lList .= "'$lName'=$lSaV{$lName};" . int($lSaV{'table_open_cache'}*0.9) . ';' . int($lSaV{'table_open_cache'}*0.95) . ';;';

	$lList .= ' ';

	$lName = 'open_files';
	$lList .= "'$lName'=$lSaV{$lName};;;;";

	return($lList);
}

sub gatherTemporaryTables
{
	my $dbh = $_[0];

	my ($rc, %lSaV) = &gatherStatusAndVariables($dbh);
	if ( $rc ) {
		return($lSaV{'error'});
	}

	my ($lName, $lList);

	$lName = 'sort_merge_passes';
	$lList .= "'$lName'=$lSaV{$lName};;;;";

	$lList .= ' ';

	$lName = 'created_tmp_tables';
	$lList .= "'$lName'=$lSaV{$lName};;;;";

	$lList .= ' ';

	$lName = 'created_tmp_disk_tables';
	$lList .= "'$lName'=$lSaV{$lName};" . int($lSaV{'created_tmp_tables'}*0.05) . ';' . int($lSaV{'created_tmp_tables'}*0.1) . ';;';

	$lList .= ' ';

	$lName = 'created_tmp_files';
	$lList .= "'$lName'=$lSaV{$lName};;;;";

	return($lList);
}

sub gatherTables
{
	my $dbh = $_[0];

	my ($rc, %lSaV) = &gatherStatusAndVariables($dbh);
	if ( $rc ) {
		return($lSaV{'error'});
	}

	my ($lName, $lList);

	$lName = 'table_locks_immediate';
	$lList .= "'$lName'=$lSaV{$lName};;;;";

	$lList .= ' ';

	$lName = 'table_locks_waited';
	$lList .= "'$lName'=$lSaV{$lName};" . int($lSaV{'table_locks_immediate'}*0.01) . ';' . int($lSaV{'table_locks_immediate'}*0.005) . ';;';

	return($lList);
}

sub gatherSlowQueries
{
	my $dbh = $_[0];

	my ($rc, %lSaV) = &gatherStatusAndVariables($dbh);
	if ( $rc ) {
		return($lSaV{'error'});
	}

	my ($lName, $lList);

	$lName = 'slow_queries';
	$lList .= "'$lName'=$lSaV{$lName};;;;";

	$lList .= ' ';

	$lName = 'select_full_join';
	$lList .= "'$lName'=$lSaV{$lName};;;;";

	$lList .= ' ';

	$lName = 'select_range_check';
	$lList .= "'$lName'=$lSaV{$lName};;;;";

	$lList .= ' ';

	$lName = 'select_scan';
	$lList .= "'$lName'=$lSaV{$lName};;;;";

	$lList .= ' ';

	$lName = 'handler_read_rnd_next';
	$lList .= "'$lName'=$lSaV{$lName};;;;";

	return($lList);
}

sub gatherBinLog
{
	my $dbh = $_[0];

	my ($rc, %lSaV) = &gatherStatusAndVariables($dbh);
	if ( $rc ) {
		return($lSaV{'error'});
	}

	my ($lName, $lList);

	$lName = 'binlog_cache_disk_use';
	$lList .= "'$lName'=$lSaV{$lName};;;;";

	$lList .= ' ';

	$lName = 'binlog_cache_use';
	$lList .= "'$lName'=$lSaV{$lName};;;;";

	return($lList);
}

sub gatherUptime
{
	my $dbh = $_[0];

	my ($rc, %lSaV) = &gatherStatusAndVariables($dbh);
	if ( $rc ) {
		return($lSaV{'error'});
	}

	my ($lName, $lList);

	$lName = 'uptime';
	$lList .= "'$lName'=$lSaV{$lName}s;[10];[10];;";

	return($lList);
}

sub gatherInnodbBufferPool
{
	my $dbh = $_[0];

	my ($rc, %lSaV) = &gatherStatusAndVariables($dbh);
	if ( $rc ) {
		return($lSaV{'error'});
	}

	my ($lName, $lList);

	$lName = 'innodb_buffer_pool_pages_misc';
	$lList .= "'$lName'=$lSaV{$lName};;;;";

	$lList .= ' ';

	$lName = 'innodb_buffer_pool_pages_free';
	$lList .= "'$lName'=$lSaV{$lName};" . int($lSaV{'innodb_buffer_pool_pages_total'}*0.05) . ';' . int($lSaV{'innodb_buffer_pool_pages_total'}*0.01) . ';;';

	$lList .= ' ';

	$lName = 'innodb_buffer_pool_pages_data';
	$lList .= "'$lName'=$lSaV{$lName};;;;";

	$lList .= ' ';

	$lName = 'innodb_buffer_pool_pages_total';
	$lList .= "'$lName'=$lSaV{$lName};;;;";

	return($lList);
}

sub gatherInnodbBufferPoolIo
{
	my $dbh = $_[0];

	my ($rc, %lSaV) = &gatherStatusAndVariables($dbh);
	if ( $rc ) {
		return($lSaV{'error'});
	}

	my ($lName, $lList);

	$lName = 'innodb_buffer_pool_read_requests';
	$lList .= "'$lName'=$lSaV{$lName};;;;";

	$lList .= ' ';

	$lName = 'innodb_buffer_pool_reads';
	$lList .= "'$lName'=$lSaV{$lName};;;;";

	$lList .= ' ';

	$lName = 'innodb_buffer_pool_write_requests';
	$lList .= "'$lName'=$lSaV{$lName};;;;";

	$lList .= ' ';

	$lName = 'innodb_buffer_pool_wait_free';
	$lList .= "'$lName'=$lSaV{$lName};;;;";

	return($lList);
}

sub gatherInnodbIo
{
	my $dbh = $_[0];

	my ($rc, %lSaV) = &gatherStatusAndVariables($dbh);
	if ( $rc ) {
		return($lSaV{'error'});
	}

	my ($lName, $lList);

	$lName = 'innodb_data_pending_fsyncs';
	$lList .= "'$lName'=$lSaV{$lName};;;;";

	$lList .= ' ';

	$lName = 'innodb_data_pending_reads';
	$lList .= "'$lName'=$lSaV{$lName};;;;";

	$lList .= ' ';

	$lName = 'innodb_data_pending_writes';
	$lList .= "'$lName'=$lSaV{$lName};;;;";

	return($lList);
}

sub gatherInnodbData
{
	my $dbh = $_[0];

	my ($rc, %lSaV) = &gatherStatusAndVariables($dbh);
	if ( $rc ) {
		return($lSaV{'error'});
	}

	my ($lName, $lList);

	$lName = 'innodb_data_read';
	$lList .= "'$lName'=$lSaV{$lName};;;;";

	$lList .= ' ';

	$lName = 'innodb_data_written';
	$lList .= "'$lName'=$lSaV{$lName};;;;";

	return($lList);
}

sub gatherInnodbLogfile
{
	my $dbh = $_[0];

	my ($rc, %lSaV) = &gatherStatusAndVariables($dbh);
	if ( $rc ) {
		return($lSaV{'error'});
	}

	my ($lName, $lList);

	$lName = 'innodb_log_waits';
	$lList .= "'$lName'=$lSaV{$lName};;;;";

	$lList .= ' ';

	$lName = 'innodb_log_write_requests';
	$lList .= "'$lName'=$lSaV{$lName};;;;";

	$lList .= ' ';

	$lName = 'innodb_log_writes';
	$lList .= "'$lName'=$lSaV{$lName};;;;";

	return($lList);
}

sub gatherInnodbRowLocking
{
	my $dbh = $_[0];

	my ($rc, %lSaV) = &gatherStatusAndVariables($dbh);
	if ( $rc ) {
		return($lSaV{'error'});
	}

	my ($lName, $lList);

	$lName = 'innodb_row_lock_waits';
	$lList .= "'$lName'=$lSaV{$lName};;;;";

	return($lList);
}

sub gatherInnodbQueries
{
	my $dbh = $_[0];

	my ($rc, %lSaV) = &gatherStatusAndVariables($dbh);
	if ( $rc ) {
		return($lSaV{'error'});
	}

	my ($lName, $lList);

	$lName = 'innodb_rows_deleted';
	$lList .= "'$lName'=$lSaV{$lName};;;;";

	$lList .= ' ';

	$lName = 'innodb_rows_inserted';
	$lList .= "'$lName'=$lSaV{$lName};;;;";

	$lList .= ' ';

	$lName = 'innodb_rows_read';
	$lList .= "'$lName'=$lSaV{$lName};;;;";

	$lList .= ' ';

	$lName = 'innodb_rows_updated';
	$lList .= "'$lName'=$lSaV{$lName};;;;";

	return($lList);
}

sub gatherStatusAndVariables
{
	my $dbh = $_[0];

	my ($sql, $sth);
	my %aResultSet;
	my $lView;

	foreach $lView ( qw{STATUS VARIABLES} ) {

		$sql = "
			SHOW GLOBAL $lView
		";
		
		$sth = $dbh->prepare( $sql );
		if ( DBI::err ) {
			$aResultSet{error} = "Error in preparing: " . DBI::errstr;
			return(1, %aResultSet);
		}
		
		$sth->execute();
		if ( $sth->err ) {
			$aResultSet{error} = "Error in executing: " . $sth->errstr;
			return(1, %aResultSet);
		}
		
		my ($lVariable, $lValue);
		$sth->bind_columns(undef, \$lVariable, \$lValue);
		if ( $sth->err ) {
			$aResultSet{error} = "Error in binding: " . $sth->errstr;
			$sth->finish;
			return(1, %aResultSet);
		}
		
		while ( $sth->fetchrow_arrayref() ) {
			$aResultSet{lc($lVariable)} = $lValue;
		};
		if ( $sth->err ) {
			$aResultSet{error} = "Error in fetchting:" . $sth->err;
			$sth->finish;
			return(1, %aResultSet);
		}
		
		$sth->finish;
	}

	$_ = $aResultSet{version};
	m/^(\d{1,2})\.\d{1,2}\.\d{1,2}.*$/;

	# Versions before 5.0 did not have the show status values with innodb
	# information!
	if ( $1 < 5 ) {

		$sql = "
			SHOW INNODB STATUS
		";
		
		$sth = $dbh->prepare( $sql );
		if ( DBI::err ) {
			$aResultSet{error} = "Error in preparing: " . DBI::errstr;
			return(1, %aResultSet);
		}
		
		$sth->execute();
		if ( $sth->err ) {
			$aResultSet{error} = "Error in executing: " . $sth->errstr;
			return(1, %aResultSet);
		}
		
		my ($lContent);
		$sth->bind_columns(undef, \$lContent);
		if ( $sth->err ) {
			$aResultSet{error} = "Error in binding: " . $sth->errstr;
			$sth->finish;
			return(1, %aResultSet);
		}
		
		if ( $sth->fetchrow_arrayref() ) {

			foreach ( split("\n", $lContent) ) {

				chomp;

				if (  m/^Buffer pool size\s+(\d+)$/ ) {
					$aResultSet{'innodb_buffer_pool_pages_total'} = $1;
					next;
				}

				if (  m/^Free buffers\s+(\d+)$/ ) {
					$aResultSet{'innodb_buffer_pool_pages_free'} = $1;
					next;
				}

				if (  m/^Database pages\s+(\d+)$/ ) {
					$aResultSet{'innodb_buffer_pool_pages_data'} = $1;
					next;
				}

				if (  m/^Pending reads\s+(\d+)$/ ) {
					$aResultSet{'innodb_data_pending_reads'} = $1;
					next;
				}

				if (  m/^Number of rows inserted (\d+), updated (\d+), deleted (\d+), read (\d+)$/ ) {
					$aResultSet{'innodb_rows_inserted'} = $1;
					$aResultSet{'innodb_rows_updated'} = $2;
					$aResultSet{'innodb_rows_deleted'} = $3;
					$aResultSet{'innodb_rows_read'} = $4;
					next;
				}
			}

			$aResultSet{'innodb_buffer_pool_pages_misc'} = 0;
			$aResultSet{'innodb_buffer_pool_read_requests'} = 0;
			$aResultSet{'innodb_buffer_pool_reads'} = 0;
			$aResultSet{'innodb_buffer_pool_write_requests'} = 0;
			$aResultSet{'innodb_buffer_pool_wait_free'} = 0;
			$aResultSet{'innodb_data_pending_fsyncs'} = 0;
			$aResultSet{'innodb_data_pending_writes'} = 0;
			$aResultSet{'innodb_data_read'} = 0;
			$aResultSet{'innodb_data_written'} = 0;
			$aResultSet{'innodb_log_waits'} = 0;
			$aResultSet{'innodb_log_write_requests'} = 0;
			$aResultSet{'innodb_log_writes'} = 0;
			$aResultSet{'innodb_row_lock_waits'} = 0;

		};
		if ( $sth->err ) {
			$aResultSet{error} = "Error in fetchting:" . $sth->err;
			$sth->finish;
			return(1, %aResultSet);
		}
		$sth->finish;
	}

	return(0, %aResultSet);
}

my ($pPort, $pSocket);

my $rc = GetOptions(
  'help|?'       => \$pHelp
, 'user|u=s'     => \$pUser
, 'password|p=s' => \$pPassword
, 'host|h=s'     => \$pHost
, 'port|P=i'     => \$pPort
, 'socket|S=s'   => \$pSocket
, 'module|m=s'   => \$pModule
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

my $lOutput = &callModule($dbh, $pModule);

$dbh->disconnect;

# if ( icinga ) 
	# For icinga this seems to be the appropriate output:
	# print("Perfdata $lOutput|$lOutput");
# elsif ( nagios )
	print("$lOutput");
# fi

exit($lError{'OK'});
