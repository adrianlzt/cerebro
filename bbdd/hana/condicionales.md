select
  (
    CASE
      WHEN (select TO_VARCHAR(CURRENT_TIMESTAMP, 'HH24MI') from dummy) > 1500 THEN
        TO_DATE(TO_VARCHAR(CURRENT_TIMESTAMP, 'YYYYMMDD'))
      ELSE
        TO_DATE(TO_VARCHAR(ADD_DAYS(CURRENT_TIMESTAMP, -1), 'YYYYMMDD'))
    END
  ) as fecha
from
  dummy;
