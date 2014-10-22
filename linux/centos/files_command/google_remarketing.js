/*global define*/
/*jslint browser: true*/

/**
 * This module adds a simple Google Remarketing tag.  See [this
 * document](https://mojo.redhat.com/docs/DOC-183487) for a thorough
 * description.
 *
 * @module google_remarketing
 * @author Michael Clayton <mclayton@redhat.com>
 * @copyright Red Hat 2014
 *
 */

define(function () {

    /**
     * Add the Google Remarketing tag.
     *
     * @memberof module:google_remarketing
     *
     * @example
     * chrometwo_require(['google_remarketing'], function(google_remarketing) {
     *     google_remarketing.add_tag();
     * });
     */
    function add_tag() {
        var img = document.createElement('img');
        img.src = "//googleads.g.doubleclick.net/pagead/viewthroughconversion/990030321/?value=0&label=rxV4CN_35QQQ8dOK2AM&guid=ON&script=0";
    }

    return {
        add_tag : add_tag
    };

});


