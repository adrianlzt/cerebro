/*global define, window, chrometwo_require, document*/

/**
 * define the module and return the MLT object
 */
define('more_like_this', ['jquery', 'jsUri', 'chrome_lib'], function ($, Jsuri, lib) {
	"use strict";

	var supported_resource_types = ['articles', 'solutions'];

	/**
	 * Adds analytics to the more like this anchors
	 * TODO rewrite this using the new analytics framework
	 *
	 * @param {object} element The place to start looking for anchors
	 */
	function addAnalytics(element) {
		var anchor, dataType;
		element.find('a[href]').each(function () {
			anchor = $(this);
			anchor.click(function (e) {
				dataType = this.getAttribute("data-value");
				// preventDefault is not needed here because the links have
				// target="_blank" so their href opens in a new tab/window.
				chrometwo_require(['analytics/main'], function (analytics) {
					analytics.trigger('MoreLikeThis' + dataType, e);
				});
			});
		});
	}

	return {

		/**
		 * Creates a More Like This block
		 *
		 * @param {object} override_options The configuration object for the
		 * block creation of the block.  This object must has two required
		 * parameters:
		 * @param {object} override_options.id the id of the KCS Solution or Article
		 * @param {object} override_options.type the type of resource that this MLT block will display.  Examples: "articles" or "solutions"
		 * @param {object} override_options.selector the jQuery selector to be used when inserting the block
		 * @param {object} [override_options.method] the jQuery method used to insert the block (i.e. append,
		 *   after, etc.).  If method is a function, then the passed in
		 *   function will be invoked and the "block" (a jQuery element object)
		 *   and the "data" (the JSON response from the More Like This service)
		 *   will be passed in.
		 * @param {object} [override_options.block_header] the header that will appear on the block (i.e. 'More
		 *   Like This')
		 */

		create: function (override_options) {
			var strataJsUri, options, default_options, moreLikeThisBlock, service_url, type, dataType;

			/**
			* Display the "No results found" text.
			*/
			function displayNoResults() {
				moreLikeThisBlock.find('.loading').remove();
				moreLikeThisBlock.find('.content').append('<p>' + options.no_results_text + '</p>');
			}

			try {
				// Backwards compatibility: if no second parameter is provided, default to 'solutions'.
				if (typeof override_options.type === "undefined") {
					type = "solutions";
				} else {
					// If the caller requested an invalid resource type, throw an error.
					if (supported_resource_types.indexOf(override_options.type) >= 0) {
						type = override_options.type;
					} else {
						throw new Error('Invalid More Like This type: ' + override_options.type);
					}
				}

				service_url = '/rs/' + type;
				// die asap if the user does not have auth cookies, or the required options are undefined
				if (lib.getAuthorizationValue('chrome_user_info') === false || lib.getCookieValue('rh_user') === "" || typeof override_options.selector === 'undefined' || typeof override_options.id === 'undefined') {
					return;
				}

				// defaults
				default_options = {
					method: 'append',
					block_header: 'More Like This',
					no_results_text: 'No recommendations found.'
				};

				// build the options
				options = $.extend(true, {}, default_options, override_options);

				// build the strata URI
				strataJsUri = new Jsuri(window.portal.host);
				strataJsUri.protocol('https');
				// ALL OF /rs SHOULD BE PROXIED AT THIS POINT!!!
				strataJsUri.host(strataJsUri.host());
				strataJsUri.path(service_url);
				strataJsUri.addQueryParam('keyword', 'id:' + options.id);
				strataJsUri.addQueryParam('mltDocSearch', 'true');
				strataJsUri.addQueryParam('limit', '5');

				// wait for DOM ready before finding the MLT block and firing the AJAX request
				$(document).ready(function() {
					// find the More Like This element (it's added by drupal now)
					moreLikeThisBlock = $('#moreLikeThis');

					$.ajax({
						type: 'GET',
						method : 'GET',
						headers: {
							'Accept' : 'application/json',
							'X-Omit': 'WWW-Authenticate'
						},
						contentType : 'application/json',
						url: strataJsUri.toString(),
						xhrFields: {
							withCredentials: true
						},
						crossDomain: true
					}).done(function (data) {
						var ul, type_prop, prop;

						if (typeof data === 'string') {
							data = JSON.parse(data);
						}

						moreLikeThisBlock.find('.loading').remove();
						// if there are articles|solutions, add them to the block, else add no results text
						if (data !== null) {

							// `data` only has one property, but we can't be sure
							// what it's called.  it will be either "solution" or
							// "article" based on what type of resource was
							// returned from the Strata MLT service.  instead of
							// trying to figure out what it should be called, we'll
							// just grab the only property the data object has.
							for (prop in data) {
								if (data.hasOwnProperty(prop)) {
									type_prop = prop;
								}
							}
							// If the MLT service didn't return anything, we can't
							// continue, so only proceed if type_prop IS defined.
							if (typeof type_prop !== "undefined") {
								dataType = $.trim(type_prop).charAt(0).toUpperCase() + type_prop.slice(1);
								ul = moreLikeThisBlock.find('ul');
								$.each(data[type_prop], function (i, resource) {
									ul.append('<li><span class="icon-' + type_prop + '" aria-hidden="true"></span> <a href="' + resource.view_uri  + '" data-value="' + dataType + '" target="_blank">' + resource.title + '</a></li>');
								});

								if (typeof options.method === 'function') {
									// if the user sent a function as the method, exec it with the newly built block and data
									options.method(moreLikeThisBlock, data);
								} else {
									// run the jquery method
									addAnalytics(ul);
								}
							} else {
								displayNoResults();
							}
						} else {
							displayNoResults();
							return;
						}

						$(document).trigger('MoreLikeThisDone');
					}).error(function () {
						displayNoResults();
					});

				});

			} catch (e) {
				$(document).ready(function() {
					moreLikeThisBlock = $('#moreLikeThis');
					moreLikeThisBlock.find('.loading').remove();
				});
				lib.log('more_like_this error: ' + e);
			}
		}
	};
});
