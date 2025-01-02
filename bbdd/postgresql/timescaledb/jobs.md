select * from timescaledb_information.jobs;

Ejecutarlo en la db donde queramos ver los jobs.

Modificar job:
<https://docs.timescale.com/api/latest/actions/alter_job/>

SELECT alter_job(1006, next_start => '2023-12-22 15:00:00.0+00');

Si el job está con next_start puesto a -infinity:
"""
When a job begins, the `next_start` parameter is set to `infinity`. This
prevents the job from attempting to be started again while it is running. When
the job completes, whether or not the job is successful, the parameter is
automatically updated to the next computed start time.
"""
