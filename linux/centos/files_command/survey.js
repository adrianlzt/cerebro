/*global define*/
/*jslint browser: true*/

/**
 * This is a module for retrieving URLs from the Satmetrix web service.
 * Satmetrix is providing user surveys, and we must call their API to get a URL
 * which we can then provide to our users in the form of a hyperlink.
 *
 * @module survey
 * @author Michael Clayton <mclayton@redhat.com>
 * @copyright Red Hat 2014
 *
 */


define(['jquery', 'chrome_lib', 'moment'], function ($, lib, moment) {

    var SUCCESS_EVENT = 'satmetrix_success_event';
    var STORE_ID      = 'sm_srv_id_';
    var TAKEN_ID      = 'sm_srv_status_';

    var create_url    = '/services/satmetrix/app/core/ws/extservices/com.satmetrix.core.server.fbk.provider.FbkProviderEntityUtilService/CREATE_PARTY';
    var update_url    = '/services/satmetrix/app/core/ws/extservices/com.satmetrix.core.server.fbk.provider.FbkProviderEntityUtilService/UPDATE_PARTY';

    var devtoken = "MTYAAAAAAAAAAJp2mXIp9xsVa+Su9vxV0kMTyuYi+u/5zUqRogiI3XJDpLaATWdaB+HjfeUuD9g96OUgLNJkDJ2lAnuwSI91h0r8Bqk42zRkAV2HBds/rCKe";
    var prodtoken = "MTYAAAAAAAAAAOKamq4TrcheuFkreRTBpGXgzgDmPX7ga/8hPZF9t59TaG9VUliQ8HxRyXHG7hQ7UJxnQgD+yEZ3ajvU8DNTmSE=";

    var request_xml = '<?xml version="1.0" encoding="UTF-8"?>\n' +
        '<utilService>\n' +
        '    <companyIdfier>REDHAT</companyIdfier>\n' +
        '    <securityToken>{TOKEN}</securityToken>\n' +
        '    <sendMail>N</sendMail>\n' +
        '    <communicationType>INVITATION</communicationType>\n' +
        '    <fbkProvider ' +
        '        companyIdfier="CONSUMER" ' +
        '        fbkTypeCode="TRANSACTIONAL_SUPPORT" ' +
        '        datacollectionIdfier="{SURVEY_ID}" ' +
        '        defaultFbkLocaleCode="en_US" ' +
        '        enabledYN="Y" ' +
        '        personIdfier="{PERSON_ID}" ' +
        '        preferTextOnlyEmailYN="Y" ' +
        '        preferredFbkMediumTypeCode="EMAIL" ' +
        '        primaryEmailAddrText="noreply@redhat.com" ' +
        '        personIdentifier="noreply@redhat.com" ' +
        '        providerIdfier="{PROVIDER_ID}">\n' +

        '        <fbkProviderT-list>\n' +
        '            <fbkProviderT ' +
        '                localeCode="en_US" ' +
        '                nameT="Valued Customer" ' +
        '                personFNameT="Valued" ' +
        '                personLNameT="Customer" ' +
        '                sourceLocaleCode="en_US" ' +
        '                translatedTimestamp="{TIMESTAMP}"/>\n' +
        '        </fbkProviderT-list>\n' +
        '        <fbkProviderX-list>\n' +
        '            <fbkProviderX PORTAL_PAGE_LAST_V_48733657379="{REFERRING_URL}" PORTAL_EMAIL_18743513748="{USER_EMAIL}" enabledYN="Y" />\n' +
        '        </fbkProviderX-list>\n' +
        '    </fbkProvider>\n' +
        '</utilService>';

    function extract_link(xml_response) {
        var link = xml_response.querySelector('row').getAttribute('InvitationLink');
        return link;
    }

    /**
     * Find out whether the given survey was taken by this user.
     * @param {string} survey_id The ID of the survey.
     * @memberof module:survey
     * @private
     */
    function is_survey_taken(survey_id) {
        return lib.store.local.get(TAKEN_ID + survey_id) === 'done';
    }

    /**
     * Get a URL to a survey from the Satmetrix API.
     *
     * @param {string} survey_id A string identifying which survey to retrieve.
     * Implementation dependent.  Currently the survey ID comes from Satmetrix.
     * @param {function} callback A function that will be run once their API
     * returns a valid link.  The URL will be passed into the callback
     * functions as a string.
     * @memberof module:survey
     * @example
     * chrometwo_require(['survey'], function(survey) {
     *     survey.get_survey_link(function(url) { console.log("satmetrix returns url: " + url) });
     * });
     */
    function get_survey_link(survey_id, callback) {
        var uid = lib.getCookieValue('chrome_session_id');

        // If a survey link cookie already exists, just return that.
        var stored_url   = lib.store.local.get(get_store_id(survey_id));
        var survey_taken = is_survey_taken(survey_id);

        if (survey_taken) {
            return;
        } else if (stored_url) {

            $(function() {
                $(document).trigger(SUCCESS_EVENT);
                callback(stored_url);
            });
            return stored_url;

        } else {

            // Get the XML from satmetrix, extract the link, and pass the link into
            // the user-defined callback;
            create_survey(uid, survey_id, function (xml_response) {
                callback(extract_link(xml_response));
            });
        }
    }

    /**
     * Get an ID for this survey, normally used as the key to store the
     * survey's link.
     * @param {string} survey_id The ID of the survey.
     * @memberof module:survey
     * @private
     */
    function get_store_id(survey_id) {
        return STORE_ID + survey_id;
    }

    function get_token() {
        var retval;
        if (window.location.href.indexOf('access.redhat.com') === 8) {
            retval = prodtoken;
        } else {
            retval = devtoken;
        }
        return retval;
    }

    function get_request_xml(id, email, survey_id) {

        var request_subbed = request_xml;
        var timestamp = moment().format('YYYY-MM-DDTHH:mm:ss.SS');

        request_subbed = request_subbed.replace('{PROVIDER_ID}', id);
        request_subbed = request_subbed.replace('{PERSON_ID}', id);
        request_subbed = request_subbed.replace('{REFERRING_URL}', location.href);
        request_subbed = request_subbed.replace('{USER_EMAIL}', email);
        request_subbed = request_subbed.replace('{TIMESTAMP}', timestamp);
        request_subbed = request_subbed.replace('{SURVEY_ID}', survey_id);
        request_subbed = request_subbed.replace('{TOKEN}', get_token());

        return request_subbed;
    }

    /**
     * Attempt to create a survey link.
     */
    function create_survey(id, survey_id, callback) {
        post(create_url, id, survey_id, callback);
    }

    function update_survey(id, survey_id, callback) {
        post(update_url, id, survey_id, callback);
    }

    /**
     * Check the returned XML to be sure it's successful (ie. it contains a
     * link to a survey).
     *
     */
    function contains_link(xml_response) {
        var row = xml_response.querySelector('row');
        var is_valid = row !== null &&
            typeof row.getAttribute === 'function' &&
            row.getAttribute('InvitationLink') !== null;
        return is_valid;
    }

    function post(url, id, survey_id, success, fail) {
        var request_data = get_request_xml(id, 'noreply@redhat.com', survey_id);

        // If success and fail handlers weren't passed in, set them to NOPs.
        var success_fn   = (typeof success === 'function') ? success : function(){};
        var fail_fn      = (typeof fail    === 'function') ? fail    : function(){};

        $.ajax(url, {
            type: 'POST',
            contentType: 'text/xml',
            data: request_data,
            dataType: 'text xml'
        }).success(function (data) {
            if (contains_link(data)) {
                lib.store.local.set(get_store_id(survey_id), extract_link(data));
                $(document).trigger(SUCCESS_EVENT);
                success_fn(data);
            } else {
                fail_fn(data);
            }
        }).fail(function (data) {
            fail_fn(data);
        });
    }

    return {
        get_survey_link: get_survey_link
    };

});

