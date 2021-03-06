package errorLogFilterRules;

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
use warnings;

use Exporter qw(import);

our @EXPORT_OK = qw(getRules);

sub getRules {

	# Timestamp for 5.6 and older
	# my $fTimestamp = '\d{4,6}(-\d{2}){0,2}\s*\d{1,2}:\d{2}:\d{2}';
	# Timestamp for 5.7 and older
	my $fTimestamp = '\d{4,6}(-\d{2}){0,2}[\sT]{1}\d{1,2}:\d{2}:\d{2}(\.\d{6}Z)?';

	my @aFilterRules = (
		  '^.*: ready for connections.?$'
		, '^\} joined \{$'
		, '^\} left \{$'
		, '^\} partitioned \{$'
		, '^\}\)$'
		, '^Age_limit:\s+\d+$'
		, '^blocks used:\s+\d+$'
		, '^default$'
		, '^handlersocket: initialized$'
		, '^InnoDB: \d+ rollback segment\(s\) active.$'
		, '^InnoDB: a new database to be created!$'
		, '^InnoDB: Apply batch completed$'
		, '^InnoDB: buffer...$'
		, '^InnoDB: Compressed tables use zlib \d+.\d+.\d+$'
		, '^InnoDB: Compressed tables use zlib \d+.\d+.\d+.\d+$'
		, '^InnoDB: Creating foreign key constraint system tables$'
		, '^InnoDB: Database physically writes the file full: wait...$'
		, '^InnoDB: Doublewrite buffer created$'
		, '^InnoDB: Doublewrite buffer not found: creating new$'
		, '^InnoDB: Foreign key constraint system tables created$'
		, '^InnoDB: Last MySQL binlog file position \d+ \d+, file name .*$'
		, '^InnoDB: log sequence number \d* \d*.$'
		, '^InnoDB: Mutexes and rw_locks use GCC atomic builtins\.?$'
		, '^InnoDB: Mutexes and rw_locks use InnoDB\'s own implementation$'
		, '^InnoDB: Progress in percents:(\s\d*)*$'
		, '^InnoDB: Reading tablespace information from the .ibd files...$'
		, '^InnoDB: Setting log file .* size to \d* MB$'
		, '^InnoDB: The first specified data file .* did not exist:$'
		, '^InnoDB: The InnoDB memory heap is disabled$'
		, '^Number of processes running now: \d*$'
		, '^Version: \'.*\'  socket: \'.*\'  port: \d*\s*.*$'

		, '^\d{6}\s*\d{1,2}:\d{2}:\d{2} mysqld_safe WSREP: Running position recovery with --log_error=/tmp/tmp..*$'
		, '^\d{6}\s*\d{1,2}:\d{2}:\d{2} mysqld_safe WSREP: Recovered position [0-9a-f\-]+:\d+$'

		, '^\s+[0-9a-f\-]+,0$'
		, '^\s+version    = \d,$'
		, '^\s+component  = PRIMARY,$'
		, '^\s+conf_id    = \d,$'
		, '^\s+members    = \d/\d \(joined/total\),$'
		, '^\s+act_id     = \d+,$'
		, '^\s+last_appl\. = -?\d,$'
		, '^\s+protocols  = \d/\d/\d \(gcs/repl/appl\),$'
		, '^\s+group UUID = [0-9a-f\-]+$'

		, '^\s+<size from="\d+" to="\d+" total="\d+" count="\d+"/>$'

		, '^<malloc version="\d+">$'
		, '^<heap nr="\d+">$'
		, '^<sizes>$'
		, '^<unsorted from="\d+" to="\d+" total="\d+" count="\d+"/>$'
		, '^</sizes>$'
		, '^<total type="fast" count="\d+" size="\d+"/>$'
		, '^<total type="rest" count="\d+" size="\d+"/>$'
		, '^<system type="current" size="\d+"/>$'
		, '^<system type="max" size="\d+"/>$'
		, '^<aspace type="total" size="\d+"/>$'
		, '^<aspace type="mprotect" size="\d+"/>$'
		, '^</heap>$'
		, '^</malloc>$'

		, '^Key caches:$'
		, '^Buffer_size:\s+\d+$'
		, '^Block_size:\s+\d+$'
		, '^Division_limit:\s+\d+$'
		, '^not flushed:\s+\d+$'
		, '^w_requests:\s+\d+$'
		, '^writes:\s+\d+$'
		, '^r_requests:\s+\d+$'
		, '^reads:\s+\d+$'
		, '^handler status:$'
		, '^read_key:\s+\d+$'
		, '^read_next:\s+\d+$'
		, '^read_rnd\s+\d+$'
		, '^read_first:\s+\d+$'
		, '^write:\s+\d+$'
		, '^delete\s+\d+$'
		, '^update:\s+\d+$'
		, '^Table status:$'
		, '^Opened tables:\s+\d+$'
		, '^Open tables:\s+\d+$'
		, '^Open files:\s+\d+$'
		, '^Open streams:\s+\d+$'
		, '^Alarm status:$'
		, '^Active alarms:\s+\d+$'
		, '^Max used alarms:\s+\d+$'
		, '^Next alarm time:\s+\d+$'
		, '^Events status:$'
		, '^LLA = Last Locked At  LUA = Last Unlocked At$'
		, '^WOC = Waiting On Condition  DL = Data Locked$'
		, '^Event scheduler status:$'
		, '^State\s+: INITIALIZED$'
		, '^Thread id\s+: \d+$'
		, '^LLA\s+: n/a:\d+$'
		, '^LUA\s+: n/a:\d+$'
		, '^WOC\s+: NO$'
		, '^Workers\s+: \d+$'
		, '^Executed\s+: \d+$'
		, '^Data locked: NO$'
		, '^Event queue status:$'
		, '^Element count\s+: \d+$'
		, '^Data locked\s+: NO$'
		, '^Attempting lock\s+: NO$'
		, '^LLA\s+: init_queue:\d+$'
		, '^LUA\s+: init_queue:\d+$'
		, '^LLA\s+: create_event:\d+$'
		, '^LUA\s+: create_event:\d+$'
		, '^WOC\s+: NO$'
		, '^Next activation\s+: never$'
		, '^Status information:$'
		, '^Current dir: .*$'
		, '^Running threads: \d+  Stack size: \d+$'
		, '^Current locks:$'
		, '^lock: 0x[0-9A-Fa-f]+:$'
		, '^Age_threshold:\s+\d+$'
		, '^Partitions:\s+\d+$'
		, '^Memory status:$'
		, '^Non-mmapped space allocated from system:\s+\d+$'
		, '^Number of free chunks:\s+\d+$'
		, '^Number of fastbin blocks:\s+\d+$'
		, '^Number of mmapped regions:\s+\d+$'
		, '^Space in mmapped regions:\s+\d+$'
		, '^Maximum total allocated space:\s+\d+$'
		, '^Space available in freed fastbin blocks:\s+\d+$'
		, '^Total allocated space:\s+\d+$'
		, '^Total free space:\s+\d+$'
		, '^Top-most, releasable space:\s+\d+$'
		, '^Estimated memory \(with thread stack\):\s+\d+$'
		
		, '^WSREP_SST: \[INFO\]\s.*$'
		,'^\s+Version\s+: \d'
		,'^LUA\s+: drop_schema_events:\d+$'
		,'^LLA\s+: drop_schema_events:\d+$'
		,'^lock: 0x7fcca800d2f0: write$'

		, '^[-=]{34,43}$'
		, '^TABLE: name \w+/\w+, id \d+, flags \d+, columns \d+, indexes \d+, appr.rows \d+$'
		, '^\s{2}COLUMNS: \w+:.*;\s+$'
		, '^\s{2}INDEX: name \w+, id \d+, fields \d+/\d+, uniq \d+, type \d+$'
		, '^\s{3}root page \d+, appr.key vals \d+, leaf pages \d+, size pages \d+$'
		, '^\s{3}FIELDS:  .*$'
		, '^\s{2,5}FOREIGN KEY CONSTRAINT \w+/\w+: \w+/\w+ \( \w+ \)$'
		, '^\s+REFERENCES \w+/\w+ \( \w+ \)$'
		, '^END OF INNODB TABLE MONITOR OUTPUT$'
		, '^Warning: Using innodb_table_monitor is deprecated and it may be removed in future releases. Please use the InnoDB INFORMATION_SCHEMA tables instead, see .*$'
		, '^TABLE: name SYS_DATAFILES, id \d+, flags \d+, columns \d+, indexes \d+, appr.rows \d+$'
		, '^TABLE: name SYS_FOREIGN, id \d+, flags \d+, columns \d+, indexes \d+, appr.rows \d+$'
		, '^TABLE: name SYS_FOREIGN_COLS, id \d+, flags \d+, columns \d+, indexes \d+, appr.rows \d+$'
		, '^TABLE: name SYS_TABLESPACES, id \d+, flags \d+, columns \d+, indexes \d+, appr.rows \d+$'


		, '^' . $fTimestamp . '\s+[0-9a-f]+ InnoDB: FTS Optimize Removing table \w+/\w+$'
		, '^' . $fTimestamp . '\s+[0-9a-f]+ INNODB TABLE MONITOR OUTPUT$'

		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] .*: ready for connections.$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] .*: Shutdown complete$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] .*: Normal shutdown$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] .*mysqld: Shutdown complete.*$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] .*/mysqld \(.*\) starting as process \d+ ...$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\]   - \'.*\' resolves to \'.*\';$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] Barry Leslie, PrimeBase Technologies GmbH, http://www.primebase.org$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] Binlog end$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] Error reading relay log event: slave SQL thread was killed$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] Event Scheduler: Loaded \d+ events.*$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] Event Scheduler: Purging the queue. \d+ events.*$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] Forcefully disconnecting remaining clients$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] Forcefully disconnecting \d remaining clients$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] Giving client threads a chance to die gracefully$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] Giving \d+ client threads a chance to die gracefully$'

		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] InnoDB: .* started; log sequence number \d+$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] InnoDB:  Percona XtraDB .* started; log sequence number \d+$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] InnoDB: \d.\d.\d started; log sequence number \d+$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] InnoDB: \d+ redo rollback segment\(s\) found. \d+ redo rollback segment\(s\) are active.$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] InnoDB: \d+ rollback segment\(s\) are active.$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] InnoDB: \d+ non-redo rollback segment\(s\) are active.$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] InnoDB: Completed initialization of buffer pool$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] InnoDB: Compressed tables use zlib \d.\d.\d$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] InnoDB: CPU does not support crc32 instructions$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] InnoDB: Creating shared tablespace for temporary tables$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] InnoDB: File \'.*\' size is now \d+ MB.$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] InnoDB: FTS optimize thread exiting.$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] InnoDB: GCC builtin __sync_synchronize\(\) is used for memory barrier$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] InnoDB: Highest supported file format is Barracuda.$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] InnoDB: Initializing buffer pool, size = .*$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] InnoDB: Initializing buffer pool, total size = \\d+.\dM, instances = \d, chunk size = \d+.\dM$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] InnoDB: Mutexes and rw_locks use GCC atomic builtins$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] InnoDB: Number of pools: \d$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] InnoDB: Waiting for purge to start$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] InnoDB: Setting file \'.*\' size to \d+ MB. Physically writing the file full; Please wait ...$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] InnoDB: Starting shutdown...$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] InnoDB: Shutdown completed; log sequence number \d+$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] InnoDB: The InnoDB memory heap is disabled$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] InnoDB: Uses event mutexes$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] InnoDB: Using atomics to ref count buffer pool pages$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] InnoDB: Using CPU crc32 instructions$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] InnoDB: Using Linux native AIO$'

		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] IPv6 is available.$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] NDB: Creating mysql.ndb_\w+$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] NDB: Flushing mysql.ndb_\w+$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] NDB: NodeID is \d+, management server \'localhost:\d+\'$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] NDB\[\d+\]: NodeID: \d+, all storage nodes connected$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] NDB Binlog: starting log at epoch \d+/\d+$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] NDB Binlog: Node: \d+, down, Subscriber bitmask \d+$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] NDB Binlog: cluster failure for ./mysql/ndb_\w+ at epoch \d+/\d+.$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] NDB Binlog: ndb tables writable$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] NDB Binlog: ndb tables initially read only on reconnect.$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] NDB Binlog: Ndb tables initially read only.$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] NDB Binlog: CREATE TABLE Event: REPL\$mysql/ndb_\w+$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] NDB Binlog: logging \./mysql/ndb_\w+ \(UPDATED,USE_WRITE\)$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] Paul McCullagh, PrimeBase Technologies GmbH, http://www.primebase.org$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] Plugin \'FEEDBACK\' is disabled.$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] Plugin \'FEDERATED\' is disabled.$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] PrimeBase XT \(PBXT\) Engine .* loaded...$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] PrimeBase XT Engine shutdown...$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] PrimeBase BLOB Management Sysytem \(PBMS\) Daemon \d+.\d+.\d+ loaded...$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] PrimeBase BLOB Management Sysytem \(PBMS\) Daemon Setting Server ID: \d+$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] PrimeBase BLOB Management Sysytem \(PBMS\) Daemon listening on port \d+$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] PrimeBase Media Stream Daemon no longer published$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] Restarting Cluster Binlog$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] RSA private key file not found: .* Some authentication plugins will not work.$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] RSA public key file not found: .* Some authentication plugins will not work.$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] Server hostname \(bind-address\): \'.*\'; port: \d+$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] Server socket created on IP: \'.*\'.$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] Shutting down plugin \'\w+\'$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] Shutting down slave threads$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] Slave SQL thread initialized, starting replication in log \'.*\' at position \d*, relay log \'.*\' position: \d*$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] Slave I/O thread exiting, read up to log \'.*\', position \d*$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] Slave SQL thread exiting, replication stopped in log \'.*\' at position \d*$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] Slave I/O thread killed while reading event$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] Slave I/O thread killed while connecting to master$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] Slave I/O thread: connected to master \'.*\',\s*replication started in log \'.*\' at position \d*$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] Slave: connected to master \'.*\',replication resumed in log \'.*\' at position \d*$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] Start binlog_dump to slave_server\(\d+\), pos\(bin-log.\d+, \d+\)$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] Starting Cluster Binlog Thread$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] Stopping Cluster Binlog$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] Stopping Cluster Utility thread$'

		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] WSREP: \([0-9a-f\-]+, \'tcp://\d{1,3}(\.\d{1,3}){3}:\d+\'\) listening at tcp://\d{1,3}(\.\d{1,3}){3}:\d+$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] WSREP: \([0-9a-f\-]+, \'tcp://\d{1,3}(\.\d{1,3}){3}:\d+\'\) multicast: , ttl: \d$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] WSREP: apply mon: entered \d+$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] WSREP: Assign initial position for certification: \d+, protocol version: -\d$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] WSREP: Assign initial position for certification: \d+, protocol version: \d$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] WSREP: avg cert interval \d$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] WSREP: avg deps dist \d+$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] WSREP: backend: asio$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] WSREP: cert index size \d$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] WSREP: cert index usage at exit \d+$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] WSREP: cert trx map usage at exit \d+$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] WSREP: Changing maximum packet size to \d+, resulting msg size: \d+$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] WSREP: CRC-32C: using hardware acceleration.$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] WSREP: declaring .* stable$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] WSREP: deps set usage at exit \d+$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] WSREP: EVS version \d+$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] WSREP: Flow-control interval: \[\d+, \d+\]$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] WSREP: Flushing memory map to disk...$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] WSREP: Found saved state: [0-9a-f\-]+:\d+$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] WSREP: gcomm: connecting to group \'Galera \d+\.\d+\.\d+\', peer \'\'$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] WSREP: gcomm: connected$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] WSREP: gcomm: joining thread$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] WSREP: GMCast version \d+$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] WSREP: GMCast::handle_stable_view: view\(\(empty\)\)$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] WSREP: inited wsrep sidno \d$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] WSREP: Member 0.0 \(Node A\) synced with group.$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] WSREP: mon: entered \d+ oooe fraction \d+ oool fraction \d+$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] WSREP: New cluster view: global state: [0-9a-f\-]+:\d+, view# \d: Primary, number of nodes: \d, my index: \d, protocol version \d$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] WSREP: New COMPONENT: primary = yes, bootstrap = no, my_idx = \d, memb_num = \d$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] WSREP: Node [0-9a-f\-]+ state prim$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] WSREP: Opened channel \'Galera \d+\.\d+\.\d+\'$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] WSREP: Passing config to GCS: base_host = \d{1,3}(\.\d{1,3}){3}; base_port = \d+;.*$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] WSREP: Passing config to GCS: gcache.dir = .*$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] WSREP: PC version \d+$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] WSREP: protonet asio version \d+$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] WSREP: Quorum results:$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] WSREP: Read nil XID from storage engines, skipping position init$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] WSREP: Received self-leave message.$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] WSREP: recv_thread\(\) joined.$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] WSREP: RECV thread exiting \d+: Success$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] WSREP: REPL Protocols: \d \(\d, \d\)$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] WSREP: Restored state OPEN -> JOINED \(\d+\)$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] WSREP: Reusing existing \'.*\'.$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] WSREP: Service thread queue flushed.$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] WSREP: Setting initial position to [0-9a-f\-]+:\d+$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] WSREP: Shifting CLOSED -> DESTROYED \(TO: \d+\)$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] WSREP: Shifting CLOSED -> OPEN \(TO: \d\)$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] WSREP: Shifting JOINED -> SYNCED \(TO: \d+\)$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] WSREP: SST complete, seqno: \d+$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] WSREP: Start replication$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] WSREP: STATE_EXCHANGE: sent state UUID: .*$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] WSREP: STATE EXCHANGE: sent state msg: .*$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] WSREP: STATE EXCHANGE: got state msg: .* from \d \(.*\)$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] WSREP: Synchronized with group, ready for connections$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] WSREP: Using CRC-32C \(optimized\) for message checksums.$'
 		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] WSREP: view\(view_id\(PRIM,[0-9a-f\-]+,1\) memb {$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] WSREP: Waiting for SST to complete.$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] WSREP: wsdb trx map usage \d+ conn query map usage \d$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] WSREP: wsrep_load\(\): loading provider library \'.*\'$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] WSREP: wsrep_load\(\): Galera .* by Codership Oy .* loaded succes{1,2}fully.$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] WSREP: wsrep_notify_cmd is not defined, skipping notification.$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] WSREP: wsrep_start_position var submitted: \'[0-9a-f\-]+:\d+\'$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Note\] WSREP: wsrep_sst_grab\(\)$'

		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Warning\] TIMESTAMP with implicit DEFAULT value is deprecated. Please use --explicit_defaults_for_timestamp server option \(see documentation for more details\).$'
		, '^' . $fTimestamp . '\s+(\d+)?\s*\[Warning\] options --log-slow-admin-statements, --log-queries-not-using-indexes and --log-slow-slave-statements have no effect if --slow-query-log is not set$'
		, '^' . $fTimestamp . '\s*.*: Shutdown Complete$'
		, '^' . $fTimestamp . '\s*.*: Normal shutdown$'

		, '^' . $fTimestamp . '\s*InnoDB Plugin \d+.\d+.\d+ started; log sequence number \d+$'
		, '^' . $fTimestamp . '\s*InnoDB Plugin \d+.\d+.\d+-\d+ started; log sequence number \d+$'
		, '^' . $fTimestamp . '\s+InnoDB: \d+ rollback segment\(s\) are active.$'
		, '^' . $fTimestamp . '\s*InnoDB: \d+.\d+.\d+ started; log sequence number \d+$'
		, '^' . $fTimestamp . '\s*InnoDB: Completed initialization of buffer pool$'
		, '^' . $fTimestamp . '\s*InnoDB: Compressed tables use zlib \d+.\d+.\d+$'
		, '^' . $fTimestamp . '\s*InnoDB: Compressed tables use zlib \d+.\d+.\d+.\d+$'
		, '^' . $fTimestamp . '\s+InnoDB: CPU supports crc32 instructions$'
		, '^' . $fTimestamp . '\s+InnoDB: FTS optimize thread exiting.$'
		, '^' . $fTimestamp . '\s*InnoDB: highest supported file format is Barracuda.$'
		, '^' . $fTimestamp . '\s*InnoDB: Initializing buffer pool, size = \d+.\d+[GM]$'
		, '^' . $fTimestamp . '\s*InnoDB: Log file .* did not exist: new to be created$'
		, '^' . $fTimestamp . '\s*InnoDB: Mutexes and rw_locks use GCC atomic builtins$'
		, '^' . $fTimestamp . '\s*InnoDB: Setting file .* size to \d* MB$'
		, '^' . $fTimestamp . '\s*InnoDB: Shutdown completed$'
		, '^' . $fTimestamp . '\s*InnoDB: Shutdown completed; log sequence number \d*\s*\d*$'
		, '^' . $fTimestamp . '\s*InnoDB: Started$'
		, '^' . $fTimestamp . '\s*InnoDB: Started; log sequence number \d*\s*\d*$'
		, '^' . $fTimestamp . '\s*InnoDB: Starting an apply batch of log records to the database...$'
		, '^' . $fTimestamp . '\s*InnoDB: Starting log scan based on checkpoint at$'
		, '^' . $fTimestamp . '\s*InnoDB: Starting shutdown...$'
		, '^' . $fTimestamp . '\s*InnoDB: The InnoDB memory heap is disabled$'
		, '^' . $fTimestamp . '\s*InnoDB: Using Linux native AIO$'
		, '^' . $fTimestamp . '\s*InnoDB: Waiting for the background threads to start$'
		, '^' . $fTimestamp . '\s*mysqld (ended|started)$'
		, '^' . $fTimestamp . '\s*mysqld_safe mysqld from pid file .* ended$'
		, '^' . $fTimestamp . '\s*mysqld_safe Starting mysqld daemon with databases from .*$'
		, '^' . $fTimestamp . '\s*Percona XtraDB \(http://www.percona.com\) .* started; log sequence number \d+$'
		, '^' . $fTimestamp . '\s*\[NdbApi\] INFO     -- Flushing incomplete GCI:s \< \d+/\d+$'
	);

	return @aFilterRules;
}

1;
__END__
