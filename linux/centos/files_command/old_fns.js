/*global define, unescape, escape*/
/*jslint browser: true*/

define(function () {
	/**
	 * This file contains a set of global functions that were formerly defined
	 * in lib/rh_omni_footer.js.  They are used by Omniture's s_code, and
	 * possibly in other places too.
	 *
	 * They should be deprecated.
	 *
	 */

	/** This is a new function declared to check the authorization of a user.
	 * This is replacing the use of "rh_sso" by using "chrome_user_info" to the check the user status.
	 * This function needs to be removed once this file is deprecated. This is a redundant function from chrome_lib.
	 */
	window.getAuthorizationValue = function (cookieName) {
		var value = false, start, end;
		if (document.cookie.length > 0) {
			start = document.cookie.indexOf(cookieName + "=");
			if (start !== -1 && (start === 0 || (document.cookie.charAt(start - 1) === ' '))) {
				start += cookieName.length + 1;
				end = document.cookie.indexOf(";", start);
				if (end === -1) { end = document.cookie.length; }
				value = JSON.parse(window.unescape(document.cookie.substring(start, end))).authorized || value;
			}
		}
		return value;
	};


	/*********************************************/
	/* FORMERLY DEFINED IN lib/rh_omni_footer.js */
	/*********************************************/
	window.getCookie = function (name)
	{
		var dc = document.cookie;
		var prefix = name + "=";
		var begin = dc.indexOf("; " + prefix);

		if (begin === -1) {
			begin = dc.indexOf(prefix);
			if (begin !== 0) {
				return null;
			}
		} else {
			begin += 2;

		}
		var end = document.cookie.indexOf(";", begin);
		if (end === -1) {
			end = dc.length;
		}
		return unescape(dc.substring(begin + prefix.length, end));
	};

	/*********************************************/
	/* FORMERLY DEFINED IN lib/rh_omni_footer.js */
	/*********************************************/
	window.deleteCookie = function ( name, path, domain ) {
		if ( window.getCookie( name ) ) {
			document.cookie = name + "=" +
				( ( path ) ? ";path=" + path : "") +
				( ( domain ) ? ";domain=" + domain : "" ) +
				";expires=Thu, 01-Jan-1970 00:00:01 GMT";
		}
	};

	/*********************************************/
	/* FORMERLY DEFINED IN lib/rh_omni_footer.js */
	/*********************************************/
	window.checkLoginEvent = function () {
		var omni_login_value = window.getCookie("omni_login");
		if (omni_login_value) {
			window.deleteCookie( "omni_login", "/", "redhat.com" ) ;
			return(1);
		}

		return(0);
	};

	/*********************************************/
	/* FORMERLY DEFINED IN lib/rh_omni_footer.js */
	/*********************************************/
	window.checkRegEvent = function ()
	{
		var omni_reg_value;

		omni_reg_value = window.getCookie("omni_reg");
		if (omni_reg_value === 1) {
			window.deleteCookie( "omni_reg", "/", "redhat.com" ) ;
			window.deleteCookie( "omni_login", "/", "redhat.com" ) ;
			return(1);
		}
		return(0);
	};

	/*********************************************/
	/* FORMERLY DEFINED IN lib/rh_omni_footer.js */
	/*********************************************/
	window.getLoginStatus = function ()
	{
		var rh_auth_value;
		var return_status;
		var login_status;
		var rh_user_array;

		return_status = "Browser";
		rh_auth_value = window.getCookie("rh_auth_token");

		window.authorization_status = window.getAuthorizationValue("chrome_user_info");
		window.rh_sso_value = (window.getAuthorizationValue("chrome_user_info") === true)? "true": "";
		window.rh_user_value = window.getCookie("rh_user");

		if (window.authorization_status === false) {
			return("Browser");
		}

		if (window.rh_user_value) {
			rh_user_array = window.rh_user_value.split("|");
			login_status = rh_user_array[2];
		}

		if (login_status === "member") {
			return("Logged in");
		}
		if (login_status === "customer") {
			return("Customer");
		}

		return (return_status);
	};

	/*********************************************/
	/* FORMERLY DEFINED IN lib/rh_omni_footer.js */
	/*********************************************/
	window.setCookie = function ( name, value, expires, path, domain, secure )
	{
		// set time, it's in milliseconds
		var today = new Date();
		today.setTime( today.getTime() );

		/*
		if the expires variable is set, make the correct
		expires time, the current script below will set
		it for x number of days, to make it for hours,
		delete * 24, for minutes, delete * 60 * 24
		*/
		if ( expires )
			{
				expires = expires * 1000 * 60 * 60;
			}

			var expires_date = new Date( today.getTime() + (expires) );

			document.cookie = name + "=" +escape( value ) +
				( ( expires ) ? ";expires=" + expires_date.toGMTString() : "" ) +
				( ( path )    ? ";path=" + path : "" ) +
				( ( domain )  ? ";domain=" + domain : "" ) +
				( ( secure )  ? ";secure" : "" );
	};

});
