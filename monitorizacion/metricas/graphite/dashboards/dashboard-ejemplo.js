{
  "title": "New Dashboard",
  "services": {
    "filter": {
      "list": [],
      "time": {
        "from": "now-5m",
        "to": "now"
      }
    }
  },
  "rows": [
    {
      "title": "Hostname",
      "height": "20px",
      "editable": true,
      "collapse": false,
      "collapsable": true,
      "panels": [
        {
          "error": false,
          "span": 12,
          "editable": true,
          "type": "text",
          "loadingEditor": false,
          "mode": "markdown",
          "content": "# client2.com",
          "style": {},
          "title": "Bluevia"
        }
      ],
      "notice": false
    },
    {
      "title": "Service metrics",
      "height": "150px",
      "editable": true,
      "collapse": false,
      "collapsable": true,
      "panels": [
        {
          "span": 6,
          "editable": true,
          "type": "graphite",
          "loadingEditor": false,
          "x-axis": true,
          "y-axis": true,
          "scale": 1,
          "y_format": "none",
          "y2_format": "none",
          "grid": {
            "max": null,
            "min": 0
          },
          "annotate": {
            "enable": false,
            "query": "*",
            "size": 20,
            "field": "_type",
            "sort": [
              "_score",
              "desc"
            ]
          },
          "auto_int": true,
          "resolution": 100,
          "interval": "1s",
          "intervals": [
            "auto",
            "1s",
            "1m",
            "5m",
            "10m",
            "30m",
            "1h",
            "3h",
            "12h",
            "1d",
            "1w",
            "1y"
          ],
          "lines": true,
          "fill": 0,
          "linewidth": 1,
          "points": false,
          "pointradius": 5,
          "bars": false,
          "stack": true,
          "spyable": true,
          "zoomlinks": false,
          "options": false,
          "legend": true,
          "interactive": true,
          "legend_counts": true,
          "timezone": "browser",
          "percentage": false,
          "zerofill": true,
          "nullPointMode": "connected",
          "steppedLine": false,
          "tooltip": {
            "value_type": "cumulative",
            "query_as_alias": true
          },
          "targets": [
            {
              "target": "icinga.bluevia_client2.com.check_load.*"
            }
          ],
          "aliasColors": {},
          "aliasYAxis": {},
          "title": "Load",
          "leftYAxisLabel": "Load",
          "rightYAxisLabel": ""
        },
        {
          "span": 6,
          "editable": true,
          "type": "graphite",
          "loadingEditor": false,
          "x-axis": true,
          "y-axis": true,
          "scale": 1,
          "y_format": "none",
          "y2_format": "none",
          "grid": {
            "max": null,
            "min": 0
          },
          "annotate": {
            "enable": false,
            "query": "*",
            "size": 20,
            "field": "_type",
            "sort": [
              "_score",
              "desc"
            ]
          },
          "auto_int": true,
          "resolution": 100,
          "interval": "1s",
          "intervals": [
            "auto",
            "1s",
            "1m",
            "5m",
            "10m",
            "30m",
            "1h",
            "3h",
            "12h",
            "1d",
            "1w",
            "1y"
          ],
          "lines": true,
          "fill": 0,
          "linewidth": 1,
          "points": false,
          "pointradius": 5,
          "bars": false,
          "stack": true,
          "spyable": true,
          "zoomlinks": false,
          "options": false,
          "legend": true,
          "interactive": true,
          "legend_counts": true,
          "timezone": "browser",
          "percentage": false,
          "zerofill": true,
          "nullPointMode": "connected",
          "steppedLine": false,
          "tooltip": {
            "value_type": "cumulative",
            "query_as_alias": true
          },
          "targets": [
            {
              "target": "icinga.bluevia_client2.com.check_users.users"
            }
          ],
          "aliasColors": {},
          "aliasYAxis": {},
          "title": "Users"
        }
      ],
      "notice": false
    },
    {
      "title": "Host metrics",
      "height": "150px",
      "editable": true,
      "collapse": false,
      "collapsable": true,
      "panels": [
        {
          "span": 6,
          "editable": true,
          "type": "graphite",
          "loadingEditor": false,
          "x-axis": true,
          "y-axis": true,
          "scale": 1,
          "y_format": "none",
          "y2_format": "none",
          "grid": {
            "max": null,
            "min": 0
          },
          "annotate": {
            "enable": false,
            "query": "*",
            "size": 20,
            "field": "_type",
            "sort": [
              "_score",
              "desc"
            ]
          },
          "auto_int": true,
          "resolution": 100,
          "interval": "1s",
          "intervals": [
            "auto",
            "1s",
            "1m",
            "5m",
            "10m",
            "30m",
            "1h",
            "3h",
            "12h",
            "1d",
            "1w",
            "1y"
          ],
          "lines": true,
          "fill": 0,
          "linewidth": 1,
          "points": false,
          "pointradius": 5,
          "bars": false,
          "stack": true,
          "spyable": true,
          "zoomlinks": false,
          "options": false,
          "legend": true,
          "interactive": true,
          "legend_counts": true,
          "timezone": "browser",
          "percentage": false,
          "zerofill": true,
          "nullPointMode": "connected",
          "steppedLine": false,
          "tooltip": {
            "value_type": "cumulative",
            "query_as_alias": true
          },
          "targets": [
            {
              "target": "icinga.bluevia_client2.com.hostcheck.pl"
            }
          ],
          "aliasColors": {},
          "aliasYAxis": {},
          "title": "Packet loss"
        },
        {
          "span": 6,
          "editable": true,
          "type": "graphite",
          "loadingEditor": false,
          "x-axis": true,
          "y-axis": true,
          "scale": 1,
          "y_format": "none",
          "y2_format": "none",
          "grid": {
            "max": null,
            "min": 0
          },
          "annotate": {
            "enable": false,
            "query": "*",
            "size": 20,
            "field": "_type",
            "sort": [
              "_score",
              "desc"
            ]
          },
          "auto_int": true,
          "resolution": 100,
          "interval": "1s",
          "intervals": [
            "auto",
            "1s",
            "1m",
            "5m",
            "10m",
            "30m",
            "1h",
            "3h",
            "12h",
            "1d",
            "1w",
            "1y"
          ],
          "lines": true,
          "fill": 0,
          "linewidth": 1,
          "points": false,
          "pointradius": 5,
          "bars": false,
          "stack": true,
          "spyable": true,
          "zoomlinks": false,
          "options": false,
          "legend": true,
          "interactive": true,
          "legend_counts": true,
          "timezone": "browser",
          "percentage": false,
          "zerofill": true,
          "nullPointMode": "connected",
          "steppedLine": false,
          "tooltip": {
            "value_type": "cumulative",
            "query_as_alias": true
          },
          "targets": [
            {
              "target": "icinga.bluevia_client2.com.hostcheck.rta"
            }
          ],
          "aliasColors": {},
          "aliasYAxis": {},
          "title": "Return time Avg"
        }
      ],
      "notice": false
    }
  ],
  "editable": true,
  "failover": false,
  "panel_hints": true,
  "style": "dark",
  "pulldowns": [
    {
      "type": "filtering",
      "collapse": false,
      "notice": false,
      "enable": false
    }
  ],
  "nav": [
    {
      "type": "timepicker",
      "collapse": false,
      "notice": false,
      "enable": true,
      "status": "Stable",
      "time_options": [
        "5m",
        "15m",
        "1h",
        "6h",
        "12h",
        "24h",
        "2d",
        "7d",
        "30d"
      ],
      "refresh_intervals": [
        "5s",
        "10s",
        "30s",
        "1m",
        "5m",
        "15m",
        "30m",
        "1h",
        "2h",
        "1d"
      ],
      "now": true
    }
  ],
  "loader": {
    "save_gist": false,
    "save_elasticsearch": true,
    "save_local": true,
    "save_default": true,
    "save_temp": true,
    "save_temp_ttl_enable": true,
    "save_temp_ttl": "30d",
    "load_gist": false,
    "load_elasticsearch": true,
    "load_elasticsearch_size": 20,
    "load_local": false,
    "hide": false
  },
  "refresh": false
}