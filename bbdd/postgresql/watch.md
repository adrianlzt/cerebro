https://til.hashrocket.com/posts/75fa841555-watch-for-database-changes-on-postgresql

\watch 1 "select * from job_queue";

This will run the query every 1 second (you can change the second argument if you need it slower) and display the result as well as past results.
