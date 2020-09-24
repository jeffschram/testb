/* init
----------------------------------------------------------------- */

var initSR = function () {
  alert("init!");
  pages = [];

  if (localStorage.getItem("TB_Pages")) {
    pages = $.parseJSON(localStorage.getItem("TB_Pages"));
    console.log("pages each");
    $.each(pages, function (i, item) {
      console.log("* pages each", pages[i]);
    });
  }

  var pageURL = window.location.href;
  pages.push(pageURL);
  localStorage.setItem("TB_Pages", JSON.stringify(pages));

  $(document).on("keyup", function (event) {
    alert("KEY:" + event.which);
    if (event.which === 191) {
      alert("Go Time");
      addOverlay();
    }
  });
};

var addOverlay = function () {
  var overlayHTML =
    "<div id='TB_Overlay' style='z-index:999999999999; position: fixed; top: 0; bottom: 0; left: 0; right: 0; background: black;'></div>";
  $("body").add(overlayHTML);
};

/* LOAD
----------------------------------------------------------------- */

// Add jquery.js which includes jquery and jquery-ui
//
TestBjQuery = document.createElement("script");
TestBjQuery.setAttribute("id", "testb-jquery");
TestBjQuery.setAttribute("src", window.TestBBookmarkletDomain + "/jquery.js");
TestBjQuery.onload = function () {
  initSR();
};
document.body.appendChild(TestBjQuery);
