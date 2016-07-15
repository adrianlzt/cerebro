Check clock skew between nodes using watch date or similar. Make sure your clocks are in UTC, not local time. Never local time. Especially never Daylight Savings Time. You can use Riemann's clock-skew stream to measure clock skew as seen by the Riemann node as well.


(unix-time)
183562487302/125

No se porque si pedimos unix-time lo da con ese extraño formato en forma de fracción




(riemann.common/time-at (unix-time))
Thu Jul 14 12:38:18 UTC 2016

