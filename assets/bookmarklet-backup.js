/* init
----------------------------------------------------------------- */

var initSR = function () {
  /* Build the interface
    ----------------------------------------------------------------- */

  // The UI Markup
  var orig_title = $("title").html();
  var orig_URL = window.location;
  var SR_domain = window.SkylineRiseBookmarkletDomain;
  console.log("sr domain", SkylineRiseBookmarkletDomain);
  var SR_stylesheet_URL = SR_domain + "/stylesheets/screen.css";
  var SR_head =
    '<meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="chrome=1"><title>[*] ' +
    orig_title +
    '</title><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="stylesheet" href="' +
    SR_stylesheet_URL +
    '">';
  var SR_HTML =
    //'<body>'+
    '<section id="controls">' +
    '<ul class="button-group" id="loading">' +
    "<li>" +
    '<a id="css-reload" href="#" title="Reload CSS Only"><i class="icon icon-refresh"></i>CSS</a>' +
    "</li>" +
    "<li>" +
    '<a id="html-reload" href="#" title="Reload HTML"><i class="icon icon-refresh"></i>HTML</a>' +
    "</li>" +
    "<li>" +
    '<a id="open-in-new-tab" href="" target="_blank" title="Open Site In New Window"><i class="icon icon-open-new"></i></a>' +
    "</li>" +
    "<li>" +
    '<a id="close-skyline-rise" href="" title="Close Skyline Rise"><i class="icon icon-close"></i></a>' +
    "</li>" +
    "</ul>" +
    '<ul class="button-group" id="overlays">' +
    "<li>" +
    '<a data-toggle="overlay" class="button-with-options"><i class="icon icon-photo"></i> Overlay</a>' +
    '<ul class="button-options" id="overlay">' +
    '<li class="overlay-control">' +
    '<a href="#" id="overlay-toggle-active"><i class="icon icon-move"></i> Drag Overlay <b class="on-off-icon">&bull;</b></a>' +
    "</li>" +
    '<li class="overlay-control">' +
    '<input id="overlay-file-opacity" type="range" min="0" max="100" value="0">' +
    '<li class="separator"></li>' +
    "<li>" +
    '<p>Overlay an image to use as a guide <input type="file" id="overlay-file-selector" onchange="readURL(this);"></p>' +
    "</li>" +
    '<li class="separator"></li>' +
    "</ul>" +
    "</li>" +
    "</ul>" +
    '<ul class="button-group" id="viewports">' +
    "<li>" +
    '<a data-toggle="dimensions" class="button-with-options"><i id="icon-window-width" class="icon"></i> <span class="data" id="window-width"></span> x <span id="window-height"></span></a>' +
    '<ul class="button-options" id="dimensions">' +
    "<li>" +
    '<a class="dimension-normal"><i class="icon icon-enlarge"></i> Reset To Fill Window</a>' +
    "</li>" +
    '<li id="resize-match-overlay" style="display:none;">' +
    '<a class="dimension-resize-to-match-overlay"><i class="icon icon-photo"></i> Match The Overlay</a>' +
    "</li>" +
    '<li class="separator"></li>' +
    "<li>" +
    '<a class="dimension-option" data-dimension-option-name="iPhone 5 Portrait" data-dimension-option-width="320px" data-dimension-option-height="568px"><i class="icon icon-phone"></i> iPhone 5 Portrait</a>' +
    "</li>" +
    "<li>" +
    '<a class="dimension-option" data-dimension-option-name="iPhone 5 Landscape" data-dimension-option-width="568px" data-dimension-option-height="320px"><i class="icon icon-phone rotated"></i> iPhone 5 Landscape</a>' +
    "</li>" +
    "<li>" +
    '<a class="dimension-option" data-dimension-option-name="iPad Portrait" data-dimension-option-width="768px" data-dimension-option-height="946px" data-dimension-chrome-height="78"><i class="icon icon-tablet"></i> iPad Portrait</a>' +
    "</li>" +
    "<li>" +
    '<a class="dimension-option" data-dimension-option-name="iPad Landscape" data-dimension-option-width="1024px" data-dimension-option-height="690px" data-dimension-chrome-height="78"><i class="icon icon-tablet rotated"></i> iPad Landscape</a>' +
    "</li>" +
    "<li>" +
    '<a class="dimension-option" data-dimension-option-name="13 Inch Laptop" data-dimension-option-width="1280px" data-dimension-option-height="800px"><i class="icon icon-laptop"></i> 13in. Laptop</a>' +
    "</li>" +
    "<li>" +
    '<a class="dimension-option" data-dimension-option-name="Desktop" data-dimension-option-width="1400px" data-dimension-option-height="1000px"><i class="icon icon-desktop"></i> Desktop</a>' +
    "</li>" +
    "<li>" +
    '<p>Horizontal Gruid Guide Color <input type="color" id="horz-guid-guide-color" value="#000000"></p>' +
    "</li>" +
    "</ul>" +
    "</li>" +
    "</ul>" +
    '<ul class="button-group" id="mq-viewports"></ul>' +
    '<ul class="button-group" id="dev-helpers">' +
    "<li>" +
    '<a id="dev-helper-grid-guides" title="toggle grid guides"><i class="icon icon-baselines"></i></a>' +
    "</li>" +
    "<li>" +
    '<a id="dev-helper-text" title="toggle typography highlight"><i class="icon icon-text"></i></a>' +
    "</li>" +
    "</ul>" +
    "</section>" +
    '<section id="viewport">' +
    '<h1 id="viewport-title"><span>Test</span><a href="#" class="is-active" id="toggle-chrome"><i class="icon">&#x1F440;</i> Chrome</a></h1>' +
    '<div id="viewport-iframe-wrap" class="is-showing-chrome">' +
    '<iframe id="viewport-iframe" class="active" src="' +
    orig_URL +
    '"></iframe>' +
    "</div>" +
    "</section>" +
    '<section id="controls-secondary">' +
    '<ul class="button-group window-info">' +
    "<li>" +
    '<p><i class="icon icon-resolution">&#xE9A3;</i><span class="data" id="resolution"></span></p>' +
    "</li>" +
    "<li>" +
    '<p><i class="icon">&#x2139;</i><span class="data" id="browser-info"></span></p>' +
    "</li>" +
    '<li id="keypress-section" style="display: none;">' +
    '<p><b>KEYPRESS</b><span class="data" id="keypress"></span></p>' +
    "</li>" +
    "</ul>" +
    "</section>";
  //'</body>';
  // Remove everything from the page

  //$("html").empty();
  // add the head and the html
  $("body").css({ height: "100vh", overflow: "hidden" });
  $("html").prepend(SR_head);
  $("html").prepend(SR_HTML);

  // Initial functions to fire
  updateViewportDimensions();
  updateMonitorResolution();
  updateBrowserInfo();

  /* CSS Reload button
    ----------------------------------------------------------------- */
  $("html").delegate("#css-reload", "click", function (event) {
    event.preventDefault();
    var $frame = $("#viewport-iframe");
    setTimeout(function () {
      var doc = $frame[0].contentWindow.document;
      var $styles = $("link[rel='stylesheet']", doc);
      console.log("css reload each");
      $styles.each(function () {
        console.log("* css reload each");
        var updatedHref =
          $(this).attr("href").split("?")[0] + "?v=" + Date.now();
        $(this).attr("href", updatedHref);
      });
    }, 100);
  });

  /* HTML Reload button
    ----------------------------------------------------------------- */
  $("html").delegate("#html-reload", "click", function (event) {
    event.preventDefault();
    var $frame = $("#viewport-iframe");
    var frame_src = $frame.attr("src");
    $frame.attr("src", "");
    $frame.attr("src", frame_src);
  });

  /* Overlays
    ----------------------------------------------------------------- */
  overlays = [];

  if (localStorage.getItem("SR_Overlays")) {
    overlays = $.parseJSON(localStorage.getItem("SR_Overlays"));
    console.log("overlays each");
    $.each(overlays, function (i, item) {
      console.log("* overlays each");
      var filename = overlays[i].overlayFilename,
        filedata = overlays[i].overlayFiledata;
      $("#overlay").append(
        "<li class='overlay-option'><a href=''><img src='" +
          filedata +
          "'> " +
          filename +
          "</a><a data-overlay-option-key='" +
          i +
          "' class='delete-overlay-option'>x</a></li>"
      );
    });
  }

  /* Dev Helpers
    ------------------------------------------------------ */

  // inserting into target iframe
  function insertInsite() {
    var $frame = $("#viewport-iframe");
    setTimeout(function () {
      var doc = $frame[0].contentWindow.document;
      var $body = $("body", doc);
      // helper baselines
      var i = 0,
        blines = "";
      while (i < 800) {
        i++;
        blines += "<div class='skyline-grid-guide__baseline'></div>";
      }
      var i = 0,
        vlines = "";
      while (i < 300) {
        i++;
        vlines += "<div class='skyline-grid-guide__vertline'></div>";
      }
      $body.prepend(
        "<section class='skyline-grid-guide'><div class='skyline-grid-guide__baselines'>" +
          blines +
          "</div><div class='skyline-grid-guide__vertlines'>" +
          blines +
          "</div></section>"
      );
      // helper styles
      var devHelperStyles =
        ".skyline-grid-guide { opacity: .5; pointer-events: none; position: fixed; z-index: 3000; top: 0; left: 0; right: 0; overflow: hidden; width: 100%; min-height: 100%; display: none } html.dev--show-grid-guides .skyline-grid-guide { display: block; } .skyline-grid-guide .g { background: rgba(146, 189, 202, 0.25); } .skyline-grid-guide .g div { background: rgba(255, 255, 255, .2); border-right: 1px solid rgba(255,255,255,.2); border-left: 1px solid rgba(255,255,255,.2); height: 8000px; } .skyline-grid-guide__baselines { position: absolute; top: 0; left: 0; right: 0; width: 100% } .skyline-grid-guide__baseline { display: block; height: 1em; border-bottom: 1px solid rgba(160, 155, 155, 0.4) } .dev--highlight-typography h1 { background: yellow; } .dev--highlight-typography h2 { background: yellow; } .dev--highlight-typography p { background: yellow; }";
      $body.append("<style>" + devHelperStyles + "</style>");
    }, 100);
  }
  insertInsite();

  $("html").delegate("#dev-helper-grid-guides", "click", function () {
    $("#dev-helper-grid-guides").toggleClass("is-active");
    setTimeout(function () {
      var doc = $("#viewport-iframe")[0].contentWindow.document;
      var $html = $("html", doc);
      $html.toggleClass("dev--show-grid-guides");
    }, 100);
  });

  $("html").delegate("#dev-helper-text", "click", function () {
    $("#dev-helper-text").toggleClass("is-active");
    setTimeout(function () {
      var doc = $("#viewport-iframe")[0].contentWindow.document;
      var $html = $("html", doc);
      $html.toggleClass("dev--highlight-typography");
    }, 100);
  });

  /* MQ Viewports
    ----------------------------------------------------------------- */
  var $frame = $("#viewport-iframe");
  setTimeout(function () {
    var doc = $frame[0].contentWindow.document;
    var $html = $("html", doc);
    var stylesheet = $html.find("link[rel='stylesheet']").attr("href");
    console.log(stylesheet);
    var mediaQueries = [];
    $.get(stylesheet, null, function (data) {
      // Find all comments in css
      var mqs = data.match(/@media[^{]+\{([\s\S]+?})\s*}/g);
      // For each comment
      console.log("comments each");
      console.log(mqs);
      if (mqs) {
        $.each(mqs, function (i) {
          console.log("* comments each");
          var mq = mqs[i].split("@media (min-width: ")[1];
          // If ems
          if (mq.indexOf("em") > 0) {
            mq = mq.split("em")[0] + "em";
          }
          // If px
          if (mq.indexOf("px") > 0) {
            mq = mq.split("px")[0] + "px";
          }
          // Add to array
          mediaQueries.push(mq);
        });

        console.log(mediaQueries);

        //localStorage.setItem("sr_mediaqueries", JSON.stringify(mediaQueries));

        //var mediaQueries = JSON.parse(localStorage.getItem("sr_mediaqueries"));

        var mediaQueriesHTML = "";
        // Build the Media Queries menu
        console.log("mediaQueries each");
        $.each(mediaQueries, function (i) {
          console.log("* mediaQueries each");
          var theMQ = mediaQueries[i];
          mediaQueriesHTML +=
            "<li><a class='dimension-option' data-dimension-option-name='" +
            theMQ +
            "' data-dimension-option-width='" +
            theMQ +
            "' data-dimension-option-height='full'>" +
            theMQ +
            "</a></li>";
        });
        $("#mq-viewports").append(mediaQueriesHTML);
      }
    });
  }, 100);

  /* Notes
    -----------------------------------------------------------------
    if (localStorage.getItem("SR_Notes")) {
      $("#note").text(localStorage.getItem("SR_Notes"));
    }
    function saveNoteContents() {
      localStorage.setItem("SR_Notes", $("#note").text());
    }
    $("#note").on("blur", function(){
      saveNoteContents();
    });
  */

  /* Keyup Indicator
    ----------------------------------------------------------------- */
  $(document).on("keyup", function (event) {
    $("#keypress-section").show();
    $("#keypress").text(event.which);
    setTimeout(function () {
      $("#keypress-section").fadeOut();
    }, 500);
  });

  /* Resize Viewport
    ----------------------------------------------------------------- */
  function resizeViewport(settingName, settingWidth, settingHeight) {
    var settingHeight, settingWidth;

    if (settingName == "iPhone 5 Portrait") {
      settingHeight = 568;
      settingWidth = 320;
    }

    if (settingName == "iPhone 5 Landscape") {
      settingHeight = 320;
      settingWidth = 568;
    }

    if (settingName == "iPad Portrait") {
      settingHeight = 1024;
      settingWidth = 768;
    }

    if (settingName == "iPad Landscape") {
      settingHeight = 768;
      settingWidth = 1024;
    }

    $("#viewport-iframe-wrap")
      .attr("data-setting-name", settingName.replace(/\s+/g, "-").toLowerCase())
      .removeClass("is-showing-overlay")
      .animate(
        {
          height: settingHeight,
          width: settingWidth,
        },
        500,
        function () {
          updateViewportDimensions();
        }
      );

    $("#overlay-image").fadeOut();
    $("#viewport-iframe").attr("scrolling", "auto").animate({ opacity: 1 });
    $("#viewport").addClass("viewport-resized");
    $("#toggle-chrome").fadeIn();
    $("#viewport-title").fadeIn().find("span").text(settingName);
  }

  /* Resize Viewport To Match Overlays
    ----------------------------------------------------------------- */
  function resizeViewportToMatchOverlay() {
    console.log("** resizeViewportToMatchOverlay");
    $("#overlay-image").show();
    var $img = $("#overlay-image");
    var wrapHeight = $(window).height() - 109;
    console.log("** 1");
    $("#viewport-iframe").attr("scrolling", "no");
    $("#viewport").addClass("viewport-resized");
    $("#toggle-chrome").fadeOut();
    console.log("** 2");
    $("#viewport-iframe-wrap")
      .removeClass("is-showing-chrome")
      .addClass("is-showing-overlay")
      .animate(
        { width: $img.width(), height: $img.height() },
        500,
        function () {
          updateViewportDimensions();
        }
      );
    // console.log('** 3');
    // var activeOverlayFilename = "Matching " + $(".overlay-option .active").text();
    // console.log('** 3a', activeOverlayFilename);
    // $("#viewport-title").fadeIn().find("span").text(activeOverlayFilename);
    // console.log('** 3b');
  }

  /* Toggle Chrome
    ----------------------------------------------------------------- */
  $("#toggle-chrome").on("click", function (e) {
    e.preventDefault();
    var el = $(this);
    el.toggleClass("is-active");
    $("#viewport-iframe-wrap").toggleClass("is-showing-chrome");
  });

  /* Dimension Options
    ----------------------------------------------------------------- */

  // Clicking Dimension Option
  $("html").delegate(".dimension-option", "click", function (event) {
    event.preventDefault();
    $(".dimension-option").removeClass("is-active");
    $(this).addClass("is-active");
    var $this = $(this),
      dimW = $this.data("dimension-option-width"),
      dimH = $this.data("dimension-option-height");
    // if W contains px
    if (dimW.indexOf("px") > -1) {
      dimW = dimW.split("px")[0];
    }
    // if W contains em
    if (dimW.indexOf("em") > -1) {
      dimW = parseInt(dimW.split("em")[0]) * 16;
    }
    // if H is 'full'
    if (dimH == "full" > -1) {
      dimH =
        $(window).height() -
        ($("#controls").height() + $("#controls-secondary").height());
    }
    resizeViewport(
      $this.data("dimension-option-name"),
      $this.data("dimension-option-width"),
      $this.data("dimension-option-height")
    );
  });

  // Clicking Dimension Normal
  $(".dimension-normal").on("click", function (event) {
    event.preventDefault();
    $("#viewport-title").fadeOut(function () {
      $("#viewport").removeClass("viewport-resized");
      var calculatedWindowHeight =
        $(window).height() -
        ($("#controls").height() + $("#controls-secondary").height());
      $("#viewport-iframe-wrap")
        .attr("data-setting-name", "reset")
        .removeClass("is-showing-chrome")
        .animate(
          {
            height: calculatedWindowHeight,
            width: "100%",
          },
          function () {
            updateViewportDimensions();
          }
        );
    });
  });

  // Clicking Match Overlay Size
  $(".dimension-resize-to-match-overlay").on("click", function (event) {
    event.preventDefault();
    resizeViewportToMatchOverlay();
  });

  /* Overlay Functionality
    ----------------------------------------------------------------- */

  // Clicking Delete Overlay
  $(".delete-overlay-option").on("click", function (event) {
    var i;
    event.preventDefault();
    $(this).parent().remove();
    i = $(this).data("overlay-option-key");
    overlays.splice(i, 1);
    localStorage.setItem("SR_Overlays", JSON.stringify(overlays));
  });

  // Choosing Overlay Option
  $("html").delegate(".overlay-option a", "click", function (e) {
    console.log("overlay option click");
    e.preventDefault();
    var imgSrc;
    if ($("#overlay-image").length) {
      $("#overlay-image").remove();
    }
    console.log(1);
    imgSrc = $(this).find("img").attr("src");
    // REMOVE ACTIVE CLASS
    $(".overlay-option .active").removeClass("active");
    // ADD ACTIVE CLASS TO THIS A
    console.log(2);
    $(this).addClass("active");
    // Add Draggable overlay
    $("#viewport-iframe-wrap").prepend(
      $("<img draggable='true' id='overlay-image' src='" + imgSrc + "'>")
    );
    $("#overlay-image").draggable();
    console.log(3);
    // ACTIVATE OVERLAY CONTROLS
    $(".overlay-control").addClass("active");
    console.log(4);
    // RESIZE VIEWPORT TO MATCH
    setTimeout(function () {
      resizeViewportToMatchOverlay();
    }, 500);
    // SET OPACITY TO 50
    console.log(5);
    $("#overlay-file-opacity")
      .attr("value", 50)
      .css(
        "background",
        "-webkit-gradient(linear, left top, right top, color-stop(50%,#fff), color-stop(50%,#DFDFDF), color-stop(0%,#fff))"
      );
    $("#viewport-iframe").css("opacity", 0.5);
    // ENABLE MATCH OVERLAY VIEWPORT
    $("#resize-match-overlay").show();
    console.log(6);
  });

  // Overlay File Opacity
  $("#overlay-file-opacity").on("change", function () {
    var percentage = $(this).val();
    $(this).css({
      background:
        "-webkit-gradient(linear, left top, right top, color-stop(" +
        percentage +
        "%,#fff), color-stop(" +
        percentage +
        "%,#DFDFDF), color-stop(0%,#fff))",
    });
    // CHANGE IFRAME'S OPACITY
    // We want the percentage of how much to reduce the opacity of the iframe, so we go for the inverse number
    var iframePercentage = 100 - percentage;
    $("#viewport-iframe").css({
      opacity: iframePercentage / 100,
    });
  });

  /* Toggle overlay active state (Move Button)
    ----------------------------------------------------------------- */
  $(document).on("click", "#overlay-toggle-active", function (event) {
    event.preventDefault();
    $("#overlay-image, #overlay-toggle-active, #viewport-iframe").toggleClass(
      "active"
    );
  });

  /* Update Viewport Dimensions
    ----------------------------------------------------------------- */
  function updateViewportDimensions() {
    var desktop, laptop, phone, rI, tablet, wI, wW, win;
    win = $("#viewport-iframe");
    wW = win.width();
    wI = "phone";
    rI = false;
    if (wW > 320) {
      wI = "phone";
      rI = true;
    }
    if (wW > 568) {
      wI = "tablet";
      rI = false;
    }
    if (wW > 768) {
      wI = "tablet";
      rI = true;
    }
    if (wW > 1024) {
      wI = "laptop";
      rI = false;
    }
    if (wW > 1400) {
      wI = "desktop";
      rI = false;
    }
    $("#icon-window-width").attr("class", "icon icon-" + wI);
    if (rI) {
      $("#icon-window-width").addClass("rotated");
    } else {
      $("#icon-window-width").removeClass("rotated");
    }
    $("#window-width").html(wW);
    $("#window-height").html(win.height());
  }

  /* Update Monitor Resolution
    ----------------------------------------------------------------- */
  function updateMonitorResolution() {
    var monitorResolution = window.devicePixelRatio;
    $("#resolution").html("Pixel Density " + monitorResolution);
    if (monitorResolution > 1) {
      $(".icon-resolution").html("&#xE9A0;");
    } else {
      $(".icon-resolution").html("&#xE9A3;");
    }
  }

  /* Update Browser Info
    ----------------------------------------------------------------- */
  function updateBrowserInfo() {
    $("#browser-info").html(
      BrowserDetect.browser +
        " " +
        BrowserDetect.version +
        " on " +
        BrowserDetect.OS
    );
  }

  /* Bind functions to Window
    ----------------------------------------------------------------- */
  $(window).bind("resize", function () {
    updateViewportDimensions();
  });

  /* Button Toggler Helper
    ----------------------------------------------------------------- */
  $("a[data-toggle]").on("click", function (e) {
    e.preventDefault();
    console.log("toggler clicked");
    var $this = $(this),
      $buttonGroup = $this.parents(".button-group");
    if ($this.hasClass("active")) {
      $buttonGroup.find("a[data-toggle].active").removeClass("active");
      $buttonGroup.find(".button-options.active").hide().removeClass("active");
    } else {
      $("a[data-toggle].active").removeClass("active");
      $(".button-options.active").hide().removeClass("active");
      $this.addClass("active");
      $("#" + $this.data("toggle"))
        .show()
        .addClass("active");
    }
  });
}; // end init

/* BROWSER DETECT
  ------------------------------------------------------------------- */
var BrowserDetect = {
  init: function () {
    this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
    this.version =
      this.searchVersion(navigator.userAgent) ||
      this.searchVersion(navigator.appVersion) ||
      "an unknown version";
    this.OS = this.searchString(this.dataOS) || "an unknown OS";
  },

  searchString: function (data) {
    for (var i = 0; i < data.length; i++) {
      var dataString = data[i].string;
      var dataProp = data[i].prop;
      this.versionSearchString = data[i].versionSearch || data[i].identity;
      if (dataString) {
        if (dataString.indexOf(data[i].subString) != -1)
          return data[i].identity;
      } else if (dataProp) return data[i].identity;
    }
  },
  searchVersion: function (dataString) {
    var index = dataString.indexOf(this.versionSearchString);
    if (index == -1) return false;
    return parseFloat(
      dataString.substring(index + this.versionSearchString.length + 1)
    );
  },
  dataBrowser: [
    {
      string: navigator.userAgent,
      subString: "Chrome",
      identity: "Chrome",
    },
    {
      string: navigator.userAgent,
      subString: "OmniWeb",
      versionSearch: "OmniWeb/",
      identity: "OmniWeb",
    },
    {
      string: navigator.vendor,
      subString: "Apple",
      identity: "Safari",
      versionSearch: "Version",
    },
    {
      prop: window.opera,
      identity: "Opera",
      versionSearch: "Version",
    },
    {
      string: navigator.vendor,
      subString: "iCab",
      identity: "iCab",
    },
    {
      string: navigator.vendor,
      subString: "KDE",
      identity: "Konqueror",
    },
    {
      string: navigator.userAgent,
      subString: "Firefox",
      identity: "Firefox",
    },
    {
      string: navigator.vendor,
      subString: "Camino",
      identity: "Camino",
    },
    {
      // for newer Netscapes (6+)
      string: navigator.userAgent,
      subString: "Netscape",
      identity: "Netscape",
    },
    {
      string: navigator.userAgent,
      subString: "MSIE",
      identity: "Explorer",
      versionSearch: "MSIE",
    },
    {
      string: navigator.userAgent,
      subString: "Gecko",
      identity: "Mozilla",
      versionSearch: "rv",
    },
    {
      // for older Netscapes (4-)
      string: navigator.userAgent,
      subString: "Mozilla",
      identity: "Netscape",
      versionSearch: "Mozilla",
    },
  ],
  dataOS: [
    {
      string: navigator.platform,
      subString: "Win",
      identity: "Windows",
    },
    {
      string: navigator.platform,
      subString: "Mac",
      identity: "Mac",
    },
    {
      string: navigator.userAgent,
      subString: "iPhone",
      identity: "iPhone/iPod",
    },
    {
      string: navigator.platform,
      subString: "Linux",
      identity: "Linux",
    },
  ],
};
BrowserDetect.init();

/* READ URL
  ----------------------------------------------------------------- */
function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      var filedata = e.target.result;
      var filename = $("#overlay-file-selector")
        .val()
        .replace("C:\\fakepath\\", "");
      var selectorParent = $("#overlay-file-selector").parent();
      var selectorClone = $("#overlay-file-selector").clone();
      $("#overlay-file-selector").remove();
      selectorClone.appendTo(selectorParent);
      $("#overlay").append(
        "<li class='overlay-option'><a href=''><img src='" +
          filedata +
          "'> " +
          filename +
          "</a><a class='delete-overlay-option'>x</a></li>"
      );
      // PUSH TO OVERLAYS JSON OBJECT
      overlays.push({ overlayFilename: filename, overlayFiledata: filedata });
      localStorage.setItem("SR_Overlays", JSON.stringify(overlays));
    };
    reader.readAsDataURL(input.files[0]);
  }
}

/* LOAD
  ----------------------------------------------------------------- */

// Add jquery.js which includes jquery and jquery-ui
//
SkylineRisejQuery = document.createElement("script");
SkylineRisejQuery.setAttribute("id", "skyline-rise-bookmarklet-jquery");
SkylineRisejQuery.setAttribute(
  "src",
  window.SkylineRiseBookmarkletDomain + "/javascripts/jquery.js"
);
SkylineRisejQuery.onload = function () {
  initSR();
};
document.body.appendChild(SkylineRisejQuery);
