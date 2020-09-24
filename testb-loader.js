(function() {

  (function() {
    var SkylineRiseBookmarklet, SkylineRisejQuery;
    window.SkylineRiseBookmarkletVersion = "v2";
    window.SkylineRiseBookmarkletDomain = "https://rise.skyline.is";
    // uncomment for local dev
    // window.SkylineRiseBookmarkletDomain = "http://0.0.0.0:4567";

    SkylineRiseBookmarklet = document.createElement("script");
    SkylineRiseBookmarklet.setAttribute("id", "SkylineRise-bookmarklet-script");
    SkylineRiseBookmarklet.setAttribute("src", window.SkylineRiseBookmarkletDomain + "/javascripts/skyline-rise-bookmarklet-" + window.SkylineRiseBookmarkletVersion + ".js");
    return document.body.appendChild(SkylineRiseBookmarklet);
  })();

}).call(this);