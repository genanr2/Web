function ReadCookie(cookieName, delimiter) {
    if (!delimiter) {
        delimiter = ';';
    }
    if (document.cookie.length < 1) {
        return '';
    }
    var start = document.cookie.indexOf(cookieName + "=");
    if (start < 0) {
        return '';
    }
    var end = document.cookie.indexOf(delimiter, start);
    return unescape(document.cookie.substring(start + cookieName.length + 1, end < 0 ? document.cookie.length : end));
}
function ReadCommunityInfo(key) {
    var value;
    var list = document.getElementsByName('CommunityInfo');
    if (!list || list.length < 1) {
        value = '';
    }
    else {
        value = list[0].content;
    }
    var start = value.indexOf(key + "=");
    if (start < 0) {
        return '';
    }
    var end = value.indexOf(';', start);
    return unescape(value.substring(start + key.length + 1, end < 0 ? value.length : end));
}
function GetCurrentBrand() { return ReadCommunityInfo('B'); }
function GetCurrentLocale() { return ReadCommunityInfo('L'); }
function GetCurrentAppName() { return ReadCommunityInfo('A'); }

var eventImgs = new Array();
var eventImgIdx = 0;

function TrackEvent(eventName, data, appName, brand, locale, userId) {
    var maxRnd = 0x7FFFFFFF;
    var imgElement = "_TRK_U_8934";
    var baseUrl = "http://c.microsoft.com/trans_pixel.aspx?TYPE=SSPV&GUID=1F4FC18C-F71E-47fb-8FC9-612F8EE59C61";  // Read from config?

    if (!appName) {
        appName = GetCurrentAppName();
    }
    if (!brand) {
        brand = GetCurrentBrand();
    }

    var query = "&r=" + escape(window.location) + "&rnd=" + Math.floor(Math.random() * maxRnd + 1) + "&URI=";
    var trackQuery = "/eventtrack/?app=" + appName + "&event=" + eventName + "&brand=" + brand;
    trackQuery += "&locale=" + (locale ? locale : GetCurrentLocale());
    if (userId) {
        trackQuery += "&userID=" + userId + "&signedIn=1";
    }
    else {
        userId = ReadCookie('muid', '&');
        if (userId) {
            trackQuery += "&userID=" + userId + "&signedIn=1";
        }
    }
    if (data && typeof data == 'object') {
        for (var key in data) {
            trackQuery += "&" + key + "=" + data[key];
        }
    }

    var eventImgSrc = baseUrl + query + escape(trackQuery);

    if (document.images) {
        eventImgs[eventImgIdx] = new Image();
        eventImgs[eventImgIdx].src = eventImgSrc;
        eventImgIdx++;
    } else {
        document.write('<img border="0" width="1" height="1" src="' + eventImgSrc + '"/>');
    }
}

function loadJavaScript(url) {
    var js = document.createElement('script');
    js.src = url;
    var head = document.getElementsByTagName('head')[0];
    head.appendChild(js);
}

function loadDeferedJavaScript(url) {
    $(window).load(function () {
        setTimeout(function () { loadJS(url) }, 1);
    });
}

//Single Sign On
(function () {
    var SSOCookie = "ssostate";
    var existing = window.onload;
    window.onload = function () {
        existing && existing();
        var signonCookie = getKeyValue(getCookie());
        if (signonCookie.url && signonCookie.c == "1") {
            var purls = signonCookie.url.split(",");
            for (var i = 0; i < purls.length; i++) {
                if (purls[i]) {
                    makePartnerRequest(unescape(purls[i]), signonCookie.sig, signonCookie.loc);
                }
            }
        }

        //Update the cookie to tell the server the request is processed.
        if (signonCookie.c && (signonCookie.c == '0' || signonCookie.c == '1')) {
            updateCookie(signonCookie.c);
        }
    }

    function makePartnerRequest(url, signedState, locale) {
        var e = document.createElement("iframe");
        e.height = e.width = 0;
        // frameBorder must be set to "no" instead of the standard "0"
        // because of an issue with Safari
        e.frameBorder = e.scrolling = "no";
        e.src = url + "?signedin=" + (signedState ? signedState : "0") + "&r=" + Math.floor(Math.random() * 1000000);
        if (locale) {
            e.src += "&locale=" + locale;
        }
        document.body.appendChild(e);
    }

    function getCookie() {
        var match = document.cookie.match(new RegExp("\\b" + SSOCookie + "=([^;]+)"));
        return match ? match[1] : null;
    }

    function updateCookie(changeValue) {
        var cookieValue = getCookie();
        if (cookieValue) {
            var changeCrumb = "&c=" + changeValue;
            var newChangeCrumb = "&c=2";
            document.cookie = SSOCookie + "=" + cookieValue.replace(changeCrumb, newChangeCrumb) + ";path=/";
        }
    }

    function getKeyValue(keyValue) {
        var pairs = {};
        if (keyValue) {
            keyValue.replace(/([^?=&]+)=([^&]*)?/g,
                    function (s, k, v) { pairs[k] = v; }
                );
        }
        return pairs;
    }

})();



