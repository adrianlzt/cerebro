#!/usr/bin/python
# encoding: utf-8

def paint_my_own_icon(what, row, tags, custom_vars):
    """
    what:        The type of the current object
                 string "host" or "service"
    row:         The livestatus row for the current object.
                 A dictionary of host attributes
    tags:        List of cmk tags for this object
    custom_vars: Dict of objects custom variables
    """
    return repr(row)

multisite_icons.append({
    # List of host/service columns to be used in this icon
    'columns':         [ 'icon_image' ],
    # List of columns to be used in this icon when rendering as host
    'host_columns':    [],
    # List of columns to be used in this icon when rendering as service
    'service_columns': [],
    # The paint function as mentioned above
    'paint':           paint_my_own_icon,
})

