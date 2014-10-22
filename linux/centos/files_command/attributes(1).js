/*global require, define*/
/*jslint browser: true*/

/**
 * Omniture-specific values and functions.
 *
 * @module analytics/adapters/omniture/attributes
 * @author Michael Clayton <mclayton@redhat.com>
 * @copyright Red Hat 2013-2014
 */
define(['analytics/separators', 'analytics/adapters/omniture/old_props', 's_code'], function (separators) {

    "use strict";

    var NAME      = "omniture",
        s_proxy   = {}, // our version of omniture's 's' object.

        /**
         * Before reporting attributes to omniture, some attributes need a
         * prefix added.  A common prefix is "cp | " for 'Customer Portal'.
         * This `prefix` object defines those prefixes.  Each attribute in the
         * `AttributeMap` that needs a prefix will reference the name of a
         * property in `prefix`, which will let this adapter know to use prefix
         * when constructing the value to send to Omniture.  The same goes for
         * the `separator` object.  The strings inside the `separator` object
         * are used to separate attribute values which are arrays.
         * Essentially, array.join(separator) will be performed.
         */
        prefix    = { cp: "cp | " },
        AttributeMap;

    AttributeMap = {
        ABTestCampaign        : {evar: 59},
        Architecture          : {prop: 73},
        CampaignExternal      : {},
        CampaignInternal      : {evar: 1},
        Category              : {separator: "semicolon"},
        Channel               : {evar: 32, name: "channel"},
        Collection            : {},
        Component             : {separator: "semicolon"},
        ContentSubType        : {prop: 15, evar: 28},
        CustomerNumber        : {evar: 63},
        FacetedSearchValues   : {prop: 6, evar: 13},
        GroupID               : {evar: 66},
        Hierarchy             : {name: "hier1", separator: "comma" },
        InfrastructureStr     : {prop: 9},
        KCSState              : {separator: "semicolon"},
        KnowledgeMeta         : {prop: 64, separator: "pipe"},
        Language              : {prop: 2, evar: 22},
        ErrorPageName         : {prop: 60, name: "pageName", prefix: "cp"},
        ErrorPageType         : {name: "pageType"},
        ErrorReferringChannel : {prop: 58},
        ErrorChannel          : {prop: 59},
        ErrorType             : {evar: 60},
        OmniturePersona       : {prop: 1, evar: 3},
        CertifiedVendorProduct: {prop: 67, separator: "pipe"},
        OmnitureVisitor       : {evar: 41},
        OnSiteSearch          : {},
        OnSiteSearchValue     : {prop: 17, evar: 4},
        NoSearchResults       : {name: "events"},
        PageName              : {name: "pageName", prefix: "cp"},
        PageRank              : {evar: 65},
        Platform              : {},
        Products              : {name: "products", list: true},
        PublicationState      : {separator: "semicolon"},
        Rating                : {prop: 71},
        ResourceID            : {prop: 13, evar: 26, separator: "pipe"},
        ResourceTitle         : {prop: 16, evar: 29},
        ResourceType          : {prop: 14, evar: 27},
        SBR                   : {separator: "semicolon"},
        CodeVersion           : {prop: 10, evar: 20},
        SeverityLevel         : {prop: 74},
        Tags                  : {prop: 66},
        TargetURL             : {},
        ToolName              : {evar: 33, prop: 33},
        TrueURL               : {prop: 21, evar: 18},
        URL                   : {prop: 4, evar: 23},
        UseType               : {},
        UserLogin             : {evar: 37},
        UserNumber            : {evar: 36},
        UserSearchEvent       : {},
        UserSessionID         : {prop: 62, evar: 62},
        VideoResolution       : {prop: 72},
        VideoSegmentTitle     : {evar: 39},
        VideoTitle            : {prop: 38, evar: 38},
        VisitNumber           : {evar: 42},
        isAuthenticated       : {},
        isEntitled            : {},
        isInternal            : {},
        isSupportEntitled     : {}
    };

    /**
     * This function defines Omniture-specific rules for value formatting.
     *
     */
    function prep_value(attribute_name, value) {
        var retval,
            mapped_attr    = AttributeMap[attribute_name],
            has_prefix     = mapped_attr.hasOwnProperty('prefix'),
            has_separator  = mapped_attr.hasOwnProperty('separator'),
            attr_prefix    = has_prefix ? prefix[mapped_attr.prefix] : '',
            attr_separator = has_separator ? separators[mapped_attr.separator] : separators.pipe,
            is_list_prop   = mapped_attr.list === true;

        if (value instanceof Array) {
            if (is_list_prop) {
                retval = ';' + attr_prefix + value.join(',;');
            } else {
                retval = attr_prefix + value.join(attr_separator);
            }
        } else {
            retval = attr_prefix + value;
            if (is_list_prop) {
                // a 'list prop' with a single item still needs a ; at the beginning
                retval = ';' + retval;
            }
        }
        return retval.trim();
    }

    function set_s_attr(s, attr) {
        if (AttributeMap.hasOwnProperty(attr.name)) {
            var mapped_attr      = AttributeMap[attr.name],
                raw_value        = attr.value,
                om_value         = prep_value(attr.name, raw_value),
                raw_value_exists = typeof raw_value !== "undefined" && raw_value !== "";

            // Only proceed if the attribute's value is defined and isn't empty
            // string.
            if (raw_value_exists) {
                // If the attribute has a prop#, add it
                if (mapped_attr.hasOwnProperty("prop")) {
                    s["prop" + mapped_attr.prop] = om_value;
                }

                // If the attribute has an eVar#, add it
                if (mapped_attr.hasOwnProperty("evar")) {
                    s["eVar" + mapped_attr.evar] = om_value;
                }

                // If the attribute has a named var (ex: s.channel), add it
                if (mapped_attr.hasOwnProperty("name")) {
                    if (mapped_attr.name === "events") {
                        // if this is an "events" attribute, either add or
                        // remove it as an event
                        if (raw_value === false) {
                            require('analytics/adapters/omniture/events').remove_event_value(s, om_value);
                        } else {
                            require('analytics/adapters/omniture/events').add_event_value(s, om_value);
                        }
                    } else {
                        // otherwise this is a "normal" named attribute, like
                        // s.products or s.pageType or s.hier, so just add its value
                        s[mapped_attr.name] = om_value;
                    }
                }
            }
        }
    }

    function build_s_object(attributes_in) {
        var attr;
        s_proxy = {}; // reset the s_proxy
        for (attr in attributes_in) {
            if (attributes_in.hasOwnProperty(attr)) {
                set_s_attr(s_proxy, attributes_in[attr]);
            }
        }

        // Set prop75 to the same value as pageName for all s.t() calls.
        s_proxy.prop75 = s_proxy.pageName;

        return s_proxy;
    }

    function send(attributes_in) {

        var s_code,
            s_prop,
            s_proxy,
            i;

        // Here be (small) dragons.  Some attributes need some tender
        // love-n-care before we send them off to omniture.  Any per-attribute
        // formatting customizations go here.

        // Only send the first two characters of the Language attribute to
        // Omniture.  So sayeth the wise Kwatkins.
        if (typeof attributes_in.all.Language !== "undefined") {
            if (typeof attributes_in.all.Language.value !== "undefined") {
                // TODO revisit this when other adapters are added.  This will
                // affect any adapters that are triggered after omniture.
                attributes_in.all.Language.value = attributes_in.all.Language.value.slice(0, 2);
            }
        }

        // The hierarchy attribute needs commas stripped from the individual
        // values, because they are joined with commas
        if (typeof attributes_in.all.Hierarchy !== "undefined") {
            if (typeof attributes_in.all.Hierarchy.value !== "undefined") {
                // TODO revisit this when other adapters are added.  This will
                // affect any adapters that are triggered after omniture.
                //attributes_in.all.Language.value = attributes_in.all.Language.value.slice(0, 2);
                for (i = 0; i < attributes_in.all.Hierarchy.value.length; i += 1) {
                    // Array.map weeps for IE8 :(
                    attributes_in.all.Hierarchy.value[i] = attributes_in.all.Hierarchy.value[i].replace(/,/g, '');
                }
            }
        }

        // The NoSearchResults attribute is really an "event" in Omniture's
        // terminology, and thus belongs in the `s.events` string.  Here, make
        // sure it doesn't overwrite the existing `s.events` string (if any).
        if (typeof attributes_in.all.NoSearchResults !== "undefined") {
            if (typeof attributes_in.all.NoSearchResults.value !== "undefined") {
                if (attributes_in.all.NoSearchResults.value) {
                    attributes_in.all.NoSearchResults.value = "event69";
                }
            }
        }

        s_proxy = build_s_object(attributes_in.all);

        if (typeof window.s === "object") {

            // Copy all of s_proxy's properties onto omniture's s object.
            for (s_prop in s_proxy) {
                if (s_proxy.hasOwnProperty(s_prop)) {

                    // If it's s.events, add to the existing event string,
                    // otherwise copy the value onto the s object directly
                    if (s_prop === "events") {
                        require('analytics/adapters/omniture/events').add_event_value(window.s, s_proxy[s_prop]);
                    } else {
                        window.s[s_prop] = s_proxy[s_prop];
                    }
                }
            }

            // send all the things to omniture
            s_code = window.s.t();


        } else {
            require(['chrome_lib'], function (lib) {
                lib.log('OmnitureNotFoundError: Couldn\'t find Omniture\'s window.s object.', 'error');
            });
        }

        return s_proxy;

    }

    return {
        name       : NAME,
        send       : send,
        prep_value : prep_value,
        attributes : AttributeMap
    };

});
