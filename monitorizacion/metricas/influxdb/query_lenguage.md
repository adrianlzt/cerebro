http://influxdb.com/docs/v0.7/api/query_language.html

# Getting a List of Time Series
list series
-- or this
select * from /.*/ limit 1
  esta dará un error si alguna serie no tiene ningún dato
  l

# Tiempo
select value from response_times where time > '2013-08-12 23:32:01.232' and time < '2013-08-13';

select value from response_times where time > now() - 1h limit 1000;

select value from response_times where time > 1388534400s


# Multiples series
select * from events, errors;

Get the last hour of data from the two series events, and errors. Here’s a regex example:
select * from /^stats\./i where time > now() - 1h;


# Delete
delete from response_times where time < now() - 1h

delete from /^stats.*/ where time < now() - 7d

delete from response_times where user = 'foo'


# Where
select * from events where state = 'NY';

select * from log_lines where line =~ /error/i;

select * from events where customer_id = 23 and type = 'click';

select * from response_times where value > 500;


# Group By
-- count of events in 10 minute intervals
select count(type) from events group by time(10m);

-- count of each unique type of event in 10 minute intervals
select count(type) from events group by time(10m), type;

-- 95th percentile of response times in 30 second intervals
select percentile(value, 95) from response_times group by time(30s);


# Fill
-- devuelve un valor para cada hora, haya o no datos en ese momento
select count(type) from events group by time(1h) fill(0) where time > now() - 3h


# Merge series
select count(type) from user_events merge admin_events group by time(10m)


# Join
-- Return a time series of the combined cpu load for hosts a and b. The individual points will be coerced into the closest time frames to match up.
select hosta.value + hostb.value
from cpu_load as hosta
inner join cpu_load as hostb
where hosta.host = 'hosta.influxdb.orb' and hostb.host = 'hostb.influxdb.org';
