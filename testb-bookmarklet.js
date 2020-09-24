/* init
----------------------------------------------------------------- */

var initSR = function () {
  alert("init!");
  pages = [];
  images = [];
  imagesCounter = 0;
  imagesLength = 0;

  if (localStorage.getItem("TB_Pages")) {
    pages = $.parseJSON(localStorage.getItem("TB_Pages"));
    console.log("pages each");
    $.each(pages, function (i, item) {
      console.log("* pages each", pages[i]);
      images.push(pages[i] + "01.jpg");
      images.push(pages[i] + "02.jpg");
      images.push(pages[i] + "03.jpg");
    });
  }

  var pageURL = window.location.href;
  pages.push(pageURL);
  localStorage.setItem("TB_Pages", JSON.stringify(pages));

  $(document).on("keyup", function (event) {
    if (event.which === 191) {
      addOverlay();
    }
    if (event.which === 90) {
      // back
      swapImage(-1);
    }
    if (event.which === 88) {
      // forward
      swapImage(1);
    }
  });
};

var swapImages = function (n) {
  imagesCounter = imagesCounter + n;
  if (imagesCounter < 0) {
    imagesCounter = imagesLength - 1;
  }
  if (imagesCounter > imagesLength) {
    imagesCounter = 0;
  }
  $("#TB_Overlay img").hide();
  $("#TB_Overlay img").eq(imagesCounter).show();
};

var addOverlay = function () {
  var overlayHTML =
    "<div id='TB_Overlay' style='z-index:999999999999; position: fixed; top: 0; bottom: 0; left: 0; right: 0; background: black;'></div>";
  $("body").append(overlayHTML);
  imagesLength = images.length;
  $.each(images, function (i, item) {
    $("#TB_Overlay").append(
      "<img src='" +
        images[i] +
        "' style='width: 100vw; height: 100vh; object-fit: contain;' />"
    );
  });
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
