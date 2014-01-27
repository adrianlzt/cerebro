http://dashboarddude.com/blog/2013/12/16/dashboard-giraffe/

## Features ##

Stackable metrics.

One-click changing between (pre-set) time periods.

Customizable summary methods and display information.

Configuration is done with JavaScript objects.


## Good For ##

Browsing time periods is really easy. With one click you can see you metrics with fidelity from 10 minutes to 7 weeks (and a bunch of sensible values in-between).

No server is required, so getting up and running is as simple as editing dashboard.js and opening the directory in your browser locally.

Detailed example dashboards are provided, so you can follow along.

Stacking similar metrics is a simple as using a wildcard or specifying multiple targets, and they’ll all show up on one graph.

Its summary details/legend can be shown/hidden as part of the display. It includes things like the range of values over the viewed time period, which is a nice time-saver for relevant metrics.


## Not so Good For ##

Viewing lots of metrics starts to eat a lot of RAM (regardless of how they’re laid out). This issue is probably caused by Rickshaw (rather than Giraffe), but knowing that doesn’t solve the problem.

The layout doesn’t use the all space available, which makes it less attractive as a monitoring dashboard. The config defaults to a 3-graphs-per-row layout, and while you can make graphs span multiple columns (even more than the default 3), I couldn’t get the graphs to scale-out to my wide display.

Fine metrics being compared to each other can be difficult to see because multiple metrics on one graph are stacked. Being stacked means that the ordering of the metrics is important, and it’s not easy to change on the fly (you have to edit the dashboard configuration object). Note that you can toggle the visibility of metrics in the interface, but this still requires some manual intervention.

Configuration is a bit complicated, but only because there are a lot of options/aliases/etc. It’s much easier to set up when you already have a clear idea of the metrics you want to display.
