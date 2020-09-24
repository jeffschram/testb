(function () {
  (function () {
    var TestBBookmarklet, TestBjQuery;
    window.TestBBookmarkletVersion = "";
    window.TestBBookmarkletDomain = "https://jeffschram.github.io";
    // uncomment for local dev
    // window.TestBBookmarkletDomain = "http://0.0.0.0:4567";

    TestBBookmarklet = document.createElement("script");
    TestBBookmarklet.setAttribute("id", "TestB-bookmarklet-script");
    TestBBookmarklet.setAttribute(
      "src",
      window.TestBBookmarkletDomain +
        "/testb-bookmarklet" +
        window.TestBBookmarkletVersion +
        ".js"
    );
    return document.body.appendChild(TestBBookmarklet);
  })();
}.call(this));
