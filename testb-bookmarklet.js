/* init
----------------------------------------------------------------- */

var initSR = function () {
  alert("init!");
};

/* LOAD
----------------------------------------------------------------- */

// Add jquery.js which includes jquery and jquery-ui
//
TestBjQuery = document.createElement("script");
TestBjQuery.setAttribute("id", "testb-jquery");
TestBjQuery.setAttribute("src", "http://jeffschram.github.io/jquery.js");
TestBjQuery.onload = function () {
  initSR();
};
document.body.appendChild(TestBjQuery);
