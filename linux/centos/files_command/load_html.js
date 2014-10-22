/*global document, window, define, localStorage*/
/*jslint evil: true */

define('load_html', ["jquery"], function ($) {
	'use strict';

	if (typeof document.getElementsByTagName('html')[0] === 'undefined' || document.getElementsByTagName('html')[0].className.indexOf('chrometwo') === -1) {
		return;
	}

	function getLang() {
		var lang, portal, rh;

		lang = 'en';
		portal = document.cookie.match(/chrome_locale=([a-zA-Z_]*)/);
		if ((portal !== null) && (portal.length === 2)) {
			lang = portal[1];
		} else {
			rh = document.cookie.match(/rh_locale=([a-zA-Z_]*)/);
			if ((rh !== null) && (rh.length === 2)) {
				lang = rh[1];
			}
		}
		return lang;
	}

	function getSnippet(type, html) {
		var matchString, snippet;
		matchString = '<!-- PORTAL_' + type + '_START -->((.|\n)*)<!-- PORTAL_' + type + '_END -->';
		snippet =  html.match(new RegExp(matchString))[1];
		return snippet;
	}

	function editPage(html, d) {
		var body, original, jsTextFunction;

		// console.log('in editPage ' + (new Date().getTime() - d));
		// d = new Date();

		$('html head').prepend(getSnippet('HEAD', html));

		// console.log('head insert ' + (new Date().getTime() - d));
		// d = new Date();

		// DE5451: making sure the dom switching code is not executed until the dom is ready
		$(document).ready(function () {

			// Do things without JQ here to ensure we preserve comments, script tags, etc.
			body = document.getElementsByTagName('body')[0];


			original = document.getElementById('main').cloneNode(true);

			if ($.browser.msie && +$.browser.version === 8) {
				// IE8 MUST wrap certain script tags in a form tag. Why? IE sucks
				body.innerHTML = getSnippet('WRAPPER', html).replace('<script', '<form><script').replace('</script>', '</script></form>');
				jsTextFunction = function (obj) {
					return obj.html();
				};
			} else {
				body.innerHTML = getSnippet('WRAPPER', html);
				jsTextFunction = function (obj) {
					return obj.text();
				};
			}


			$('body').addClass('chrometwoComplete');
			$('html').addClass('chrometwoComplete');
			$('#main-top').prepend('<div id="breadcrumbs" class="tmp"><a href="#"></a></div>');

			// console.log('body insert ' + (new Date().getTime() - d));
			// d = new Date();

			// run/fetch scripts
			$.ajaxSetup({async: false});
			$('body').find('script').each(function () {
				var jqthis = $(this);
				if (jqthis.attr('src')) {
					$.getScript(jqthis.attr('src'));
				} else {
					if (jsTextFunction(jqthis).indexOf("document.write(unescape('%3C')") === -1) { // this line is a hack to skip that silly omniture stuff from destroying the page
						eval(jsTextFunction(jqthis));
					}
				}
			});
			$.ajaxSetup({async: true});

			// console.log('scripts invoke ' + (new Date().getTime() - d));
			// d = new Date();

			document.getElementById('content').appendChild(original);
			// console.log('original html insert ' + (new Date().getTime() - d));

			// remove chrometwo.css, because it should only be applied while chrometwo is loading
            var c2css = document.querySelector("head > link[href*='/chrome_themes/umbra/s/chrometwo.css']");
            c2css.parentNode.removeChild(c2css);

			$(document).trigger('portal_chrome_ready');
			window.PORTAL_CHROME_READY = true;
		});
	}


	(function () {
		var d, start, debug, lang, html, obj, storage_key;

		storage_key = "chrometwo";
		if ($('html').hasClass('bootstrap3')) {
			storage_key = storage_key + ".boostrap3";
		}

		d = new Date();
		start = new Date();

		debug = false;
		lang = getLang();
		html = null;

		if (typeof localStorage !== 'undefined') {
			obj = null;

			try {
				obj = JSON.parse(localStorage.getItem(storage_key));
			} catch (e) {
			}

			if (obj !==  null) {
				if (debug === false  && (lang === obj.lang) && ((d - new Date(obj.lastFetched)) < 600000)) {
					html = obj.html;
					if (html !== null) {
						editPage(html, d);
					}
				}
			}
		}

		if (html === null) {
			$.ajax({
				timeout: 30000,
				url: '/services/chrome/chrometwo?lang=' + lang + '&' + ($('html').hasClass('bootstrap3') ? 'bootstrap3=true' : ''),
				success: function (html) {
					var obj;

					editPage(html, d);
					if (typeof localStorage !== 'undefined') {
						obj = {};
						obj.html = html;
						obj.lastFetched = d;
						obj.lang = lang;
						localStorage.removeItem(storage_key);
						localStorage.setItem(storage_key, JSON.stringify(obj));
					}
				},
				async: false
			});
		}

		// console.log('total elapsed time ' + (new Date().getTime() - start));
	}());
});
