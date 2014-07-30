Plugin "aggregation"
    The Aggregation plugin makes it possible to aggregate several values into one using aggregation functions such as sum, average, min and max.  This can be put
    to a wide variety of uses, e.g. average and total CPU statistics for your entire fleet.

<Plugin "aggregation">
  <Aggregation>
    Plugin "cpu"
    Type "cpu"

    GroupBy "Host"
    GroupBy "TypeInstance"

    CalculateSum true
    CalculateAverage true
  </Aggregation>
</Plugin>

