/*global ajq, jQuery, doAutoSuggest, setupAccountDropdown, setupLocalesDropdown, decorateOutgoingLinks, updateLoginLink, updateLanguagePicker, changeNavigationState, checkUserStatus, autogrowTextarea, sideNav, megaMenu, doOutageMessage, startIdleTimer, tempSqiIssue, toggleSearchBar, document, window, addBrowseLink, createBreadCrumb, placeBreadcrumbs, avalon, deleteCookies, breadcrumbs, delete_cookie, getApplication, NO_EXTERN, escape, unescape, createAnnouncements, avalonHost, handleLoginDiv, checkUserLanguage, handleLocaleDiv, siteMapState, portalOutageObj, chrometwo_require, portal*/
/*jslint todo:true, evil:true, white: true, browser: true*/

var onInputField = false;
var shiftStatus = false;
var ctrlStatus = false;
var altStatus = false;
var gStatus = false;
var filenameLimit = 80;
var filenameAlertPart1 = "The file name that you provided is too long. Please use a file name with less than ";
var filenameAlertPart2 = " characters.";
var original_values = [];

if (typeof String.prototype.trim === 'undefined') {
	String.prototype.trim = function () {
		"use strict";
		return this.replace(/^\s+|\s+$/g, '');
	};
}

if (typeof Array.prototype.indexOf === 'undefined') {
	Array.prototype.indexOf = function(element) {
		"use strict";
		return ajq.inArray(element, this);
	};
}

if (typeof Array.prototype.map === 'undefined') {
	Array.prototype.map = function(f) {
		var r=[], i, length = this.length;
		for(i=0; i < length; i++) {
			r.push(f(this[i]));
			return r;
		}
	};
}

// A hack to fix JQ plugins
function portal_hack_fix_plugins(jq, id) {
	var global_funcs,
		global_jq = window.jQuery,
		my_funcs;

	function getJqFunctions(tmp_jq) {
		var key,
			map = {};
		for (key in tmp_jq.fn) {
			if (tmp_jq.fn.hasOwnProperty(key)) {
				map[key] = key;
			}
		}
		return map;
	}

	global_funcs = getJqFunctions(global_jq);
	my_funcs = getJqFunctions(jq);

	for (var key in global_funcs) {
		if (global_funcs.hasOwnProperty(key)) {
			if (! my_funcs.hasOwnProperty(key)) {
				jq.fn[key] = global_jq.fn[key];
			}
		}
	}
}

// A hack to fix JQ plugins
if (typeof window.require === 'function') {
	window.require(['jquery'], function (jq) { portal_hack_fix_plugins(jq, 'require');  });
}
portal_hack_fix_plugins(window.ajq, 'base');

window.chrometwo_ready(function () {
	'use strict';

	do_labs_mods();

	//setupSearchBox();
	doAutoSuggest();
	setupAccountDropdown();
	setupLocalesDropdown();
	decorateOutgoingLinks();
	updateLanguagePicker();
	updateLoginLink();
	changeNavigationState();
	checkUserStatus();
	autogrowTextarea();
	//sideNav();
	megaMenu();
	doOutageMessage();
	doNotices();
	chrometwo_require(['dismiss'], function(d) { d.init(); });
	startIdleTimer();
	toggleSearchBar();
	tempSqiIssue();

	createBreadCrumb(); // Create breadcrumbs on the page
	placeBreadcrumbs();

	//Add a handler so that if any input has focus
	//   our keyboard shortcuts don't steal it
	ajq(":input").focus(function () {
		onInputField = true;
	}).blur(function () {
		onInputField = false;
	});

	// decorate <body> with class attribute representing the language
	ajq("body").addClass(avalon.lang);

	ajq('#accountLogout').click(function () { deleteCookies(); });

	ajq('[rel="tooltip"]').tooltip();

	/* If a link to a tab is clicked from the Nav and you're on the same page, actually reload the page and go to the tab. */
	ajq('#navPrimary .dropdown-menu a').click(function(e){
  	var href = ajq(this).attr('href');
  	var hashash = href.indexOf('#');
  	if ( (hashash != -1) && (window.location.href.split('#')[0] == href.split('#')[0]) ) {
  		  e.preventDefault();
  		  var newhash = href.split('#')[1];
  		  window.location.hash = '#' + newhash;
  		  window.location.reload();
  	}
	});

	ajq('#browse-tabs  .browse-page a').on('click', function () {

		var pageHref = (window.location).toString(),
			searchKeyword = '',
			newHref = ajq(this).attr('href');

		if ((pageHref.indexOf("search/case/") !== -1) && newHref.indexOf("/search/browse/") !== -1) {
			searchKeyword = ajq('#quickSearchform\\:quickSearchInput').val();
			ajq(this).attr('href', newHref + '#?&keyword=' + searchKeyword);
		}

	});

	ajq('#browse-tabs #browse-case').on('click', 'a', function (event) {
		event.preventDefault();
		var currentHref = (window.location).toString(),
			newHref = ajq(this).attr('href'),
			type = ajq(this).attr('data-value');

		// Construct the URL for the search
		if (currentHref.indexOf(newHref) === -1) {
			window.location = '/search/'+ type +'/?quickSearch=' + ajq('#quickSearchform\\:quickSearchInput').val();
		}

	});

	/* Fix Chrome/Firefox placeholder default behavior. Make placeholder text disappear on focus. */
	ajq('#home-search input:text').each(function(){
		var $this = ajq(this);
		$this.data('placeholder', $this.attr('placeholder'))
	 		.focus(function(){$this.removeAttr('placeholder');})
	 		.blur(function(){$this.attr('placeholder', $this.data('placeholder'));});
	});

	changeSearchTarget();
});

function do_labs_mods() {
	(function () {
		if (window.location.pathname.indexOf('/labs/') === 0 || window.location.pathname.indexOf('/labsinfo') === 0) {
			chrometwo_require(['labs_global'], function (labs_global) {
				labs_global.init();
			});
		}
	}());
}

function padZeroes(number) {
	"use strict";
	number = ajq.trim(number);
	number = new Array(8 - number.length + 1).join('0') + number;
	return number;
}

function changeSearchTarget() {
	ajq('#topSearchForm, #homePageSearchForm').submit(function () {
		var query = this.keyword.value;
		if (query !== null || typeof query !== 'undefined') {
			query = query.trim().toLowerCase();
			switch (true) {
				case /^case:\s*(\d{1,})$/.test(query) :
													number = query.split(':')[1];
													number = number.length < 8 ? padZeroes(number): number;
													window.location = '/support/cases/' + number;
													break;
				case /^case:(.*)/.test(query) :
													query = query.split(':')[1];
													window.location = '/search/case/?quickSearch=' + query;
													break;
				case /^doc-(\d*)/.test(query):
											number = query.split('-')[1];
											window.location = '/site/node/' + number;
											break;
				case /^it-(.*)/.test(query):
											window.location = '/support/cases/list/';
											break;
				default: location.href=this.action+'#keyword='+query;
			}
		}
		return false;
	});
}

function createAnnouncements() {
	"use strict";
	var html = '', title, link, publishedDate;
	ajq.ajax({
		url: "/site/announcements_feed.xml"
	}).done(function (data){
		if (ajq(data).find('node').length > 0) {
			html += '<div id="home-announcements" class="box-column full-column first-column"><div class="box-column-inner"><h2>Announcements</h2><div class="item-list"><ul>';
			ajq('node', data).each(function (i) {
				if (i > 2) {
					return;
				}

				title = ajq(this).find("title").text();
				link = ajq(this).find("link").text();
				publishedDate = ajq(this).find("published_date").text();
				html += '<li><h3><a href="' + link + '">' + title + '</a></h3><strong class="pubdate">' + publishedDate + '</strong></li>';
			});
			html += '<li class="more-link"><a href="/site/announcements">View All <span class="icon-caret-right" aria-hidden="true"></span></a></li></ul></div><div class="clear"></div></div></div>';
			ajq('#home-search').after(html);
		}
	}).fail(function (){
		return;
	});
}

// Function to handle the breadcrumbs object
function createBreadCrumb() {
	"use strict";
	var htmlString = "<div id='breadcrumbs'>",
		removeDividers,
		i,
		len;

	try {
		if (ajq('#breadcrumbs.tmp')) {
		ajq('#breadcrumbs.tmp').remove();
		}

		if (ajq('#breadcrumbs').length !== 0 || breadcrumbs.length === 0) {
		// find and remove any " &gt; " in existing breadcrumbs
		removeDividers = ajq('#breadcrumbs').html().replace(/\s+&gt;\s+/g, '');
		ajq('#breadcrumbs').html(removeDividers);
		} else {
		i = 0;
		len = breadcrumbs.length;
		for (i = 0; i < len - 1; i += 1) {
			htmlString = htmlString + "<a href='" + breadcrumbs[i][1] + "'>" + breadcrumbs[i][0] + "</a>";
		}
		htmlString = htmlString + breadcrumbs[i][0] + "</div>";
		ajq("#main-top").prepend(htmlString);
		}
	} catch (err) {
	}
}

function ieAccountBarHack() {
	"use strict";
	var width = 0,
		loginLis = ajq('#utility-links > div > ul > li'),
		element;
	loginLis.each(function () {
		element = ajq(this);
		width += element.outerWidth();
	});
	ajq('#utility-links').width(width + 20);
}

function tempSqiIssue() {
	"use strict";
	var form, checks, inputs;
	// CHANGE IN KBASE AND THEN REMOVE THIS!
	if (window.location.pathname.indexOf('/knowledge/solutions') === 0) {
		form = ajq('.sqiEvaluationForm');
		form.removeClass('sqiEvaluationForm');
		form.addClass('sqiEvaluationFormHack');
		ajq('.sqiEvaluationFormHack').click(function () {
			checks = 0;
			ajq('.sqiEvaluationFormHack > div > div').each(function () {
				inputs = ajq(this).find('input');
				checks += inputs.filter(':checked').length;
			});
			if (checks === 6) {
				ajq('.sqiEvaluationFormHack input:submit').removeAttr('disabled');
			}
		});
	}
}

function deleteCookies() {
	"use strict";
	var i = 0,
		cookies = ['SpryMedia_DataTables_caseListForm:supportCasesList_closed', 'SpryMedia_DataTables_caseListForm:supportCasesList_open', 'SpryMedia_DataTables_caseListForm:supportCasesList_list', 'SpryMedia_DataTables_caseListForm:supportCasesList_all'];
	for (i = 0; i < 4; i += 1) {
		delete_cookie(cookies[i]);
	}
}

function delete_cookie(cookie_name) {
	"use strict";
	var cookie_date = new Date();  // current date & time
	cookie_date.setTime(cookie_date.getTime() - 1);
	document.cookie = cookie_name += "=; expires=" + cookie_date.toGMTString();
}

function setupSearchBox() {
	"use strict";
	if (getApplication() === "kbase") {
		ajq("select[name=col] option[value=avalon_portal]").attr("selected", false);
		ajq("#searchDropRedhat").removeClass("selected");

		ajq("select[name=col] option[value=redhat_kbase]").attr("selected", true);
		ajq("#searchDropRedhat_kbase").addClass("selected");
		ajq(".portal-label").html(jQuery("select[name=col] option[value=redhat_kbase]").text());
	}
}

/**
* Sets up the dropdown menu for the accounts
*/
function setupAccountDropdown() {
	"use strict";
	// Hide the menu when clicked anywhere outside of it
	ajq(document).click(function (e) {
		if ((e.target.id !== "accountUserNameMenu") && (ajq(e.target).parents("#accountUserNameMenu").length !== 1)) {
			ajq("#accountUserNameMenu").hide();
			ajq("#accountUser").parent().removeClass("open");
		}
	});
	// Show the menu when #accountUserName is clicked
	ajq("#accountUserName").click(function (e) {
		ajq(this).blur();
		var accountUserWidth = ajq("#accountUser").width();
		ajq("#accountUserNameMenu").css('width', accountUserWidth).toggle();
		ajq("#accountUser").parent().toggleClass("open");
		ajq("#localesMenu").hide();
		ajq("#locales").parent().removeClass("open");
		e.preventDefault();
		e.stopPropagation();
	});
}

/**
* Sets up the dropdown menu for locales
*/
function setupLocalesDropdown() {
	"use strict";
	// Hide the menu when clicked anywhere outside of it
	ajq(document).click(function (e) {
		if ((e.target.id !== "localesMenu") && (ajq(e.target).parents("#localesMenu").length !== 1)) {
			ajq("#localesMenu").hide();
			ajq("#locales").parent().removeClass("open");
		}
	});

	// Show the menu when #accountUserName is clicked
	ajq("#localesLink").click(function (e) {
		ajq(this).blur();
		var localesWidth = ajq("#locales").width();
		ajq("#localesMenu").css('width', localesWidth).toggle();
		ajq("#locales").parent().toggleClass("open");
		ajq("#accountUserNameMenu").hide();
		ajq("#accountUser").parent().removeClass("open");
		e.preventDefault();
		e.stopPropagation();
	});
}

/**
* Get's the application from the path context
*
* return The name of the application
*/
function getApplication() {
	"use strict";
	var contexts = window.location.pathname.split("/"),
		context = "/" + contexts[1],
		context2 = "/" + contexts[2],
		context3 = "/" + contexts[3],
		context4 = '',
		appname = '';
	if (context === "/issue-tracker") {
		appname = "issue-tracker";
	} else if (context === avalon.cspContext) {
		if (context3.toLowerCase().indexOf("software") !== -1) {
			appname = "jbossnetwork_downloads";
		} else if (context3.toLowerCase().indexOf("case") !== -1) {
			appname = "jbossnetwork_support";
		} else {
			appname = "jbossnetwork";
		}
	} else if (context === avalon.kbaseContext) {
		appname = "kbase";
	} else if (context === "subscriptions") {
		appname = "ccActive";
	} else if (context === avalon.customerCenterContext && context2 === "/support") {
		context4 = contexts[4];
		if (context4 === "subscriptions.html") {
			appname = "ccActive";
		} else if (context4 === "renewals.html") {
			appname = "ccRenewals";
		} else {
			appname = "ccOverview";
		}
	}
	return appname;
}

/**
* Add the outgoing icon to non local links
*/
function decorateOutgoingLinks() {
	"use strict";
	var a = document.getElementsByTagName('a');
	if ((a.length > 1000) || (typeof NO_EXTERN !== 'undefined')) {
		ajq('#navPrimary a:not(:has(img))').filter(function () {
			if (this.hostname.indexOf('redhat.com') === -1) {
				return true;
			}
			return false;
		}).addClass('outgoing');
	} else {
		ajq('#container a[href]:not(:has(img)), .mega a:not(:has(img))').filter(function () {
			if (this.hostname.indexOf('redhat.com') === -1) {
				return true;
			}
			return false;
		}).addClass('outgoing');
	}
}

/**
* Handle language changer on docs pages
*/
function docsLanguageChange() {
	"use strict";
	var lang = ajq('#docsLanguage').val(),
	//var url = '/changeLanguage?language=' + lang + '&redirectTo=' + window.location.href;
		newDoc = window.location.href,
		url = '';
	if (newDoc.match(/locale=.*$/)) {
		newDoc = newDoc.replace(/locale=.*$/, "locale=" + lang);
	} else {
		newDoc = newDoc + "?locale=" + lang;
	}
	url = '/redirect?redirectTo=' + newDoc;
	window.location.href = url;
}

/**
* Updates the links in the language picker to include the current url
*/
function updateLanguagePicker() {
	"use strict";
	ajq("#localesMenu a").each(function () {
		this.href = this.href + "&redirectTo=" + escape(window.location);

		// Get rid of duplicate language parameter. Allow the proper,
		// single-valued parameter. Not the propagated one.
		var langParams = this.href.match(/language(=|%3D)/g).length;
		if (langParams > 1) {
			// Sometimes the commas are double escaped
			this.href = this.href.replace(/language(=|%3D)\w*?(,|%2C|%252C)\w*?(&|%26)/g, '');
		}
	});
}

function rebuildLanguagePicker() {
	"use strict";
	var newRegex, replaceRegex;
	ajq("#localesMenu a").each(function () {
		replaceRegex = new RegExp('&redirectTo' + '=([^&#]*)', 'g');
		newRegex = this.href.replace(replaceRegex, '&redirectTo=' + escape(window.location));
		this.href = newRegex;
	});
}

function updateLoginLink() {
	"use strict";
	ajq("#accountLogin, #caseSearchLogin").each(function () {
		this.href = this.href + "?redirectTo=" + escape(window.location);
	});
}

/**
* Sets the username in the header, instead of My Account
*
* hello The verbage for hello in the native language
* name The username to set
*/
function setUsername(hello, name) {
	"use strict";
	ajq('#accountUser').prepend("<span>" + hello + "</span> ");
	ajq('#accountUser #accountUserName').html(name);
	ajq('#accountUser #userFullName').html(name);
}

/**
* Sets the account number in the account username menu
*/
function setAccountNumber(accountNumber) {
	"use strict";
	if (accountNumber !== '' && typeof accountNumber !== "undefined") {
		ajq("#accountUserNameMenu .accountNumber .value").html(accountNumber);
	} else {
		ajq("#accountUserNameMenu .accountNumber").hide();
	}
}


/**
 * Changes the login div based on the authorized state
 *
 * authorized True or False based on the users login state
 * hello The verbage for hello in the navtive language
 * name The users name to display in header
 */
function handleLoginDiv(authorized, hello, name, accountNumber) {
	"use strict";
	if (authorized) {
		ajq("#accountLinksLoggedIn").css("display", "block");
		setUsername(hello, name);
		setAccountNumber(accountNumber);
		ajq('body').addClass('loggedIn').removeClass('loggedOut');
	} else {
		ajq("#accountLinksLoggedOut").css("display", "block");
		ajq('body').addClass('loggedOut').removeClass('loggedIn');
	}

	/*
	 * We need this here so that in IE we resize the #utility-links
	 * Also this needs to happen *after* the login div is handled
	 */
	// Remove this once we discontinue support for IE 7
	// TODO: remove this as we have discontinued support of IE7 :)
	if (ajq.browser.msie) {
		if (parseInt(ajq.browser.version, 10) <= 7) {
			ieAccountBarHack();
		}
	}
}

/**
 * Gets the users status from the service call.  Then changes the login status
 *    and handles unknown languages.
 */
function checkUserStatus() {
	"use strict";
	var data;
	chrometwo_require(['user_info'], function () {
		if (typeof portal === 'undefined' || typeof portal.user_info === 'undefined') { // wait for the event
			ajq(document).bind('user_info_ready', function(e, data) {
				doUserStatus(data);
			});
		} else { // in case the user user_info fires the event before base.js loads
			doUserStatus(portal.user_info);
		}
	});
}

function doUserStatus(data) {
	"use strict";
	handleLoginDiv(data.authorized, data.hello, data.name, data.account_number);
	checkUserLanguage(data.lang, data.lang_err_msg);
	handleLocaleDiv(data.lang);
}

/**
* Gets language name from laguage code
*
* lang The selected Language code
* Returns Language name in native language
*/
function getLanguageName(lang) {
	"use strict";
	switch (lang) {
	case "en":
		return "English";
	case "es":
		return "espa&ntilde;ol";
	case "de":
		return "Deutsch";
	case "it":
		return "italiano";
	case "ko":
		return "&#54620;&#44397;&#50612;";
	case "fr":
		return "fran&ccedil;ais";
	case "ja":
		return "&#26085;&#26412;&#35486;";
	case "pt":
		return "portugu&ecirc;s";
	case "zh_CN":
		return "&#20013;&#25991; (&#20013;&#22269;)";
	case "ru":
		return "&#1088;&#1091;&#1089;&#1089;&#1082;&#1080;&#1081;";
	}
}

/**
* Sets the language in the header, instead of Language
*
*/
function setLanguageMenu(langName) {
	"use strict";
	ajq('#locales #localesLink').html(langName);
}

/**
 * Changes the language div
 *
 * lang The selected Language
 */
function handleLocaleDiv(lang) {
	"use strict";
	ajq("#editions").css("display", "block");
	/* Need a better way to get full lang text, rather than lang code ("en"). */
	setLanguageMenu(getLanguageName(lang));
}

/**
* Adds the class "active" to the given id
*
* id The id to make active
*/
function changePrimaryNavigationState(id) {
	"use strict";
	if (id === '#navsite') {
		ajq('#navknowledge').addClass("active");
	} else {
		ajq(id).addClass("active");
	}
}

/**
* Displays the correct secondary navigation and set the secondary
*    item active
*
*    id			The id of the primary div
*    secondaryId	The id of the secondary item
*/
function changeSecondaryNavigationState(id, secondaryId) {
	"use strict";
	if (secondaryId !== "#") {
		ajq(secondaryId).addClass("active");
	}
}

/**
 * Sets the correct navigation state.  This is either set by the page as
 *    siteMapState or base on the application
 */
function changeNavigationState() {
	"use strict";
	var app, ids;
	if (!window.siteMapState) {
		app = getApplication();
		if (app === "issue-tracker") {
			window.siteMapState = "supportCases/cases";
		} else if (app === "jbossnetwork_downloads") {
			window.siteMapState = "downloads/downloadsMiddleware";
		} else if (app === "jbossnetwork_support") {
			window.siteMapState = "supportCases/cases";
		} else if (app === "kbase") {
			window.siteMapState = "knowledge/kbase";
		} else if (app === "ccOverview") {
			window.siteMapState = "subscription/overview";
		} else if (app === "ccActive") {
			window.siteMapState = "subscription/active";
		} else if (app === "ccRenewals") {
			window.siteMapState = "subscription/renewals";
		} else {
			window.siteMapState = "start";
		}
	}
	ids = siteMapState.split("/");

	if (ids[0].indexOf('support') !== -1) {
		ids[0] = 'support';
	}

	changePrimaryNavigationState("#nav" + ids[0]);
	changeSecondaryNavigationState("#nav" + ids[0], "#nav" + ids[1]);
}

/**
 * Prepends the supplied error message to the main div
 *
 * msg The message to display
 */
function displayUnknownLangMsg(msg) {
	"use strict";
	ajq("#main").prepend("<div id=\"unknown_lang\" class=\"alertNotice\">" + msg + "</div>");
}

/**
* Checks to see if the current application supports the users language
*
* user_locale		The users current language
* unknown_lang_msg	The message to display to the user
*/
function checkUserLanguage(user_locale, unknown_lang_msg) {
	"use strict";
	var lang_it = ['en'],
		lang_kbase = ['en', 'ja', 'zh_CN'],
		lang_csp = ['en', 'ja', 'zh_CN'],
		lang_cc = ['en', 'ja', 'zh_CN', 'zh', 'ko', 'es', 'fr', 'it', 'de'],
		lang = user_locale.split('_')[0],
		country = user_locale.split('_')[1],
		user_lang = lang,
		app;

	if (lang === 'zh') {
		user_lang = lang + "_" + country.toUpperCase();
	}

	if (user_lang !== undefined && unknown_lang_msg !== undefined) {
		app = getApplication();

		if (app === "issue-tracker" && lang_it.indexOf(user_lang) === -1) {
			displayUnknownLangMsg(unknown_lang_msg);
		} else if ((app === "jbossnetwork_downloads" || app === "jbossnetwork_support" || app === "jbossnetwork") && lang_csp.indexOf(user_lang) === -1) {
			displayUnknownLangMsg(unknown_lang_msg);
		} else if (app === "kbase" && lang_kbase.indexOf(user_lang) === -1) {
			displayUnknownLangMsg(unknown_lang_msg);
		} else if (app === "customercenter" && lang_cc.indexOf(user_lang) === -1) {
			displayUnknownLangMsg(unknown_lang_msg);
		}
	}
}

/**
* Shows the main content of the page and hides the loading dialog
*
* @return
*/
function hideLoadingDialog(targetDiv) { // DOM
	if (targetDiv === undefined || targetDiv === "") {
		targetDiv = 'searchResults';
	}
	if (document.getElementById) {
		if (document.getElementById(targetDiv) !== null) {
			document.getElementById('prepage').style.visibility = 'hidden';
			document.getElementById(targetDiv).className = '';
		}
	} else {
		if (document.layers) { // NS4
			document.prepage.visibility = 'hidden';
			eval("document." + targetDiv + ".className = ''");
		} else { // IE4
			document.all.prepage.style.visibility = 'hidden';
			document.all.item(targetDiv).className = '';
		}
	}
}

/**
* Fades the main content of the page and shows the loading dialog
*
* TODO There must be a more concise way of writing this
*
* @return
*/
function showLoadingDialog(targetDiv) { // DOM
	if (targetDiv === undefined || targetDiv === "") {
		targetDiv = 'searchResults';
	}
	if (document.getElementById) {
		if (document.getElementById(targetDiv) !== null) {
			document.getElementById('prepage').style.visibility = 'visible';
			document.getElementById(targetDiv).className = 'opacityOn';
		}
	} else {
		if (document.layers) { // NS4
			document.prepage.visibility = 'visible';
			eval("document." + targetDiv + ".className = 'opacityOn'");
		} else { // IE4
			document.all.prepage.style.visibility = 'visible';
			document.all.item(targetDiv).className = 'opacityOn';
		}
	}
}


/** Remove this blockUI plugin and replace with something else generic **/
function blockUI(targetDiv) {
	"use strict";
	ajq(targetDiv).block({message: null});
}

function unblockUI(targetDiv) {
	"use strict";
	ajq(targetDiv).unblock();
	//extra clean-up - blockUI adds style position:relative which can break other input fields on the page
	ajq(targetDiv).removeAttr('style');
}

function autogrowTextarea() {
	"use strict";
	try {
		ajq('textarea.autoresize').autoResize({
			// On resize:
			onResize : function () {
				ajq(this).css({opacity: 0.8});
			},
			// After resize:
			animateCallback : function () {
				ajq(this).css({opacity: 1});
			}
		});
	} catch (ignore) {
		//This is a test to see if stuff works better now....
	}
}

/**
* Equalize the heights of #sideNav and #main
*/

function sideNav() {
	"use strict";
	if (ajq('#sideNav').length !== 0 && ajq('#main').length !== 0) {
		ajq('#sideNav, #main').equalHeights();
	}
}

function balanceCols(element) {
	"use strict";
	element.find('.col').equalHeights();
}

/**
* Mega menu layout -- adjust the widths and balance the columns
*/

function megaMenu() {
	"use strict";
	ajq('#navPrimary > ul > li').hover(function () {
		// total the outerWidth of each .col and the padding on .body and .cap
		var cols = 0,
			total,
			cap,
			body;
		ajq(this).find('.col').each(function () {
			cols += parseInt(ajq(this).outerWidth(true), 10);
		});
		body = parseInt(ajq(this).find('.body').css('padding-left'), 10);
		cap = parseInt(ajq(this).find('.cap').css('padding-right'), 10);
		total = cols + body + cap + 8; // add extra pixels for IE8+9
		// set the width of .mega to total
		ajq(this).find('.mega').css('width', total);
		 // call as separate function for IE 7+8
		balanceCols(ajq(this));
	});
}

/*!
 * Simple jQuery Equal Heights
 *
 * Copyright (c) 2013 Matt Banks
 * Dual licensed under the MIT and GPL licenses.
 * Uses the same license as jQuery, see:
 * http://docs.jquery.com/License
 *
 * @version 1.5.1
 */

(function($) {
	"use strict";
	$.fn.equalHeights = function () {
		var maxHeight = 0,
			$this = $(this);

		$this.each(function () {
			var height = $(this).outerHeight();

			if (height > maxHeight) {
				maxHeight = height;
			}
		});

		return $this.css('height', maxHeight);
	};
})(ajq);

/**
* Fades an element out and then another element in
* @param hideElement, the element to hide
* @param showElement, the element to show
* @return
*/
function toggleInput(hideElement, showElement) {
	"use strict";
	if (!ajq('body').hasClass('sfdc_readonly')) {
		ajq('.toggleInput').css("display", "none");
		ajq('.toggleOutput').css("display", "inline");
		ajq('#' + hideElement).fadeOut('fast', function () {
			ajq('#' + showElement).fadeIn('fast');
		});
	}
}

function doOutageMessage() {
	"use strict";
	chrometwo_require(['dismiss'], function(d) {
	    var message, now, key, show, text;
	    if (typeof window.portalOutageObj !== 'undefined') {
		    for (key in portalOutageObj) {
			    if (portalOutageObj.hasOwnProperty(key)) {
				    message = portalOutageObj[key];
				    now     = new Date();
				    text    = ajq('<p>' + message.message + '</p>').text(); // get the text only
				    show    = now < message.end && now > message.start && !d.is_dismissed(text);
				    if (show) {
					    if (ajq('#messages').length === 0) {
						    ajq('#content').prepend('<ul id="messages" class="message"></ul>');
					    } else if (ajq('div#messages').length !== 0) {
						    ajq('div#messages').remove();
						    ajq('#content').prepend('<ul id="messages" class="message"></ul>');
					    }
					    ajq('#messages').prepend('<li data-dismissable class="alertSystem">' + message.message + '</li>');
				    }
			    }
		    }
	    }
	});
}

function doSurveyLink(li) {
	"use strict";
	chrometwo_require(['jquery', 'survey', 'chrome_lib', 'analytics/main'], function($, survey, lib, analytics) {
		var survey_id = li.find('a[data-survey-id]').data('survey-id');
		survey.get_survey_link(survey_id, function (url) {
			// Set the link's href to the URL that the survey API returned.
			var link = li.find('a.js-survey-link');
			link.attr('href', url);
			analytics.on(link, 'click', undefined, 'SurveyProductDocumentationClick');
			link.click(function(ev) {
				lib.store.local.set('sm_srv_status_' + survey_id, 'done');
				li.slideUp();
			});
		});
	});
}

function doNotices(notices) {
	"use strict";
	var i;
	if (typeof notices === "undefined") {
		// If notices weren't passed in, fetch them and run doNotices again
		chrometwo_require(['chrome_lib'], function (lib) {
			// Wait for user_info to come back

			// check for lib undefined because this happens sometimes in IE8
			// running in IE7 compatibility mode.
			if (typeof lib !== 'undefined') {
				lib.whenUserStatusReady(function (user_info) {
					var lang = user_info.lang;
					var _i = lang.indexOf('_');
					if (_i >= 0) {
						lang = lang.slice(0, _i);
					}
					chrometwo_require(['text!/webassets/avalon/j/notices/notices_' + lang + '.json'], function (notices) {
						doNotices(JSON.parse(notices));
					});
				});
			}
		});

	} else {
		// If notices were passed in, run doNotice on each of them
		for (i = 0; i < notices.length; i += 1) {
			doNotice(notices[i]);
		}
	}
}

function doNotice(notice) {
	"use strict";
	chrometwo_require(['jquery', 'survey', 'dismiss'], function($, survey, d) {

		var i;
		var ul;
		var li;
		var now               = new Date();
		var start_date        = new Date(notice.start);
		var end_date          = new Date(notice.end);
		var show_event        = notice.show_event;
		var show_on           = notice.show_on;
		var show_on_this_page = onPage(show_on);
		var SURVEY_ENABLED    = true;

		var raw_text    = $('<p>' + notice.message + '</p>').text();
		var will_appear = (start_date < now) && (now < end_date) && show_on_this_page && !d.is_dismissed(raw_text);

		if ($('ul#notices').length > 0) {
			ul = $('ul#notices');
		} else {
			$('#content').prepend('<ul id="notices" class="message"></ul>');
			ul = $('#content #notices');
		}

		function addNotice(message) {
			ul.prepend('<li data-dismissable class="alertNotice message-hidden">' + message + '</li>');
			return ul.find('li.alertNotice');
		}

		function showNotice(li) {
			return li.show();
		}

		if (will_appear) {
			li = addNotice(notice.message);
			if (typeof show_event !== 'undefined' && show_event !== '' && show_event !== 'always') {
				$(document).on(show_event, function () {
					showNotice(li);
				});
			} else {
				showNotice(li);
			}
			// If the notice contains a survey link...
			if (SURVEY_ENABLED && li.find('a[data-survey-id]').length) {
				doSurveyLink(li);
			}
		}
	});
}

/**
 * Determine if the page we're on is under a given URL path.
 *
 * @param {string|array} urls A single URL or an array of URLs to check.  If an
 * array is passed in, returns `true` if *any* of the URLs matched.
 */
function onPage(urls) {

	var path_starts_with = function (url) {
		return window.location.pathname.indexOf(url) > -1;
	}
	var on_page = false;
	var i;

	if (typeof urls === "string") {

		// If urls is a string, use the string
		on_page = path_starts_with(urls);

	} else if (urls instanceof Array) {

		// If urls is an array, use every string in the array and if any of
		// the strings match the current URL, show the notice on this page
		for (i = 0; i < urls.length; i += 1) {
			if (path_starts_with(urls[i])) {
				on_page = true;
				break;
			}
		}

	}

	return on_page;
}

function startIdleTimer() {
	"use strict";
	var prefix = '';

	if (typeof window.portal !== 'undefined' && typeof window.portal.host !== 'undefined') {
		prefix = window.portal.host;
	}
	ajq(document).ready(function () {
		ajq(document).idleTimeout({
			aliveUrl: prefix + '/services/ping'
		});
	});
}

function doAutoSuggest() {
	"use strict";

	// Find important elements in the DOM (do this once)
	var globalBar = ajq("#topSearchInput"),
		resultsBar = ajq(".quickSearchInput"),
		keywordSearch = ajq("#keywordInput"),
		searchLabel = ajq.trim(ajq("#searchLabel").text()), // WARNING! do not do .text().trim() because of an IE8 issue
		array,
		strippedArray,
		i;

	// Function that makes ajax calls to the GSA and responds with JSON
	function suggestAjaxCall(request, response, len) {
		ajq.ajax({
			url: "/suggest",
			cache: false,
			dataType: "json",
			data: {
				format: "rich",
				client: "avalon_frontend",
				site: "avalon_portal",
				q: request.term
			},
			success: function (data) {
					// trim the results array to len
				data.results.splice(len, data.results.length - len);

				//response(array.filter(function(elem){return elem.value.indexOf("inmeta:") == -1;}));
				// US9912, IE hates if we appy a filter to the ajq.map()
				array = ajq.map(data.results, function (item) { return { label: item.name, value: item.name }; });
				// Strip out elements that have inmeta in the title
				strippedArray = [];
				for (i = 0; i < array.length; i += 1) {
					if (array[i].value.indexOf("inmeta:") === -1) {
						strippedArray.push(array[i]);
					}
				}

				// return the an array that contains no inmeta entries... without using .filter()
				response(strippedArray);
			}
		});
	}

	function setCloseButton(element) {

		var closeID = 'searchClose_' + element.attr('id'),
			close = ajq('#' + closeID.replace(':', '\\:'));

		if (element.val() === '' || element.val() === undefined) {
			// ensure that the close <a> is not visible when element is empty
			close.addClass('nodisplay');
		} else {
			// remove the display blocking class when a user starts typing
			close.removeClass('nodisplay');
		}
	}

	// Adds our new fancey handlers to an element. Likely an <input>
	function setupInput(element, activatable) {
		var close, closeID;

		// Remove browsers autocomplete
		element.attr("autocomplete", "off");

		setCloseButton(ajq('#quickSearchform\\:quickSearchInput'));

		element.keyup(function () {
			setCloseButton(element);
		});

		element.mousedown(function () {
			setCloseButton(element);
		});

		// Put the X/close anchor after the global search <input>
		closeID = 'searchClose_' + element.attr('id');
		element.before('<a id="' + closeID  + '" class="close nodisplay">Close</a>');

		close = ajq('#' + closeID.replace(':', '\\:'));
		// close the autocomplete flyout when the user clicks close
		close.mousedown(function () {
			element.autocomplete("close");
			element.val('');
			close.addClass('nodisplay');
			element.focus();
			if (element.attr('id') !== 'topSearchInput') {
				ajq('#quickSearchform\\:searchbutton').click();
			}
		});

		element.focus(function () {
				// on focus add the active class and remove the input value (if it is Search)
			if (activatable) {
				element.addClass("active");
				if (element.val() === searchLabel) {
					element.val('');
				}
			}
		}).blur(function () {
			// on blur remove the active class and set an empty input value to Search
			if (element.val() === '') {
				if (activatable) {
					element.removeClass("active");
					element.val(searchLabel);
				}
				close.addClass('nodisplay');
			}
		});
	}

	setupInput(globalBar, true);
	setupInput(resultsBar, false);
	setupInput(keywordSearch, false);

	// Setup autocomplete on page load for the globalBar
	globalBar.autocomplete({
		appendTo: "#globalSearchBlock",
		open: function () { ajq('#topAdvSearch').hide(); },
		close: function () { ajq('#topAdvSearch').show(); },
			// Careful here. We override select to submit, but we _must_ manually shove the selected items val in the input first
		select: function (event, ui) {
			globalBar.val(ui.item.value);
			ajq('#topSearchForm').submit();
		},
		minLength: 2,
		source: function (request, response) { suggestAjaxCall(request, response, 10); }
	});

	// Setup autocomplete on page load for the results page bar
	resultsBar.autocomplete({
		appendTo: "div.searchField",
			// Careful here. We override select to submit, but we _must_ manually shove the selected items val in the input first
		select: function (event, ui) {
			resultsBar.val(ui.item.value);
			ajq('#quickSearchform').submit();
		},
		minLength: 2,
		source: function (request, response) { suggestAjaxCall(request, response, 5); }
	});

	keywordSearch.autocomplete({
		appendTo: "div.searchField",
		select: function (event, ui) {
			keywordSearch.val(ui.item.value);
			ajq('#keywordInputHidden').change();
		},
		minLength: 2,
		source: function (request, response) { suggestAjaxCall(request, response, 5); }
	});

}

function displayMoreFacets(facetName) {
	"use strict";
	var currentIndex = parseInt(jQuery("#" + facetName + "-pos").html(), 10),
		i = currentIndex;

	while (i < currentIndex + 5) {
		jQuery("#" + facetName + i).show();
		i += 1;
	}
	jQuery("#" + facetName + "-pos").html(i);

	if (!jQuery("#" + facetName + (i + 1)).length) {
		jQuery("#" + facetName + "-more").hide();
	}
	jQuery("#" + facetName + "-less").show();
}

function displayLessFacets(facetName) {
	"use strict";
	var currentIndex = parseInt(jQuery("#" + facetName + "-pos").html(), 10),
		i = currentIndex;
	while (i > currentIndex - 5) {
		jQuery("#" + facetName + i).hide();
		i -= 1;
	}
	jQuery("#" + facetName + "-pos").html(i);

	jQuery("#" + facetName + "-more").show();
	if (i === 5) {
		jQuery("#" + facetName + "-less").hide();
	}
}

function getCookie(name) {
	"use strict";
	var dc = document.cookie,
		prefix = name + "=",
		begin = dc.indexOf("; " + prefix),
		end;

	if (begin === -1) {
		begin = dc.indexOf(prefix);
		if (begin !== 0) {
			return null;
		}
	} else {
		begin += 2;
	}

	end = document.cookie.indexOf(";", begin);
	if (end === -1) {
		end = dc.length;
	}

	return unescape(dc.substring(begin + prefix.length, end));
}

/*
* A function that finds the first input checkbox, and adds select all funtionality to it.
*/
function tableSelectAll(element) {
	"use strict";
	var myTable = element,

	// Get the already initialized dataTable object.
	// var myDataTable = ajq(myTable).dataTable();
	thInput = element.find('th input').first();

	ajq(thInput).change(function () {
		myTable.find('td input').each(function (index) {
			var input = ajq(this);

			if (input.is(':disabled') === true) {
				return;
			}

			if (thInput.attr('checked')) {
				input.attr('checked', 'checked');
						//ajq('input', myDataTable.fnGetNodes()).attr('checked','checked');
			} else {
				input.removeAttr('checked');
				//ajq('input', myDataTable.fnGetNodes()).removeAttr('checked','checked');
			}
		});
	});
}

/**
* Toggle Width of Global Search Bar on/off Focus
*/
function toggleSearchBar() {
	"use strict";

	var globalSearchBar = ajq('#topSearchInput'),
		globalSearchBarWidth = globalSearchBar.width(),
		initialText = globalSearchBar.val(),
		searchButton = ajq('#searchButton'),
		searchButtonOff = searchButton.attr('src'),
		buttonStrSplit = searchButtonOff.split('-wht'),
		searchButtonOn = (buttonStrSplit.length > 1) ? buttonStrSplit[0] + buttonStrSplit[1] : buttonStrSplit[0], /* check and default just in case. */
		brandWidth,
		accountWidth,
		headerWidth,
		newSearchWidth,
		searchForm;

	globalSearchBar.focus(function (e) {
		/* calculate widths to determine max width based on window size */
		brandWidth = ajq('#brand').width();
		accountWidth = ajq('#utility-links').width();
		headerWidth = ajq('#header').width();
		newSearchWidth = headerWidth - (accountWidth + brandWidth) - 160;

		if (newSearchWidth < globalSearchBarWidth) {
			newSearchWidth = globalSearchBarWidth;
		} else if (newSearchWidth > 400) {
			newSearchWidth = 400;
		}
		searchButton.attr('src', searchButtonOn);
		ajq(this).stop().animate({ 'width' : newSearchWidth + 'px' }, 300);

	});

	ajq(window).resize(function (e) {
		if (ajq('#globalSearchBlock .ui-autocomplete:visible').length === 0) {
			globalSearchBar.stop().animate({ 'width' :  globalSearchBarWidth + 'px' }, 300);
		}
	});

	ajq('#topSearchForm').focusout(function (e) {
		if (ajq('#globalSearchBlock .ui-autocomplete:visible').length === 0) {
			if (globalSearchBar.val() === '' || globalSearchBar.val() === undefined) {
				/* if we've typed something, then don't change the icon back. */
				searchButton.attr('src', searchButtonOff);
			}
			globalSearchBar.stop().animate({ 'width' :  globalSearchBarWidth + 'px' }, 300);
		}
	});

	searchForm = ajq('#topSearchForm');
	searchForm.submit(function () {
		if (globalSearchBar.val() === initialText || globalSearchBar.val() === "") {
			return false;
		}
	});
}


/**
* Place Breadcrumbs
*/
function placeBreadcrumbs() {
	"use strict";

	var breadcrumbs, a, href;
	breadcrumbs = ajq('#breadcrumbs');
	breadcrumbs.find('a').each(function (test) {
		a = ajq(this);
		if (a.attr('href')) {
			href = a.attr('href').trim();
			href = href.replace(/[%20]*$/, '');
			a.attr('href', href);
		}
	});
	ajq('#breadcrumbs').remove().prependTo('#main-top').wrap('<div class="wrapi"></div>');
	ajq.event.trigger('portal_breadcrumbs_ready');
}

function getCookieValue(cookieName) {
	"use strict";
	var start, end;
	if (document.cookie.length > 0) {
		start = document.cookie.indexOf(cookieName + "=");
		if (start !== -1 && (start === 0 || (document.cookie.charAt(start - 1) === ' '))) {
			start += cookieName.length + 1;
			end = document.cookie.indexOf(";", start);
			if (end === -1) { end = document.cookie.length; }
			return unescape(document.cookie.substring(start, end));
		}
	}
	return "";
}
