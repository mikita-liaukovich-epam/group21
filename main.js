/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/bigpicture/index.js":
/*!******************************************!*\
  !*** ./node_modules/bigpicture/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// BigPicture.js | license MIT | henrygd.me/bigpicture
(function () {
  var // assign window object to variable
  global = window,
      // trigger element used to open popup
  el,
      // set to true after first interaction
  initialized,
      // container element holding html needed for script
  container,
      // currently active display element (image, video, youtube / vimeo iframe container)
  displayElement,
      // popup image element
  displayImage,
      // popup video element
  displayVideo,
      // popup audio element
  displayAudio,
      // container element to hold youtube / vimeo iframe
  iframeContainer,
      // iframe to hold youtube / vimeo player
  iframeSiteVid,
      // store requested image source
  imgSrc,
      // button that closes the container
  closeButton,
      // youtube / vimeo video id
  siteVidID,
      // keeps track of loading icon display state
  isLoading,
      // timeout to check video status while loading
  checkMediaTimeout,
      // loading icon element
  loadingIcon,
      // caption element
  caption,
      // caption content element
  captionText,
      // store caption content
  captionContent,
      // hide caption button element
  captionHideButton,
      // open state for container element
  isOpen,
      // gallery open state
  galleryOpen,
      // used during close animation to avoid triggering timeout twice
  isClosing,
      // array of prev viewed image urls to check if cached before showing loading icon
  imgCache = [],
      // store whether image requested is remote or local
  remoteImage,
      // store animation opening callbacks
  animationStart,
      animationEnd,
      // gallery left / right icons
  rightArrowBtn,
      leftArrowBtn,
      // position of gallery
  galleryPosition,
      // hold active gallery els / image src
  galleryEls,
      // counter element
  galleryCounter,
      // store images in gallery that are being loaded
  preloadedImages = {},
      // whether device supports touch events
  supportsTouch,
      // options object
  opts,
      // Save bytes in the minified version
  doc = document,
      appendEl = 'appendChild',
      createEl = 'createElement',
      removeEl = 'removeChild',
      htmlInner = 'innerHTML',
      pointerEventsAuto = 'pointer-events:auto',
      cHeight = 'clientHeight',
      cWidth = 'clientWidth',
      listenFor = 'addEventListener',
      timeout = global.setTimeout,
      clearTimeout = global.clearTimeout;

  module.exports = function (options) {
    // initialize called on initial open to create elements / style / event handlers
    initialized || initialize(); // clear currently loading stuff

    if (isLoading) {
      clearTimeout(checkMediaTimeout);
      removeContainer();
    }

    opts = options; // store video id if youtube / vimeo video is requested

    siteVidID = options.ytSrc || options.vimeoSrc; // store optional callbacks

    animationStart = options.animationStart;
    animationEnd = options.animationEnd; // set trigger element

    el = options.el; // wipe existing remoteImage state

    remoteImage = false; // set caption if provided

    captionContent = el.getAttribute('data-caption');

    if (options.gallery) {
      makeGallery(options.gallery);
    } else if (siteVidID || options.iframeSrc) {
      // if vimeo, youtube, or iframe video
      toggleLoadingIcon(true);
      displayElement = iframeContainer;
      createIframe();
    } else if (options.imgSrc) {
      // if remote image
      remoteImage = true;
      imgSrc = options.imgSrc;
      !~imgCache.indexOf(imgSrc) && toggleLoadingIcon(true);
      displayElement = displayImage;
      displayElement.src = imgSrc;
    } else if (options.audio) {
      // if direct video link
      toggleLoadingIcon(true);
      displayElement = displayAudio;
      displayElement.src = options.audio;
      checkMedia('audio file');
    } else if (options.vidSrc) {
      // if direct video link
      toggleLoadingIcon(true);
      makeVidSrc(options.vidSrc);
      checkMedia('video');
    } else {
      // local image / background image already loaded on page
      displayElement = displayImage; // get img source or element background image

      displayElement.src = el.tagName === 'IMG' ? el.src : global.getComputedStyle(el).backgroundImage.replace(/^url|[(|)|'|"]/g, '');
    } // add container to page


    container[appendEl](displayElement);
    doc.body[appendEl](container);
  }; // create all needed methods / store dom elements on first use


  function initialize() {
    var startX; // return close button elements

    function createCloseButton(className) {
      var el = doc[createEl]('button');
      el.className = className;
      el[htmlInner] = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="M28 24L47 5a3 3 0 1 0-4-4L24 20 5 1a3 3 0 1 0-4 4l19 19L1 43a3 3 0 1 0 4 4l19-19 19 19a3 3 0 0 0 4 0v-4L28 24z"/></svg>';
      return el;
    }

    function createArrowSymbol(direction, style) {
      var el = doc[createEl]('button');
      el.className = 'bp-lr';
      el[htmlInner] = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129 129" height="70" fill="#fff"><path d="M88.6 121.3c.8.8 1.8 1.2 2.9 1.2s2.1-.4 2.9-1.2a4.1 4.1 0 0 0 0-5.8l-51-51 51-51a4.1 4.1 0 0 0-5.8-5.8l-54 53.9a4.1 4.1 0 0 0 0 5.8l54 53.9z"/></svg>';
      changeCSS(el, style);

      el.onclick = function (e) {
        e.stopPropagation();
        updateGallery(direction);
      };

      return el;
    } // add style - if you want to tweak, run through beautifier


    var style = doc[createEl]('STYLE');
    style[htmlInner] = '#bp_caption,#bp_container{bottom:0;left:0;right:0;position:fixed;opacity:0}#bp_container>*,#bp_loader{position:absolute;right:0;z-index:10}#bp_container{top:0;z-index:9999;background:rgba(0,0,0,.7);opacity:0;pointer-events:none;transition:opacity .35s}#bp_loader{top:0;left:0;bottom:0;display:flex;margin:0;cursor:wait;z-index:9;background:0 0}#bp_loader svg{width:50%;max-width:300px;max-height:50%;margin:auto;animation:bpturn 1s infinite linear}#bp_aud,#bp_container img,#bp_sv,#bp_vid{user-select:none;max-height:96%;max-width:96%;top:0;bottom:0;left:0;margin:auto;box-shadow:0 0 3em rgba(0,0,0,.4);z-index:-1}#bp_sv{height:0;padding-bottom:54%;background-color:#000;width:96%}#bp_caption{pointer-events:none;font-size:.9em;padding:1.3em;background:rgba(15,15,15,.94);color:#fff;text-align:center;transition:opacity .3s}#bp_aud{width:650px;top:calc(50% - 20px);bottom:auto;box-shadow:none}#bp_count{left:0;right:auto;padding:14px;color:rgba(255,255,255,.7);font-size:22px;cursor:default}#bp_container button{position:absolute;border:0;outline:0;background:0 0;cursor:pointer;transition:all .1s}#bp_container>.bp-x{height:41px;width:41px;border-radius:100%;line-height:50px;top:8px;right:14px;opacity:.8}#bp_container>.bp-x:focus,#bp_container>.bp-x:hover{background:rgba(255,255,255,.2)}.bp-x svg,.bp-xc svg{height:20px;width:20px;fill:#fff}.bp-xc svg{width:16px}#bp_container .bp-xc{left:2%;bottom:100%;padding:9px 20px 4px;background:#d04444;border-radius:2px 2px 0 0;opacity:.85}#bp_container .bp-xc:focus,#bp_container .bp-xc:hover{opacity:1}.bp-lr{top:50%;top:calc(50% - 130px);padding:99px 0;width:6%;background:0 0;border:0;opacity:.4;transition:opacity .1s}.bp-lr:focus,.bp-lr:hover{opacity:.8}@keyframes bpf{50%{transform:translatex(15px)}100%{transform:none}}@keyframes bpl{50%{transform:translatex(-15px)}100%{transform:none}}@keyframes bpfl{0%{opacity:0;transform:translatex(70px)}100%{opacity:1;transform:none}}@keyframes bpfr{0%{opacity:0;transform:translatex(-70px)}100%{opacity:1;transform:none}}@keyframes bpfol{0%{opacity:1;transform:none}100%{opacity:0;transform:translatex(-70px)}}@keyframes bpfor{0%{opacity:1;transform:none}100%{opacity:0;transform:translatex(70px)}}@keyframes bpturn{0%{transform:none}100%{transform:rotate(360deg)}}@media (max-width:600px){.bp-lr{font-size:15vw}}@media (min-aspect-ratio:9/5){#bp_sv{height:98%;width:170.6vh;padding:0}}';
    doc.head[appendEl](style); // create container element

    container = doc[createEl]('DIV');
    container.id = 'bp_container';
    container.onclick = close;
    closeButton = createCloseButton('bp-x');
    container[appendEl](closeButton); // gallery swipe listeners

    if ('ontouchstart' in global) {
      supportsTouch = true;

      container.ontouchstart = function (e) {
        startX = e.changedTouches[0].pageX;
      };

      container.ontouchmove = function (e) {
        e.preventDefault();
      };

      container.ontouchend = function (e) {
        if (!galleryOpen) {
          return;
        }

        var touchobj = e.changedTouches[0];
        var distX = touchobj.pageX - startX; // swipe right

        distX < -30 && updateGallery(1); // swipe left

        distX > 30 && updateGallery(-1);
      };
    } // create display image element


    displayImage = doc[createEl]('IMG'); // create display video element

    displayVideo = doc[createEl]('VIDEO');
    displayVideo.id = 'bp_vid';
    displayVideo.setAttribute('playsinline', true);
    displayVideo.controls = true;
    displayVideo.loop = true; // create audio element

    displayAudio = doc[createEl]("audio");
    displayAudio.id = "bp_aud";
    displayAudio.controls = true;
    displayAudio.loop = true; // create gallery counter

    galleryCounter = doc[createEl]('span');
    galleryCounter.id = 'bp_count'; // create caption elements

    caption = doc[createEl]('DIV');
    caption.id = 'bp_caption';
    captionHideButton = createCloseButton('bp-xc');
    captionHideButton.onclick = toggleCaption.bind(null, false);
    caption[appendEl](captionHideButton);
    captionText = doc[createEl]('SPAN');
    caption[appendEl](captionText);
    container[appendEl](caption); // left / right arrow icons

    rightArrowBtn = createArrowSymbol(1, 'transform:scalex(-1)');
    leftArrowBtn = createArrowSymbol(-1, 'left:0;right:auto'); // create loading icon element

    loadingIcon = doc[createEl]('DIV');
    loadingIcon.id = 'bp_loader';
    loadingIcon[htmlInner] = '<svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 32 32" fill="#fff" opacity=".8"><path d="M16 0a16 16 0 0 0 0 32 16 16 0 0 0 0-32m0 4a12 12 0 0 1 0 24 12 12 0 0 1 0-24" fill="#000" opacity=".5"/><path d="M16 0a16 16 0 0 1 16 16h-4A12 12 0 0 0 16 4z"/></svg>'; // create youtube / vimeo container

    iframeContainer = doc[createEl]('DIV');
    iframeContainer.id = 'bp_sv'; // create iframe to hold youtube / vimeo player

    iframeSiteVid = doc[createEl]('IFRAME');
    iframeSiteVid.allowFullscreen = true;
    iframeSiteVid.onload = open;
    changeCSS(iframeSiteVid, 'border:0;position:absolute;height:100%;width:100%;left:0;top:0');
    iframeContainer[appendEl](iframeSiteVid); // display image bindings for image load and error

    displayImage.onload = open;
    displayImage.onerror = open.bind(null, 'image'); // adjust loader position on window resize

    global[listenFor]('resize', function () {
      galleryOpen || isLoading && toggleLoadingIcon(true);
    }); // close container on escape key press and arrow buttons for gallery

    doc[listenFor]('keyup', function (e) {
      var key = e.keyCode;
      key === 27 && isOpen && close(container);

      if (galleryOpen) {
        key === 39 && updateGallery(1);
        key === 37 && updateGallery(-1);
        key === 38 && updateGallery(10);
        key === 40 && updateGallery(-10);
      }
    }); // prevent scrolling with arrow keys if gallery open

    doc[listenFor]('keydown', function (e) {
      var usedKeys = [37, 38, 39, 40];

      if (galleryOpen && ~usedKeys.indexOf(e.keyCode)) {
        e.preventDefault();
      }
    }); // trap focus within conainer while open

    doc[listenFor]('focus', function (e) {
      if (isOpen && !container.contains(e.target)) {
        e.stopPropagation();
        closeButton.focus();
      }
    }, true); // all done

    initialized = true;
  } // return transform style to make full size display el match trigger el size


  function getRect() {
    var rect = el.getBoundingClientRect();
    var leftOffset = rect.left - (container[cWidth] - rect.width) / 2;
    var centerTop = rect.top - (container[cHeight] - rect.height) / 2;
    var scaleWidth = el[cWidth] / displayElement[cWidth];
    var scaleHeight = el[cHeight] / displayElement[cHeight];
    return 'transform:translate3D(' + leftOffset + 'px, ' + centerTop + 'px, 0) scale3D(' + scaleWidth + ', ' + scaleHeight + ', 0)';
  }

  function makeVidSrc(source) {
    if (Array.isArray(source)) {
      displayElement = displayVideo.cloneNode();
      source.forEach(function (src) {
        var source = doc[createEl]('SOURCE');
        source.src = src;
        source.type = 'video/' + src.match(/.(\w+)$/)[1];
        displayElement[appendEl](source);
      });
    } else {
      displayElement = displayVideo;
      displayElement.src = source;
    }
  }

  function makeGallery(gallery) {
    if (Array.isArray(gallery)) {
      // is array of images
      galleryPosition = 0;
      galleryEls = gallery;
      captionContent = gallery[0].caption;
    } else {
      // is element selector or nodelist
      galleryEls = [].slice.call(typeof gallery === 'string' ? doc.querySelectorAll(gallery + ' [data-bp]') : gallery); // find initial gallery position

      var elIndex = galleryEls.indexOf(el);
      galleryPosition = elIndex !== -1 ? elIndex : 0; // make gallery object w/ els / src / caption

      galleryEls = galleryEls.map(function (el) {
        return {
          el: el,
          src: el.getAttribute('data-bp'),
          caption: el.getAttribute('data-caption')
        };
      });
    } // show loading icon if needed


    remoteImage = true; // set initial src to imgSrc so it will be cached in open func

    imgSrc = galleryEls[galleryPosition].src;
    !~imgCache.indexOf(imgSrc) && toggleLoadingIcon(true);

    if (galleryEls.length > 1) {
      // if length is greater than one, add gallery stuff
      container[appendEl](galleryCounter);
      galleryCounter[htmlInner] = galleryPosition + 1 + '/' + galleryEls.length;

      if (!supportsTouch) {
        // add arrows if device doesn't support touch
        container[appendEl](rightArrowBtn);
        container[appendEl](leftArrowBtn);
      }
    } else {
      // gallery is one, just show without clutter
      galleryEls = false;
    }

    displayElement = displayImage; // set initial image src

    displayElement.src = imgSrc;
  }

  function updateGallery(movement) {
    var galleryLength = galleryEls.length - 1;
    var isEnd; // only allow one change at a time

    if (isLoading) {
      return;
    } // return if requesting out of range image


    if (movement > 0) {
      if (galleryPosition === galleryLength) {
        isEnd = true;
      }
    } else if (galleryPosition === 0) {
      isEnd = true;
    }

    if (isEnd) {
      // if beginning or end of gallery, run end animation
      changeCSS(displayImage, '');
      timeout(changeCSS, 9, displayImage, 'animation:' + (movement > 0 ? 'bpl' : 'bpf') + ' .3s;transition:transform .35s');
      return;
    } // normalize position


    galleryPosition = Math.max(0, Math.min(galleryPosition + movement, galleryLength)) // load images before and after for quicker scrolling through pictures
    ;
    [galleryPosition - 1, galleryPosition, galleryPosition + 1].forEach(function (position) {
      // normalize position
      position = Math.max(0, Math.min(position, galleryLength)); // cancel if image has already been preloaded

      if (preloadedImages[position]) return;
      var src = galleryEls[position].src; // create image for preloadedImages

      var img = doc[createEl]('IMG');
      img[listenFor]('load', addToImgCache.bind(null, src));
      img.src = src;
      preloadedImages[position] = img;
    }); // if image is loaded, show it

    if (preloadedImages[galleryPosition].complete) {
      return changeGalleryImage(movement);
    } // if not, show loading icon and change when loaded


    isLoading = true;
    changeCSS(loadingIcon, 'opacity:.4;');
    container[appendEl](loadingIcon);

    preloadedImages[galleryPosition].onload = function () {
      galleryOpen && changeGalleryImage(movement);
    }; // if error, store error object in el array


    preloadedImages[galleryPosition].onerror = function () {
      galleryEls[galleryPosition] = {
        error: 'Error loading image'
      };
      galleryOpen && changeGalleryImage(movement);
    };
  }

  function changeGalleryImage(movement) {
    if (isLoading) {
      container[removeEl](loadingIcon);
      isLoading = false;
    }

    var activeEl = galleryEls[galleryPosition];

    if (activeEl.error) {
      // show alert if error
      alert(activeEl.error);
    } else {
      // add new image, animate images in and out w/ css animation
      var oldimg = container.querySelector('img:last-of-type');
      displayImage = displayElement = preloadedImages[galleryPosition];
      changeCSS(displayImage, 'animation:' + (movement > 0 ? 'bpfl' : 'bpfr') + ' .35s;transition:transform .35s');
      changeCSS(oldimg, 'animation:' + (movement > 0 ? 'bpfol' : 'bpfor') + ' .35s both');
      container[appendEl](displayImage); // update el for closing animation

      if (activeEl.el) {
        el = activeEl.el;
      }
    } // update counter


    galleryCounter[htmlInner] = galleryPosition + 1 + '/' + galleryEls.length; // show / hide caption

    toggleCaption(galleryEls[galleryPosition].caption);
  } // create video iframe


  function createIframe() {
    var url;
    var prefix = 'https://';
    var suffix = 'autoplay=1'; // create appropriate url

    if (opts.ytSrc) {
      url = prefix + 'www.youtube.com/embed/' + siteVidID + '?html5=1&rel=0&playsinline=1&' + suffix;
    } else if (opts.vimeoSrc) {
      url = prefix + 'player.vimeo.com/video/' + siteVidID + '?' + suffix;
    } else if (opts.iframeSrc) {
      url = opts.iframeSrc;
    } // set iframe src to url


    iframeSiteVid.src = url;
  } // timeout to check video status while loading


  function checkMedia(errMsg) {
    if (~[1, 4].indexOf(displayElement.readyState)) {
      open(); // short timeout to to make sure controls show in safari 11

      timeout(function () {
        displayElement.play();
      }, 99);
    } else if (displayElement.error) open(errMsg);else checkMediaTimeout = timeout(checkMedia, 35, errMsg);
  } // hide / show loading icon


  function toggleLoadingIcon(bool) {
    // don't show loading icon if noLoader is specified
    if (opts.noLoader) return; // bool is true if we want to show icon, false if we want to remove
    // change style to match trigger element dimensions if we want to show

    bool && changeCSS(loadingIcon, 'top:' + el.offsetTop + 'px;left:' + el.offsetLeft + 'px;height:' + el[cHeight] + 'px;width:' + el[cWidth] + 'px'); // add or remove loader from DOM

    el.parentElement[bool ? appendEl : removeEl](loadingIcon);
    isLoading = bool;
  } // hide & show caption


  function toggleCaption(captionContent) {
    if (captionContent) {
      captionText[htmlInner] = captionContent;
    }

    changeCSS(caption, 'opacity:' + (captionContent ? '1;' + pointerEventsAuto : '0'));
  }

  function addToImgCache(url) {
    !~imgCache.indexOf(url) && imgCache.push(url);
  } // animate open of image / video; display caption if needed


  function open(err) {
    // hide loading spinner
    isLoading && toggleLoadingIcon(); // execute animationStart callback

    animationStart && animationStart(); // check if we have an error string instead of normal event

    if (typeof err === 'string') {
      removeContainer();
      return opts.onError ? opts.onError() : alert('Error: The requested ' + err + ' could not be loaded.');
    } // if remote image is loaded, add url to imgCache array


    remoteImage && addToImgCache(imgSrc); // transform displayEl to match trigger el

    changeCSS(displayElement, getRect()); // fade in container

    changeCSS(container, 'opacity:1;' + pointerEventsAuto); // set animationEnd callback to run after animation ends (cleared if container closed)

    animationEnd = timeout(animationEnd, 410);
    isOpen = true;
    galleryOpen = !!galleryEls; // enlarge displayEl, fade in caption if hasCaption

    timeout(function () {
      changeCSS(displayElement, 'transition:transform .35s;transform:none');
      captionContent && timeout(toggleCaption, 250, captionContent);
    }, 60);
  } // close active display element


  function close(e) {
    var target = e.target;
    var clickEls = [caption, captionHideButton, displayVideo, displayAudio, captionText, leftArrowBtn, rightArrowBtn, loadingIcon]; // blur to hide close button focus style

    target && target.blur(); // don't close if one of the clickEls was clicked or container is already closing

    if (isClosing || ~clickEls.indexOf(target)) {
      return;
    } // animate closing


    displayElement.style.cssText += getRect();
    changeCSS(container, pointerEventsAuto); // timeout to remove els from dom; use variable to avoid calling more than once

    timeout(removeContainer, 350); // clear animationEnd timeout

    clearTimeout(animationEnd);
    isOpen = false;
    isClosing = true;
  } // remove container / display element from the DOM


  function removeContainer() {
    // remove container from DOM & clear inline style
    doc.body[removeEl](container);
    container[removeEl](displayElement);
    changeCSS(container, '') // clear src of displayElement (or iframe if display el is iframe container)
    ;
    (displayElement === iframeContainer ? iframeSiteVid : displayElement).removeAttribute('src'); // remove caption

    toggleCaption(false);

    if (galleryOpen) {
      // remove all gallery stuff
      var images = container.querySelectorAll('img');

      for (var i = 0; i < images.length; i++) {
        container[removeEl](images[i]);
      }

      isLoading && container[removeEl](loadingIcon);
      container[removeEl](galleryCounter);
      galleryOpen = galleryEls = false;
      preloadedImages = {};
      supportsTouch || container[removeEl](rightArrowBtn);
      supportsTouch || container[removeEl](leftArrowBtn); // in case displayimage changed, we need to update event listeners

      displayImage.onload = open;
      displayImage.onerror = open.bind(null, 'image');
    } // run close callback


    opts.onClose && opts.onClose();
    isClosing = isLoading = false;
  } // style helper functions


  function changeCSS(element, newStyle) {
    element.style.cssText = newStyle;
  }
})();

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _screens_main_main__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./screens/main/main */ "./src/screens/main/main.js");
/* harmony import */ var _screens_aboutUS_aboutUs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./screens/aboutUS/aboutUs */ "./src/screens/aboutUS/aboutUs.js");
/* harmony import */ var _screens_list_list__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./screens/list/list */ "./src/screens/list/list.js");




/***/ }),

/***/ "./src/screens/aboutUS/about.template.js":
/*!***********************************************!*\
  !*** ./src/screens/aboutUS/about.template.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n<div class=\"lists-container\">\n  <img src='./assets/developer/devs.png' class='logotype'>\n  <main class = 'user-container'>\n    <a class = \"close\"> &#10006;</a>\n    <section class=\"user-content\">\n        <h3>Nick Levkovich</h3>\n        <div class=\"user-card\">\n          <div class = \"user-foto\"></div>\n          <div class = \"user-info\">\n            <h4>Junior Front-end Developer</h4>\n            <p class = \"user-text\">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt\xBB</p>\n            <p class = \"user-social\">\n              <a href=\"\" class=\"link-social\"><span></span></a>\n              <a href=\"\" class=\"link-social\"><span></span></a>\n              <a href=\"\" class=\"link-social\"><span></span></a>\n              <a href=\"\" class=\"link-social\"><span></span></a>\n              <a href=\"\" class=\"link-social\"><span></span></a>\n            </p>\n          </div>\n        </div>\n      </section>\n      <section class=\"user-content\">\n        <h3>Katsiaryna Makarenka</h3>\n        <div class=\"user-card\">\n          <div class = \"user-foto\"></div>\n          <div class = \"user-info\">\n            <h4>Junior Front-end Developer</h4>\n            <p class = \"user-text\">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt\xBB</p>\n            <p class = \"user-social\">\n              <a href=\"\" class=\"link-social\"><span></span></a>\n              <a href=\"\" class=\"link-social\"><span></span></a>\n              <a href=\"\" class=\"link-social\"><span></span></a>\n              <a href=\"\" class=\"link-social\"><span></span></a>\n              <a href=\"\" class=\"link-social\"><span></span></a>\n            </p>\n          </div>\n        </div>\n      </section>\n      <section class=\"user-content\">\n        <h3>Kiryl Kireyeu</h3>\n        <div class=\"user-card\">\n          <div class = \"user-foto\"></div>\n          <div class = \"user-info\">\n            <h4>Junior Front-end Developer</h4>\n            <p class = \"user-text\">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt\xBB</p>\n            <p class = \"user-social\">\n              <a href=\"\" class=\"link-social\"><span></span></a>\n              <a href=\"\" class=\"link-social\"><span></span></a>\n              <a href=\"\" class=\"link-social\"><span></span></a>\n              <a href=\"\" class=\"link-social\"><span></span></a>\n              <a href=\"\" class=\"link-social\"><span></span></a>\n            </p>\n          </div>\n        </div>\n      </section>\n  </main>\n</div>\n");

/***/ }),

/***/ "./src/screens/aboutUS/aboutUs.css":
/*!*****************************************!*\
  !*** ./src/screens/aboutUS/aboutUs.css ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./src/screens/aboutUS/aboutUs.js":
/*!****************************************!*\
  !*** ./src/screens/aboutUS/aboutUs.js ***!
  \****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils */ "./src/utils.js");
/* harmony import */ var _about_template__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./about.template */ "./src/screens/aboutUS/about.template.js");
/* harmony import */ var _aboutUs_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./aboutUs.css */ "./src/screens/aboutUS/aboutUs.css");
/* harmony import */ var _aboutUs_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_aboutUs_css__WEBPACK_IMPORTED_MODULE_2__);



Object(_utils__WEBPACK_IMPORTED_MODULE_0__["$$"])('body').addEventListener('click', function (e) {
  var el = e.target;
  var elClass = el.getAttribute('class');

  if (elClass === 'aboutUs') {
    Object(_utils__WEBPACK_IMPORTED_MODULE_0__["addClass"])(Object(_utils__WEBPACK_IMPORTED_MODULE_0__["$$"])('.logo'), 'logo-anim-to-top');
    Object(_utils__WEBPACK_IMPORTED_MODULE_0__["sleep"])(200).then(function () {
      Object(_utils__WEBPACK_IMPORTED_MODULE_0__["$$"])('body').innerHTML = '';
      Object(_utils__WEBPACK_IMPORTED_MODULE_0__["inner"])(Object(_utils__WEBPACK_IMPORTED_MODULE_0__["$$"])('body'), _about_template__WEBPACK_IMPORTED_MODULE_1__["default"]);
    });
  }
});

/***/ }),

/***/ "./src/screens/list/list.css":
/*!***********************************!*\
  !*** ./src/screens/list/list.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./src/screens/list/list.js":
/*!**********************************!*\
  !*** ./src/screens/list/list.js ***!
  \**********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var bigpicture__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bigpicture */ "./node_modules/bigpicture/index.js");
/* harmony import */ var bigpicture__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bigpicture__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils */ "./src/utils.js");
/* harmony import */ var _list_template__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./list.template */ "./src/screens/list/list.template.js");
/* harmony import */ var _main_main_template__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../main/main.template */ "./src/screens/main/main.template.js");
/* harmony import */ var _list_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./list.css */ "./src/screens/list/list.css");
/* harmony import */ var _list_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_list_css__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _poets_poets__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../poets/poets */ "./src/screens/poets/poets.js");






Object(_utils__WEBPACK_IMPORTED_MODULE_1__["$$"])('body').addEventListener('click', function (e) {
  var el = e.target;
  var elClass = el.getAttribute('class');

  if (elClass === 'close') {
    Object(_utils__WEBPACK_IMPORTED_MODULE_1__["addClass"])(Object(_utils__WEBPACK_IMPORTED_MODULE_1__["$$"])('.logotype'), 'logo-anim-to-bottom');
    Object(_utils__WEBPACK_IMPORTED_MODULE_1__["sleep"])(200).then(function () {
      Object(_utils__WEBPACK_IMPORTED_MODULE_1__["$$"])('body').innerHTML = '';
      Object(_utils__WEBPACK_IMPORTED_MODULE_1__["inner"])(Object(_utils__WEBPACK_IMPORTED_MODULE_1__["$$"])('body'), _main_main_template__WEBPACK_IMPORTED_MODULE_3__["default"]);
    });
  }

  if (elClass === 'list-poets' || elClass === 'main-button left') {
    Object(_utils__WEBPACK_IMPORTED_MODULE_1__["addClass"])(Object(_utils__WEBPACK_IMPORTED_MODULE_1__["$$"])('.logo'), 'logo-anim-to-top');
    Object(_utils__WEBPACK_IMPORTED_MODULE_1__["sleep"])(200).then(function () {
      Object(_utils__WEBPACK_IMPORTED_MODULE_1__["$$"])('body').innerHTML = '';
      Object(_utils__WEBPACK_IMPORTED_MODULE_1__["inner"])(Object(_utils__WEBPACK_IMPORTED_MODULE_1__["$$"])('body'), _list_template__WEBPACK_IMPORTED_MODULE_2__["default"]);
      Object(_poets_poets__WEBPACK_IMPORTED_MODULE_5__["addPoetsLinks"])();
    });
  }

  if (elClass === 'youtube') {
    bigpicture__WEBPACK_IMPORTED_MODULE_0___default()({
      el: e.target,
      ytSrc: e.target.getAttribute('ytsrc')
    });
  }

  if (elClass === 'image_container_item') {
    bigpicture__WEBPACK_IMPORTED_MODULE_0___default()({
      el: e.target,
      gallery: '#image_container'
    });
  }
});

/***/ }),

/***/ "./src/screens/list/list.template.js":
/*!*******************************************!*\
  !*** ./src/screens/list/list.template.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n<div class=\"lists-container\">\n  <img src='./assets/logo/logo.png' class=\"logotype\"></div>\n  <main class = 'content'>\n  <a class = \"close\"> &#10006;</a>\n  <section class = 'list'>\n      <h3>\u0411</h3>\n      <ul class=\"first\">\n        <li><a href=\"#\" class=\"poets-name\" data-name=\"brovka\" >\u041F\u0435\u0442\u0440\u0443\u0441\u044C \u0411\u0440\u043E\u0432\u043A\u0430</a></li>\n      </ul>\n    </section>\n    <section class = 'list'>\n      <h3>\u0414</h3>\n      <ul class=\"first\">\n        <li><a href=\"#\" class=\"poets-name\" data-name=\"dunin\">\u0412\u0438\u043A\u0435\u043D\u0442\u0438\u0439 \u0414\u0443\u043D\u0438\u043D-\u041C\u0430\u0440\u0446\u0438\u043D\u043A\u0435\u0432\u0438\u0447</a></li>\n      </ul>\n    </section>\n    <section class = 'list'>\n      <h3>\u041A</h3>\n      <ul class=\"first\">\n        <li><a href=\"#\" class=\"poets-name\" data-name=\"korotkevich\">\u0412\u043B\u0430\u0434\u0438\u043C\u0438\u0440 \u041A\u043E\u0440\u043E\u0442\u043A\u0435\u0432\u0438\u0447</a></li>\n        <li><a href=\"#\" class=\"poets-name\" data-name=\"kolas\">\u042F\u043A\u0443\u0431 \u041A\u043E\u043B\u0430\u0441</a></li>\n        <li><a href=\"#\" class=\"poets-name\" data-name=\"kupala\">\u042F\u043D\u043A\u0430 \u041A\u0443\u043F\u0430\u043B\u0430</a></li>\n      </ul>\n    </section>\n    <section class = 'list'>\n    <h3>\u041B</h3>\n    <ul class=\"first\">\n      <li><a href=\"#\" class=\"poets-name\" data-name=\"luchina\">\u042F\u043D\u043A\u0430 \u041B\u0443\u0447\u0438\u043D\u0430</a></li>\n    </ul>\n    </section>\n    <section class = 'list'>\n      <h3>\u0422</h3>\n      <ul class=\"first\">\n        <li><a href=\"#\" class=\"poets-name\" data-name=\"tank\">\u041C\u0430\u043A\u0441\u0438\u043C \u0422\u0430\u043D\u043A</a></li>\n      </ul>\n    </section>\n  </main>\n</div>\n");

/***/ }),

/***/ "./src/screens/main/main.css":
/*!***********************************!*\
  !*** ./src/screens/main/main.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./src/screens/main/main.js":
/*!**********************************!*\
  !*** ./src/screens/main/main.js ***!
  \**********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils */ "./src/utils.js");
/* harmony import */ var _main_template__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./main.template */ "./src/screens/main/main.template.js");
/* harmony import */ var _main_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./main.css */ "./src/screens/main/main.css");
/* harmony import */ var _main_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_main_css__WEBPACK_IMPORTED_MODULE_2__);



var poetsSearch = [['Петрусь Бровка', 'brovka'], ['Викентий Дунин-Марцинкевич', 'dunin'], ['Владимир Короткевич', 'korotkevich'], ['Якуб Колас', 'kolas'], ['Янка Купала', 'kupala'], ['Янка Лучина', 'luchina'], ['Максим Танк', 'tank']];
Object(_utils__WEBPACK_IMPORTED_MODULE_0__["inner"])(Object(_utils__WEBPACK_IMPORTED_MODULE_0__["$$"])('body'), _main_template__WEBPACK_IMPORTED_MODULE_1__["default"]);

var repeat = function repeat() {
  Object(_utils__WEBPACK_IMPORTED_MODULE_0__["sleep"])(200).then(function () {
    Object(_utils__WEBPACK_IMPORTED_MODULE_0__["$$"])('.autocomplite ul').innerHTML = '';
    poetsSearch.forEach(function (element) {
      if (element[0].toUpperCase().includes(Object(_utils__WEBPACK_IMPORTED_MODULE_0__["$$"])('.search-string').value.toUpperCase())) {
        Object(_utils__WEBPACK_IMPORTED_MODULE_0__["inner"])(Object(_utils__WEBPACK_IMPORTED_MODULE_0__["$$"])('.autocomplite ul'), "<li><a data-name='".concat(element[1], "'>").concat(element[0], "</a></li>"));
      }
    });
  });
};

var checkingInterval = null;
document.addEventListener('click', function (event) {
  if (event.target === Object(_utils__WEBPACK_IMPORTED_MODULE_0__["$$"])('.search-string')) {
    Object(_utils__WEBPACK_IMPORTED_MODULE_0__["$$"])('.search-pic').style.opacity = '1';
    Object(_utils__WEBPACK_IMPORTED_MODULE_0__["$$"])('.search-pic').style.zIndex = '0';
    Object(_utils__WEBPACK_IMPORTED_MODULE_0__["sleep"])(800).then(function () {
      checkingInterval = setInterval(repeat, 100);
    });
  }
});
localStorage.setItem('currLang', 'eng');

Object(_utils__WEBPACK_IMPORTED_MODULE_0__["$$"])('.search-string').onblur = function () {
  Object(_utils__WEBPACK_IMPORTED_MODULE_0__["$$"])('.search-pic').style.zIndex = '-8';
  Object(_utils__WEBPACK_IMPORTED_MODULE_0__["$$"])('.search-pic').style.opacity = '0';
  Object(_utils__WEBPACK_IMPORTED_MODULE_0__["$$"])('.search-string').value = '';
  clearInterval(checkingInterval);
};

Object(_utils__WEBPACK_IMPORTED_MODULE_0__["$$"])('.active-lang').onclick = function () {
  Object(_utils__WEBPACK_IMPORTED_MODULE_0__["$$"])('.languages').style.display = 'block';
};

Object(_utils__WEBPACK_IMPORTED_MODULE_0__["$$"])('.eng').onclick = function (event) {
  var target = event.target;
  Object(_utils__WEBPACK_IMPORTED_MODULE_0__["remove"])(Object(_utils__WEBPACK_IMPORTED_MODULE_0__["$$"])('.languages'), Object(_utils__WEBPACK_IMPORTED_MODULE_0__["$$"])('.eng'));
  Object(_utils__WEBPACK_IMPORTED_MODULE_0__["$$"])('.languages').insertBefore(target, Object(_utils__WEBPACK_IMPORTED_MODULE_0__["$$"])('.languages img'));
  Object(_utils__WEBPACK_IMPORTED_MODULE_0__["$$"])('.active-lang').src = './assets/ENG.png';
  Object(_utils__WEBPACK_IMPORTED_MODULE_0__["$$"])('.languages').style.display = 'none';
  localStorage.setItem('currLang', 'eng');
};

Object(_utils__WEBPACK_IMPORTED_MODULE_0__["$$"])('.bel').onclick = function (event) {
  var target = event.target;
  Object(_utils__WEBPACK_IMPORTED_MODULE_0__["remove"])(Object(_utils__WEBPACK_IMPORTED_MODULE_0__["$$"])('.languages'), Object(_utils__WEBPACK_IMPORTED_MODULE_0__["$$"])('.bel'));
  Object(_utils__WEBPACK_IMPORTED_MODULE_0__["$$"])('.languages').insertBefore(target, Object(_utils__WEBPACK_IMPORTED_MODULE_0__["$$"])('.languages img'));
  Object(_utils__WEBPACK_IMPORTED_MODULE_0__["$$"])('.active-lang').src = './assets/BEL.png';
  Object(_utils__WEBPACK_IMPORTED_MODULE_0__["$$"])('.languages').style.display = 'none';
  localStorage.setItem('currLang', 'bel');
};

Object(_utils__WEBPACK_IMPORTED_MODULE_0__["$$"])('.rus').onclick = function (event) {
  var target = event.target;
  Object(_utils__WEBPACK_IMPORTED_MODULE_0__["remove"])(Object(_utils__WEBPACK_IMPORTED_MODULE_0__["$$"])('.languages'), Object(_utils__WEBPACK_IMPORTED_MODULE_0__["$$"])('.rus'));
  Object(_utils__WEBPACK_IMPORTED_MODULE_0__["$$"])('.languages').insertBefore(target, Object(_utils__WEBPACK_IMPORTED_MODULE_0__["$$"])('.languages img'));
  Object(_utils__WEBPACK_IMPORTED_MODULE_0__["$$"])('.active-lang').src = './assets/RUS.png';
  Object(_utils__WEBPACK_IMPORTED_MODULE_0__["$$"])('.languages').style.display = 'none';
  localStorage.setItem('currLang', 'rus');
};

Object(_utils__WEBPACK_IMPORTED_MODULE_0__["$$"])('.languages').onclick = function (event) {
  if (event.target.src !== Object(_utils__WEBPACK_IMPORTED_MODULE_0__["$$"])('.active-lang').src) {
    Object(_utils__WEBPACK_IMPORTED_MODULE_0__["remove"])(Object(_utils__WEBPACK_IMPORTED_MODULE_0__["$$"])('.languages'), event.target);
    Object(_utils__WEBPACK_IMPORTED_MODULE_0__["$$"])('.languages').insertBefore(event.target, Object(_utils__WEBPACK_IMPORTED_MODULE_0__["$$"])('.languages img'));
    Object(_utils__WEBPACK_IMPORTED_MODULE_0__["$$"])('.active-lang').src = event.target.src;
    Object(_utils__WEBPACK_IMPORTED_MODULE_0__["$$"])('.languages').style.display = 'none';
  } else Object(_utils__WEBPACK_IMPORTED_MODULE_0__["$$"])('.languages').style.display = 'none';
};

/***/ }),

/***/ "./src/screens/main/main.template.js":
/*!*******************************************!*\
  !*** ./src/screens/main/main.template.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n  <h1>Poets of Belarus</h1>\n  <section class=\"first-page\">\n  <img src=\"./assets/lang/ENG.png\" alt=\"Language\" class=\"active-lang\">\n      <div class=\"languages\">\n        <img src=\"./assets/lang/ENG.png\" alt=\"English language\" class=\"eng\">\n        <img src=\"./assets/lang/BEL.png\" alt=\"Belarussian language\" class=\"bel\">\n        <img src=\"./assets/lang/RUS.png\" alt=\"Russian language\" class=\"rus\">\n      </div>\n      <nav>\n          <a class='list-poets'>List of poets</a>\n          <a href=\"#about-us\">About Us</a>\n          <a href=\"#author-of-the-day\">Author of the Day</a>\n          <a class=\"aboutUs\">Contacts</a>\n        </nav>\n    <div class=\"container\">\n      <img src=\"./assets/logo/logo.png\" alt=\"Poets of Belarus\" class=\"logo\">\n      <div class=\"buttons-wrapper\">\n        <button class='main-button left'>List of poets</button>\n        <input type=\"text\" class='main-button search-string' placeholder=\"Search\">\n        <img src=\"./assets/search.png\" alt=\"search\" class=\"search-pic\">\n        <div class=\"autocomplite\">\n          <ul></ul>\n        </div>\n      </div>\n    </div>\n  </section>\n  <section class=\"second-page\">\n    <div class=\"container\">\n      <div class=\"backg-decor\"><img src=\"./assets/backgrounds/decor.png\"><img src=\"./assets/backgrounds/decor.png\"></div>\n      <div class=\"about-us\">\n        <h2 id=\"about-us\">About Us</h2>\n        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n          Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet,\n          consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,\n          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate\n          velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt\n          mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium.</p>\n      </div>\n      <div class=\"author-of-the-day\">\n        <h2 id=\"author-of-the-day\">Author of the Day</h2>\n        <img src=\"./assets/author-of-the-day.png\" alt=\"Jan Barszczewski\">\n        <blockquote>\xAB\u0427\u0430\u043B\u0430\u0432\u0435\u043A, \u044F\u043A\u0456 \u043D\u044F\u0437\u043C\u0435\u043D\u043D\u0430 \u0456\u0434\u0437\u0435 \u0434\u0430 \u043C\u044D\u0442\u044B, \u043D\u0435 \u0442\u043E\u043B\u044C\u043A\u0456 \u0437\u044F\u043C\u043B\u044E, \u0430\u043B\u0435 \u0456 \u0430\u0442\u043C\u0430\u0441\u0444\u0435\u0440\u0443 \u043C\u043E\u0436\u0430 \u0437\u043C\u044F\u043D\u0456\u0446\u044C\xBB</blockquote>\n        <cite><b>Jan Barzczewski</b><br> Nobleman Zawalnia, or Belarus in Fantastic Stories</cite>\n      </div>\n    </div>\n  </section>\n  <footer>\n    <div class=\"container\">\n      <hr>\n      <img src=\"./assets/footer/logo-rsschool-4.svg\" alt=\"the Rolling Scopes School\" class=\"RSS-logo\" height=\"87\">\n      <img src=\"./assets/footer/logo_rs_text.svg\" alt=\"the Rolling Scopes\" class=\"RS-logo\" height=\"87\">\n      <p>\n        <b>made by</b><br>\n        Nick Levkovich<br>\n        Katsiaryna Makarenka<br>\n        Kiryl Kireyeu<br><br>\n        Minsk, 2019\n      </p>\n    </div>\n  </footer>\n");

/***/ }),

/***/ "./src/screens/poets/poets.css":
/*!*************************************!*\
  !*** ./src/screens/poets/poets.css ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./src/screens/poets/poets.js":
/*!************************************!*\
  !*** ./src/screens/poets/poets.js ***!
  \************************************/
/*! exports provided: addPoetsLinks */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addPoetsLinks", function() { return addPoetsLinks; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils */ "./src/utils.js");
/* harmony import */ var _poets_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./poets.json */ "./src/screens/poets/poets.json");
var _poets_json__WEBPACK_IMPORTED_MODULE_1___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./poets.json */ "./src/screens/poets/poets.json", 1);
/* harmony import */ var _poets_template__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./poets.template */ "./src/screens/poets/poets.template.js");
/* harmony import */ var _main_main_template__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../main/main.template */ "./src/screens/main/main.template.js");
/* harmony import */ var _poets_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./poets.css */ "./src/screens/poets/poets.css");
/* harmony import */ var _poets_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_poets_css__WEBPACK_IMPORTED_MODULE_4__);





Object(_utils__WEBPACK_IMPORTED_MODULE_0__["$$"])('body').addEventListener('click', function (e) {
  var el = e.target;
  var elClass = el.getAttribute('class');

  if (elClass === 'home') {
    Object(_utils__WEBPACK_IMPORTED_MODULE_0__["$$"])('body').innerHTML = '';
    Object(_utils__WEBPACK_IMPORTED_MODULE_0__["inner"])(Object(_utils__WEBPACK_IMPORTED_MODULE_0__["$$"])('body'), _main_main_template__WEBPACK_IMPORTED_MODULE_3__["default"]);
  }
});

function showPoet(name) {
  Object(_utils__WEBPACK_IMPORTED_MODULE_0__["$$"])('body').innerHTML = Object(_poets_template__WEBPACK_IMPORTED_MODULE_2__["getTemplate"])(name);
}

function addPoetsLinks() {
  Object(_utils__WEBPACK_IMPORTED_MODULE_0__["$$"])('.content').addEventListener('click', function (e) {
    showPoet(e.target.dataset.name);
  });
}

/***/ }),

/***/ "./src/screens/poets/poets.json":
/*!**************************************!*\
  !*** ./src/screens/poets/poets.json ***!
  \**************************************/
/*! exports provided: kolas, kupala, korotkevich, brovka, dunin, luchina, tank, default */
/***/ (function(module) {

module.exports = {"kolas":{"menu":{"rus":["Главная","Биография","Галерея","Творчество","Видео"],"eng":["Home","Biography","Gallery","Works","Video "],"bel":["Гaлоуная","Бiяграфiя","Галерэя","Творчасць","Вiдэа"]},"photo":["kolas.jpg"],"name":{"rus":"Якуб Колос","eng":"Yakub Kolas","bel":"Якуб Колас"},"quote":{"rus":"У человека нет ничего лучше и дороже чем родина. Человек без родины - бедный человек","eng":"A person has nothing better and more precious than a homeland. A man without a homeland is a poor man","bel":"Няма ў чалавека нічога прыгажэй і даражэй за радзіму. Чалавек без радзімы ‒ бедны чалавек"},"biography":{"firstData":"1882-1906","firstText":{"rus":"Родился 22 октября 1882 года в деревне Акинчицы в семье лесника Михася Мицкевича. Окончил народную школу, в 1902 году — Несвижскую учительскую семинарию. Работал учителем на Пинщине (1902—1906).","eng":"He was born on October 22, 1882 in the village of Akinchitsy in the family of forester Mikhas Mitskevich. He graduated from the public school, in 1902 - Nesvizh teacher's seminary. He worked as a teacher in Pinchine (1902-1906).","bel":"Нарадзіўся 22 кастрычніка 1882 года ў вёсцы Акінчыцы ў сям'і лесніка Міхася Міцкевіча. Скончыў народную школу, у 1902 году - Нясвіжскую настаўніцкую семінарыю. Працаваў настаўнікам на Піншчыне (1902-1906)."},"secondData":"1906-1914","secondText":{"rus":"В 1906 году первая публикация — стихотворение «Край родимый» в белорусской газете «Наша доля». За участие в организации нелегального учительского съезда был приговорён к заключению, которое отбывал в минской тюрьме (1908—1911). В 1912—1914 годах учительствовал в Пинске, здесь у него родился его старший сын Даниил, который впоследствии стал создателем и первым директором музея своего отца","eng":"In 1906, the first publication was the poem “The Land of the Motherland” in the Belarusian newspaper Our Share. For participation in organizing an illegal teacher's congress, he was sentenced to imprisonment, who was serving time in a Minsk prison (1908–1911). In 1912–1914, a teacher in Pinsk, here he was born his eldest son, Daniel, who later became the founder and first director of his father’s museum","bel":"У 1906 году першая публікацыя - верш «Край родны» у беларускай газеце «Наша доля». За ўдзел у арганізацыі нелегальнага настаўніцкага з'езда быў асуджаны да зняволення, якое адбываў у менскай турме (1908-1911). У 1912-1914 гадах настаўнічаў у Пінску, тут у яго нарадзіўся яго старэйшы сын Данііл, які пасля стаў стваральнікам і першым дырэктарам музея свайго бацькі"},"thirdData":"1915-1918","thirdText":{"rus":"В 1915 году эвакуировался вместе с семьёй в Подмосковье, работал учителем в Дмитровском уезде. В этом же году мобилизован в армию. Окончил Александровское военное училище (Москва, 1916) и служил в запасном полку в Перми. В это время его семья переехала в Обоянь (Курская губерния). В звании подпоручика летом 1917 года был отправлен на Румынский фронт. После демобилизации (1918) работал учителем в городе Обоянь","eng":"In 1915 he was evacuated with his family in the Moscow region, worked as a teacher in the Dmitrov district. In the same year, mobilized into the army. He graduated from the Alexander Military School (Moscow, 1916) and served in the reserve regiment in Perm. At this time, his family moved to Oboyan (Kursk Province). In the rank of second lieutenant in the summer of 1917 he was sent to the Romanian front. After demobilization (1918) he worked as a teacher in the city of Oboyan","bel":"У 1915 г. эвакуіраваўся разам з сям'ёй у Падмаскоўі, працаваў настаўнікам у Дзмітраўскім павеце. У гэтым жа годзе мабілізаваны ў войска. Скончыў Аляксандраўскае ваеннае вучылішча (Масква, 1916) і служыў у запасным палку ў Пермі. У гэты час яго сям'я пераехала ў Абаянь (Курская губерня). У званні падпаручніка ўлетку 1917 года быў адпраўлены на Румынскі фронт. Пасля дэмабілізацыі (1918) працаваў настаўнікам у горадзе Абаянь"},"fourthData":"1921-1944","fourthText":{"rus":"В мае 1921 года переехал в Минск. В дальнейшем занимался творческой и научной деятельностью. Академик (1928), с 1929 года — вице-президент Академии наук БССР, депутат ВС БССР (1938—1956). В годы Великой Отечественной войны в эвакуации в Подмосковье, Ташкенте, Москве.","eng":"In May 1921 he moved to Minsk. In the future, engaged in creative and scientific activities. Academician (1928), since 1929 - Vice-President of the Academy of Sciences of the BSSR, deputy of the Supreme Council of the BSSR (1938-1956). During the Great Patriotic War in the evacuation in the Moscow region, Tashkent, Moscow.","bel":"У траўні 1921 года пераехаў у Мінск. У далейшым займаўся творчай і навуковай дзейнасцю. Акадэмік (1928), з 1929 году - віцэ-прэзідэнт Акадэміі навук БССР, дэпутат ВС БССР (1938-1956). У гады Вялікай Айчыннай вайны ў эвакуацыі ў Падмаскоўі, Ташкенце, Маскве."},"fivethData":"1945-1956","fivethText":{"rus":"В 1944 году вернулся в Минск. Депутат ВС СССР (1946—1956), председатель Белорусского республиканского комитета защиты мира. Один из редакторов академического «Русско-белорусского словаря» (1953). В конце жизни много и часто болел, в частности, перенёс 26 воспалений легких. Якуб Колас скоропостижно скончался 13 августа 1956 года. Похоронен на Военном кладбище в Минске[3].","eng":"In 1944 he returned to Minsk. Deputy of the Supreme Soviet of the USSR (1946-1956), chairman of the Belarusian Republican Committee for the Protection of Peace. One of the editors of the academic Russian-Belarusian Dictionary (1953). At the end of his life, he suffered a lot and often, in particular, suffered 26 pneumonia. Yakub Kolas died suddenly on August 13, 1956. He was buried at the Military Cemetery in Minsk","bel":"У 1944 годзе вярнуўся ў Мінск. Дэпутат ВС СССР (1946-1956), старшыня Беларускага рэспубліканскага камітэта абароны міру. Адзін з рэдактараў акадэмічнага «Руска-беларускага слоўніка» (1953). У канцы жыцця шмат і часта хварэў, у прыватнасці, перанёс 26 запаленняў лёгкіх. Якуб Колас раптоўна памёр 13 жніўня 1956 году. Пахаваны на Вайсковых могілках у Мінску"}},"works":{"firstBlock":"<span>Зборнікі вершаў </span> Песьні жальбы (1910)<br> Водгульле (1922)<br> Нашы дні (1937)<br> Адпомсьцім (1942)<br> Голас зямлі (1943)<br>  Мой дом (1946)<br> Жыве між нас геній (1952)","secondBlock":"<span> Паэмы </span> «Прапаў чалавек» (1913)<br> «Новая зямля» (1923)<br> «Сымон-музыка» (1925)<br> «Суд у лесе» (1943)<br> «Адплата» (1946)<br> «Рыбакова хата» (1947)<br>","thirdBlock":"<span> Зборнікі апавяданьняў </span> Апаведаньня. (1912) <br> «Тоўстае палена» (1913)<br> «Нёманаў дар» (1913)<br> «Казкі жыцьця» (1921)<br> «У ціхай вадзе» (1925)<br> «Крок за крокам» (1925)<br> «На рубяжы» (1925)","fourthBlock":"<span> Аповесьці </span> «У палескай глушы» (1923) <br> «На прасторах жыцьця» (1926)<br> «У глыбі Палесься» (1927) <br> «Адшчапенец» (1932) <br> «Дрыгва» (1934)"},"images":["one.jpg","two.jpg","three.jpg","four.jpg","five.png","six.png","seven.jpg","eight.jpg","nine.jpg","ten.png"],"video":"FRfHUhw9KkI","map":"https://maps.google.com/maps?q=stolbcy&t=&z=9&ie=UTF8&iwloc=&output=embed"},"kupala":{"menu":{"rus":["Главная","Биография","Галерея","Творчество","Видео"],"eng":["Home","Biography","Gallery","Works","Video "],"bel":["Гaлоуная","Бiяграфiя","Галерэя","Творчасць","Вiдэа"]},"photo":["kupala.jpg"],"name":{"rus":"Янка Купала","eng":"Yanka Kupala","bel":"Янка Купала"},"quote":{"rus":"Не ищи ты счастья доли, на чужом, далеком поле","eng":"Do not look for you  happiness, in a strange, distant field","bel":"Не шукай ты шчасця, долі. На чужым, далёкім полі"},"biography":{"firstData":"1882-1902","firstText":{"rus":"Родился 25 июня 1882 года в деревне Вязынка в белорусской католической семье Доминика Онуфриевича Луцевича и Бенигны Ивановны Луцевич Родители были обедневшие белорусские шляхтичи, арендовавшие земли в помещичьих угодьях. Род Луцевичей известен с начала семнадцатого века. Там же познакомился с будущей женой - Владислав Станкевич. ","eng":"Born on June 25, 1882 in the village of Vyazinka in the Belarusian Catholic family of Dominik Onufrievich Lutsevich and Benigna Ivanovna Lutsevich. Parents were impoverished Belarusian gentry, to lease land in the landlords' land. Rhode Lutsevich known since the beginning of the seventeenth century. There he met his future wife - Vladislav Stankevich.","bel":"Нарадзіўся 25 чэрвеня 1882 года ў вёсцы Вязынка ў беларускай каталіцкай сям'і Дамініка Ануфрыевіча Луцэвіча і Бянігна Іванаўна Луцэвіч. Бацькі былі збяднелыя беларускія шляхцічы, арандавалі зямлі ў памешчыцкіх угоддзях. Род Луцэвічаў вядомы з пачатку семнаццатага стагоддзя."},"secondData":"1902-1909","secondText":{"rus":"После смерти отца в 1902 году работал домашним учителем, писарем в помещичьем имении. В 1898 году закончил народное училище в местечке Беларуч. В 1908—1909 годы жил в Вильне, где работал в редакции первой белорусской газеты «Наша Ніва».","eng":"After his father's death in 1902, he worked as a tutor, a clerk in the landed estates. In 1898 he graduated from public school in the town Belaruch. In 1908-1909 he lived in Vilna, where he worked in the editorial board of the first Belarusian newspaper Nasha Niva","bel":"У 1909-1913 гадах пачатковец паэт вучыўся ў Санкт-Пецярбургу на падрыхтоўчых агульнаадукацыйных курсах А.Черняева, затым ў 1915 году правучыўся ў Маскоўскім гарадскім народным універсітэце, які быў заснаваны на сродкі вядомага ў Расійскай імперыі золотопромышленника і мецэната Альфонса Лявонавіча Шаняўскага і яго жонкі ў 1908 год; універсітэт знаходзіўся ў Маскве і насіў імя мецэната."},"thirdData":"1909-1913","thirdText":{"rus":"В 1909—1913 годах начинающий поэт учился в Санкт-Петербурге на подготовительных общеобразовательных курсах А.Черняева, затем в 1915 году проучился в Московском городском народном университете, который был основан на средства известного в Российской империи золотопромышленника и мецената Альфонса Леоновича Шанявского и его жены в 1908 году; университет находился в Москве и носил имя мецената.","eng":"In 1909-1913, an aspiring poet, studied in St. Petersburg at the preparatory education courses A.Chernyaeva, then in 1915 he studied at the Moscow city representatives of the People's University, which was founded by the famous Russian Empire Gold Mining and patrons Leonovich Shanyavsky Alfonso and his wife 1908; University was in Moscow, and bore the name of patrons.","bel":"У 1909-1913 гадах пачатковец паэт вучыўся ў Санкт-Пецярбургу на падрыхтоўчых агульнаадукацыйных курсах А.Черняева, затым ў 1915 году правучыўся ў Маскоўскім гарадскім народным універсітэце, які быў заснаваны на сродкі вядомага ў Расійскай імперыі золотопромышленника і мецэната Альфонса Лявонавіча Шаняўскага і яго жонкі ў 1908 год; універсітэт знаходзіўся ў Маскве і насіў імя мецэната."},"fourthData":"1913-1916","fourthText":{"rus":"Янка Купала поступил в народный университет в сентябре, однако его намерениям продолжить учёбу помешала всеобщая мобилизация, объявленная в связи с наступлением Первой мировой войны. Уже в начале 1916 года поэта-студента призвали в армию и тот поступил в дорожно-строительный отряд, в составе которого работал вплоть до наступления событий Октябрьской революции.","eng":"Yanka Kupala entered the People's University in September, but his intention to continue his studies prevented the general mobilization declared in connection with the onset of the First World War. At the beginning of 1916, a student of the poet called in the army and he entered the road construction team, which worked until the occurrence of the events of the October Revolution.","bel":"Янка Купала паступіў у народны ўніверсітэт у верасні, аднак яго намерам працягнуць вучобу перашкодзіла ўсеагульная мабілізацыя, аб'яўленая ў сувязі з надыходам Першай сусветнай вайны. Ужо ў пачатку 1916 года паэта-студэнта прызвалі ў армію і той паступіў у дарожна-будаўнічы атрад, у складзе якога працаваў аж да наступлення падзей Кастрычніцкай рэвалюцыі."},"fivethData":"1945-1956","fivethText":{"rus":"В 1919 году он переезжает в Минск. 1930 году Янка Купала предпринял попытку самоубийства, однако жена спасла его от гибели. 28 июня 1942 года, за несколько дней до своего 60-летия, поэт трагически погиб в Москве","eng":"In 1919 he moved to Minsk. 1930 Yanka Kupala attempted suicide, but his wife had saved him from death. June 28, 1942, a few days before his 60th birthday, the poet died tragically in Moscow","bel":"У 1919 годзе ён пераязджае ў Менск. 1930 год Янка Купала зрабіў спробу самагубства, аднак жонка выратаваў яго ад пагібелі. 28 чэрвеня 1942 г., за некалькі дзён да свайго 60-годдзя, паэт трагічна загінуў у Маскве"}},"works":{"firstBlock":"<span> Сборники стихов </span> «Жалейка» (1908)<br> «Гусляр» (1910); <br> «Дорогой жизни» (1913)<br> «Наследие» (1922)<br> «Безымянное» (1925)<br> «Отцветание» (1930)<br> «Песня строительству»","secondBlock":"<span>  Поэмы </span> «Зимой» (1907)<br> «Никому» (1907)<br> «Калека» (1907)<br> «Расплата любовью» (1907)<br> «В Пилиповку» (1908)<br> «За что?» (1908)<br> «Извечная песня» (1908)<br> «Курган» (1910)","thirdBlock":"<span> Пьесы  </span> «Павлинка» (1912)<br> «Примаки» (1913)<br> «Раскиданное гнездо» (1913)<br> «Здешние» (1922)","fourthBlock":"<span> Сказки для детей  </span> «Задачкі»<br> «Песня і казка»<br> «Бай»<br> «Вяртаюцца з выраю жоравы, гусі...»<br> «Сын і маці»<br> «А зязюлька кукавала...»<br> «Мароз»<br> «Кароль» "},"images":["one.jpg","two.jpg","three.jpg","four.jpg","five.jpg","six.jpg","seven.jpg","eight.jpg","nine.jpg","ten.jpg"],"video":"9FZehV2qJTk","map":"https://maps.google.com/maps?q=Vyazanka&t=&z=13&ie=UTF8&iwloc=&output=embed"},"korotkevich":{"menu":{"rus":["Главная","Биография","Галерея","Творчество","Видео"],"eng":["Home","Biography","Gallery","Works","Video "],"bel":["Гaлоуная","Бiяграфiя","Галерэя","Творчасць","Вiдэа"]},"photo":["korotkevich.jpg"],"name":{"rus":"Владимир Короткевич","eng":"Vladimir Korotkevich","bel":"Уладзiмир Карткевiч"},"quote":{"rus":"Проиграть не унижение. Унижение - смеяться над тем, кто мужественно проиграл.","eng":"Losіng is not  humiliation. Humiliation - to laugh at those who bravely lost.","bel":"Прайграць не прыніжэнне. Прыніжэнне — кпіць з таго, хто мужна прайграў"},"biography":{"firstData":"1930-1949","firstText":{"rus":"Родился Владимир 26 ноября 1930 года в городе Орше  в семье интеллигентов. Владимир с самого раннего детства интересовался историей, особенно историей Белоруссии. Кроме учёбы ходил в музыкальную школу. В 1944 году вернулся в Оршу, где получил среднее образование","eng":"Vladimir was born November 26, 1930 in the city of Orsha family of intellectuals. Vladimir from early childhood was interested in history, especially the history of Belarus. Besides studying I went to music school. In 1944 he returned to Orsha, where he received his secondary education","bel":"Нарадзіўся Уладзімір 26 лістапада 1930 года ў горадзе Орша ў сям'і інтэлігентаў. Уладзімір з самага ранняга дзяцінства цікавіўся гісторыяй, асабліва гісторыяй Беларусі. Акрамя вучобы хадзіў у музычную школу. У 1944 годзе вярнуўся ў Оршу, дзе атрымаў сярэднюю адукацыю"},"secondData":"1949-1954","secondText":{"rus":"В 1949—1954 годах учился на русском отделении филологического факультета КГУ имени Т. Г. Шевченко. Затем в нём же закончил аспирантуру. Летом 1950 года, после первого курса филфака, в Орше им был написан первый вариант повести «Дикая охота короля Стаха»[18]. Один из однокурсников и друзей Короткевича, говорил, что Владимир был душой компании.","eng":"In 1949-1954 he studied at the Russian department of the philological department of the Taras Shevchenko KSU. Then he graduated from graduate school there. In the summer of 1950, after the first course of philology, in Orsha, he wrote the first version of the story “The Wild Hunt of King Stach” [18]. One of the classmates and friends of Korotkevich, said that Vladimir was the soul of the company.","bel":"У 1949-1954 гадах вучыўся на рускім аддзяленні філалагічнага факультэта КГУ імя Т. Г. Шаўчэнка. Затым у ім жа скончыў аспірантуру. Улетку 1950 года, пасля першага курса філфака, у Оршы ім быў напісаны першы варыянт аповесці «Дзікае паляванне караля Стаха» [18]. Адзін з аднакурснікаў і сяброў Караткевіча, казаў, што Уладзімір быў душой кампаніі."},"thirdData":"1955-1958","thirdText":{"rus":"Весной 1955 года он сдал экзамены кандидатского минимума и приступил к написанию диссертации про восстание 1863 года, но так её и не закончил. В то же время пришла и идея о написании романа на эту же тему. В 1954—1958 годах работал школьным учителем русского языка и литературы","eng":"In the spring of 1955, he passed the candidate minimum examinations and began writing a dissertation about the uprising of 1863, but did not finish it. At the same time, the idea of writing a novel on the same subject came. In 1954-1958 he worked as a school teacher of Russian language and literature.","bel":"Увесну 1955 гады ён здаў экзамены кандыдацкага мінімуму і прыступіў да напісання дысертацыі пра паўстанне 1863 года, але так яе і не скончыў. У той жа час прыйшла і ідэя аб напісанні рамана на гэтую ж тэму. У 1954-1958 гадах працаваў школьным настаўнікам рускай мовы і літаратуры."},"fourthData":"1958-1962","fourthText":{"rus":"Окончил Высшие литературные (1958 — 1960 год) (во время которых увлёкся кино и начал работу над сценариями) и сценарные курсы (1962 год) в Институте кинематографии  в Москве, которая, как и Киев, оказала серьёзное влияние на формирование Короткевича как личности и художника слова.","eng":"He graduated from the Higher Literary (1958 - 1960) (during which he became interested in cinema and began working on scripts) and script courses (1962) at the Institute of Cinematography in Moscow, which, like Kiev, had a serious influence on the formation of Korotkevich as an individual and artist the words.","bel":"Скончыў Вышэйшыя літаратурныя (1958 - 1960 год) (падчас якіх захапіўся кіно і пачаў працу над сцэнарамі) і сцэнарныя курсы (1962 год) у Інстытуце кінематаграфіі ў Маскве, якая, як і Кіеў, аказала сур'ёзны ўплыў на фарміраванне Караткевіча як асобы і мастака слова."},"fivethData":"1962-1984","fivethText":{"rus":"Владимир Короткевич писал об истории своего народа, его искусстве, культуре, духовной жизни. Он выступал в защиту белорусского языка и культуры, памятников архитектуры и природы.","eng":"Vladimir Karatkevich wrote about the history of his people, his art, culture, spiritual life. He spoke in defense of the Belarusian language and culture, monuments of architecture and nature.","bel":"Уладзімір Караткевіч пісаў пра гісторыю свайго народа, яго мастацтве, культуры, духоўнага жыцця. Ён выступаў у абарону беларускай мовы і культуры, помнікаў архітэктуры і прыроды."}},"works":{"firstBlock":"<span> Романы </span> Колосья под серпом твоим (1964)<br> Христос приземлился в Гродно(1966)<br> Черный замок ольшанский (1979)<br> Леониды не вернутся к Земле(1960)","secondBlock":"<span> Повести </span> «Дикая охота короля Стаха» (1958)<br> «Седая легенда» (1960)<br> «Цыганский король» (1958)<br> «Оружие» (1964)<br> «Листья каштанов» (1973)","thirdBlock":"<span> Сборники поэзии </span> Матчына душа» (1958)<br>  «Вячэрнія ветразі»<br>  «Мая Іліяда» (1969)<br> «Быў. Ёсць. Буду.» (1986) ","fourthBlock":"<span> Сборники повестей и рассказов </span> «Блакіт і золата дня» (1961)<br> «Чазенія» (1966)<br> «Вока тайфуна» (1974)<br> «З вякоў мінулых» (1978)"},"images":["one.jpg","two.jpg","three.jpg","four.jpg","five.jpg","six.jpg","seven.jpg","eight.jpg","nine.jpg","ten.jpg"],"video":"9UIt_HLlbxs","map":"https://maps.google.com/maps?q=orsha&t=&z=13&ie=UTF8&iwloc=&output=embed"},"brovka":{"menu":{"rus":["Главная","Биография","Галерея","Творчество","Видео"],"eng":["Home","Biography","Gallery","Works","Video "],"bel":["Гaлоуная","Бiяграфiя","Галерэя","Творчасць","Вiдэа"]},"photo":["brovka.jpg"],"name":{"rus":"Петр Бровка","eng":"Petr Brovka","bel":"Пятрусь Броука"},"quote":{"rus":"Ну с чем, скажи, с какой любимой, могу я книжку сравнить?","eng":"Tell me if the book can compare with anything","bel":"Ну, з чым, скажы, з якой каханкай магу я кніжку параўнаць?"},"biography":{"firstData":"1905-1918","firstText":{"rus":"Родился 12 июня 1905 года в деревне Путилковичи в крестьянской семье (9 детей). Отец — Устин Адамович. Мать — Алёна Степановна. Окончил церковно-приходскую школу в Лепеле","eng":"Born on June 12, 1905 in the village of Putilkovichi in a peasant family (9 children). Father - Ustin Adamovich. Mother - Alyona Stepanovna. Graduated from parish school in Lepel","bel":"Нарадзіўся 12 чэрвеня 1905 года ў вёсцы Пуцілкавічы ў сялянскай сям'і (9 дзяцей). Бацька - Юстын Адамовіч. Маці - Алёна Сцяпанаўна. Скончыў царкоўна-прыхадскую школу ў Лепелі"},"secondData":"1918-1928","secondText":{"rus":"В 1918—1924 годах работал переписчиком, делопроизводителем и счетоводом. В 1925—1927 годах был завотделом Окружкома комсомола в Полоцке. В 1927—1928 годах — ответственным секретарём редакции газеты «Чырвоная Полаччына».","eng":"In 1918–24 he worked as a copyist, clerk and bookkeeper. In the years 1925-1927 was the head of the Okrug Komsomol department in Polotsk. In 1927-1928, he was the executive secretary of the editorial office of the newspaper Chyrvonay Polachchyna.","bel":"У 1918-1924 гадах працаваў перапісчыкам, справаводам і рахаўніком. У 1925-1927 гадах быў загадчык аддзела акруговыя камісіі камсамола ў Полацку. У 1927-1928 гадах - адказным сакратаром рэдакцыі газеты «Чырвоная Полаччына»."},"thirdData":"1928-1942","thirdText":{"rus":"Окончил педагогический факультет БГУ (1928—1931). С 1928 года — в литературном объединении «Маладняк», позже в Белорусской ассоциации пролетарских писателей (БелАПП). В 1941—1942 году служил в РККА, работал во фронтовой и партизанской печати. ","eng":"He graduated from the pedagogical faculty of BSU (1928–1931).Since 1928 - in the literary association Maladnyak, later in the Belarusian Association of Proletarian Writers (BelAPP). In 1941–1942, he served in the Red Army, worked in the front and partisan press.","bel":"Скончыў педагагічны факультэт БДУ (1928-1931). З 1928 года - у літаратурным аб'яднанні «Маладняк», пазней у Беларускай асацыяцыі пралетарскіх пісьменнікаў (БелАПП). У 1941-1942 годзе служыў у РККА, працаваў у франтавой і партызанскага друку. "},"fourthData":"1943-1967","fourthText":{"rus":"В 1943—1945 годах был ответственным секретарём СП БССР, в 1948—1967 годы — председателем Правления СП БССР. В 1945—1948 годы — главный редактор литературного журнала «Полымя».","eng":"In 1943-1945, he was the executive secretary of the JV BSSR, in 1948-1967 - the chairman of the BSSR JV. In 1945-1948 - the chief editor of the literary magazine Polymya.","bel":"У 1943-1945 гадах быў адказным сакратаром СП БССР, у 1948-1967 гады - старшынёй Праўлення СП БССР. У 1945-1948 гады - галоўны рэдактар літаратурнага часопіса «Полымя»."},"fivethData":"1967-1980","fivethText":{"rus":" В 1967—1980 годы — главный редактор Белорусской советской энциклопедии.  У. Бровка умер 24 марта 1980 года в Минске. Похоронен на Восточном кладбище. Сын — Юрий Петрович Бровка (1936), доктор юридических наук, профессор БГУ.","eng":"In 1967-1980 - the chief editor of the Belarusian Soviet Encyclopedia. U. Brovka died on March 24, 1980 in Minsk. He was buried in the Eastern Cemetery. Son - Yuri Petrovich Brovka (1936), Doctor of Law, Professor of BSU.","bel":"У 1967-1980 гады - галоўны рэдактар Беларускай савецкай энцыклапедыі. У. Броўка памёр 24 сакавіка 1980 года ў Мінску. Пахаваны на Усходніх могілках. Сын - Юрый Пятровіч Край (1936), доктар юрыдычных навук, прафесар БДУ."}},"works":{"firstBlock":"<span> Сборники поэзии </span> Гады як шторм»(1930)<br> «Прамова фактамі» (1930)<br> «Цэхавыя будні»  (1931)<br> «Паэзія» (1932)<br> «Так пачыналася маладосць»  (1934)","secondBlock":"<span> Сборники поэзии </span> «Прыход героя»  (1935)<br> «Вясна радзімы»  (1937)<br> «Кацярына : Паэма»  (1938)<br> «Вершы і паэмы»  (1940)<br> «Шляхамі баравымі» (1940)","thirdBlock":"<span> Сборники поэзии </span> «Насустрач сонцу» (1943)<br> «У роднай хаце»  (1946)<br> «Вершы і паэмы»  (1946)<br> «Сонечнымі днямі»  (1950)<br> «Цвёрдымі крокамі»  (1954)","fourthBlock":"<span> Сборники поэзии </span> «Пахне чабор»  (1959)<br> «Далёка ад дому»  (1960)<br> «Па сакрэту : сатыра і гумар»  (1961)<br> «А дні ідуць…»  (1961)"},"images":["one.jpg","two.jpg","three.jpg","four.jpg","five.jpg","six.jpg","seven.jpg","eight.jpg","nine.jpg","ten.jpg"],"video":"y7q6WXFqP2I","map":"https://maps.google.com/maps?q=Ushachi&t=&z=13&ie=UTF8&iwloc=&output=embed"},"dunin":{"menu":{"rus":["Главная","Биография","Галерея","Творчество","Видео"],"eng":["Home","Biography","Gallery","Works","Video "],"bel":["Гaлоуная","Бiяграфiя","Галерэя","Творчасць","Вiдэа"]},"photo":["dunin.jpg"],"name":{"rus":"Bинцент Дунин-Марцинкевич","eng":"Vincent Dunin-Martinkevich","bel":"Bинцэнт Дунiн-Марцiнкевiч"},"quote":{"rus":"Кажется что обычная девушка, но как посмотрит, так в самое серце","eng":"It seems like an ordinary girl, but as she looks, so in to very soul","bel":"Дзеўка, як дзеўка, а як гляне, ды і сэрца дастане"},"biography":{"firstData":"1808-1935","firstText":{"rus":"Pодился ВинцентДунин-Марцинкевич 4 февраля 1808 года в фольварке Панюшковичи  Минской губернии в шляхетской семье. После окончания Бобруйского поветового училища и Виленской базилианской бурсы поступил на медицинский факультет Петербургского университета, но вынужден был прервать учёбу по причине болезни.","eng":"Born Vincent Dunin-Marcinkiewicz, February 4, 1808 in the manor Panyushkovichi Minsk province in gentry family. After graduating from college and the Bobruisk povet Vilna Basilian seminary entered the medical faculty of St. Petersburg University, but was forced to interrupt his studies due to illness.","bel":"Нарадзіўся Вінцэнт Дунін-Марцінкевіч 4 лютага 1808 года ў фальварку Панюшковичи Мінскай губерні ў шляхецкай сям'і. Пасля заканчэння Бабруйскага павятовага вучылішча і Віленскай бызыліянскія бурсы паступіў на медыцынскі факультэт Пецярбургскага універсітэта, але вымушаны быў перапыніць вучобу з-за хваробы."},"secondData":"1835-1838","secondText":{"rus":"Позднее он служил чиновником в Минском криминальном суде, был переводчиком в Минской епархиальной консистории.В ноябре 1835 года по подозрению в подделке дворянских документов и королевских печатей был арестован и находился под домашним арестом. Вернулся на работу в духовную консисторию в феврале 1836 года.","eng":"He later served as an officer in the Criminal Court of Minsk, was translator in Minsk diocesan konsistorii.V November 1835 on suspicion of forgery documents noble and royal seals had been arrested and placed under house arrest. He returned to work in the spiritual consistory in February 1836.","bel":"Пазней ён служыў чыноўнік у Мінскім крымінальны судзе, быў перакладчык ў Мінскім епархіяльным кансысторыях лістапада 1835 года па падазрэнні ў падробцы дваранскія дакументаў і каралеўскія пячаткі былі арыштаваныя і знаходзіўся пад хатнім арыштам. Вярнуўся на працу ў духоўную кансысторыю ў лютым 1836 году."},"thirdData":"1838-1845","thirdText":{"rus":"В 1840 году оставил службу, приобрел фольварк Люцинка около Ивенца Воложинского района, который стал для него местом постоянного жительства до конца дней. Однако много времени проводил писатель в Минске, в среде демократической интеллигенции.","eng":"In 1840 he left the service, acquired a farm near Lyutsinka Ivenets Volozhin district, which became his permanent residence until the end of days. However, the writer spent much time in Minsk on Wednesday democratic intelligentsia.","bel":"У 1840 году пакінуў службу, набыў фальварак Люцынка каля Івянца Валожынскага раёна, які стаў для яго месцам пастаяннага жыхарства да канца дзён. Аднак шмат часу праводзіў пісьменнік у Мінску, у асяроддзі дэмакратычнай інтэлігенцыі."},"fourthData":"1845-1952","fourthText":{"rus":"Вместе с писательской деятельностью Дунин-Марцинкевич активно занимался и просветительской работой — организовывал белорусские школы, собирал фольклор, записывал разговорный язык. Особого внимания заслуживает театральная деятельность Винцента Дунина-Марцинкевича. Его стараниями был создан первый белорусский театральный коллектив. ","eng":"Along with writing activities Dunin-Marcinkiewicz has been active in raising and education - organized the Belarusian schools, collected folklore, recorded the spoken language. Particularly noteworthy theatrical activities of Vincent Dunin-Marcinkiewicz. Due to his efforts the first Russian theater company was created.","bel":"Разам з пісьменніцкай дзейнасцю Дунін-Марцінкевіч актыўна займаўся і асветніцкай працай - арганізоўваў беларускія школы, збіраў фальклор, запісваў гутарковы мову. Асаблівай увагі заслугоўвае тэатральная дзейнасць Вінцэнта Дуніна-Марцінкевіча. Яго стараннямі быў створаны першы беларускі тэатральны калектыў."},"fivethData":"1852-1884","fivethText":{"rus":"Первая постановка комической оперы «Селянка» (Идиллия) состоялась 9 февраля 1852 года, а на театральных подмостках открыто прозвучало белорусское слово. Эта дата возникновения белорусского сценического искусства. С марта 1862 и до 22 февраля 1864 года в Добровлянах прятался от преследования царской администрации. Умер в 1884 году.","eng":"The first production of the comic opera Selanca (Idyll) took place on February 9, 1852, and the Belarusian word was openly spoken on the stage. This is the date of the Belarusian scenic art. From March 1862 until February 22, 1864 in Dobrovlyany, he hid from persecution of the tsarist administration. He died in 1884.","bel":"Першая пастаноўка камічнай оперы «Сялянка» (Ідылія) 9 лютага адбылася 1852 года, а на тэатральных падмостках адкрыта прагучала беларускае слова. Гэтая дата ўзнікнення беларускага сцэнічнага мастацтва. З сакавіка 1862 і да 22 лютага 1864 года ў Добровлянах хаваўся ад пераследу царскай адміністрацыі. Памёр ў 1884 годзе года."}},"works":{"firstBlock":"<span> Поэмы </span>Гапон 1854<br> Вечарніцы 1855<br> Купала 1855<br> Шчароускія дажынкі 1857","secondBlock":"<span> Драматические произведения </span> «Kомедия-опера «Сялянка» 1846<br> водевиль «Пінская шляхта» 1866<br> комедия «Залеты» 1870","thirdBlock":"<span> Перевод поэмы </span> А. Мицкевича «Пан Тадеуш» 1859.","fourthBlock":"<span> Память </span> Имя В. Дунина-Марцинкевича носят Могилевский областной театр драмы и комедии (г. Бобруйск). В Минске, во Фрунзенском районе названа улица в честь Винцента Дунина-Марцинкевича. На доме № 2/2 установлена мемориальная доска."},"images":["one.jpg","two.jpg","three.jpg","four.jpg","five.jpg","six.jpg","seven.jpg","eight.jpg","nine.jpg","ten.jpg"],"video":"2Z9MOhnWXsM","map":"https://maps.google.com/maps?q=%D0%91%D0%BE%D0%B1%D1%80%D1%83%D0%B9%D1%81%D0%BA&t=&z=13&ie=UTF8&iwloc=&output=embed"},"luchina":{"menu":{"rus":["Главная","Биография","Галерея","Творчество","Видео"],"eng":["Home","Biography","Gallery","Works","Video "],"bel":["Гaлоуная","Бiяграфiя","Галерэя","Творчасць","Вiдэа"]},"photo":["luchina.jpg"],"name":{"rus":"Янка Лучина","eng":"Yanka Luchina","bel":"Янка Лучына"},"quote":{"rus":"С тобой расстаться мы никогда не хотим. И неприглядый дом с пажитками, I поле скупое, выгон без паши Мы, Любим и ценим - ведь они наши.","eng":"We never want to live you. And poor house and poor field, we love because they are ours.","bel":"I непрыглядную хату з пажыткамі, I поле скупое, выган без пашы Мы, апрануушыся старымі світкамі, Любім і цэнім — бо яны нашы"},"biography":{"firstData":"1851-1865","firstText":{"rus":"Родился в 1851 году в Минске. Происходил из шляхетского рода Лучивко-Неслуховских. Его отец, Луциан Юрьевич, был тогда столоначальником в Минской палате гражданского суда, где после, получивши чин коллежского асессора, стал секретарём.","eng":"Born in 1851 in Minsk. Descended from a noble family of Luchivko-Neslukhovskih. His father, Lucian Yuryevich, was then head clerk in the Minsk Chamber of the civil court, where after, having received the rank of collegiate assessor, he became secretary.","bel":"Нарадзіўся ў 1851 годзе ў Мінску. Паходзіў з шляхецкага роду Лучивко-Неслухоўскага. Яго бацька, Луциан Юр'евіч, быў тады столоначальником ў Мінскай палаце грамадзянскага суда, дзе пасля, атрымаўшы чын калежскага асэсара, стаў сакратаром."},"secondData":"1851-1865","secondText":{"rus":"Янка Лучина — один из основных псевдонимов Ивана (Яна) Неслуховского. Им он подписывал только белорусскоязычные произведения.  Псевдоним символизировал духовное единение творчества поэта с белорусским народом и его просветительскую роль. ","eng":"Yanka Luchina is one of the main pseudonyms of Ivan (Yana) Neslukhovsky. He signed only Belarusian-language works for them. The pseudonym symbolized the spiritual unity of the poet’s creative work with the Belarusian people and their educational role.","bel":"Янка Лучына - адзін з асноўных псеўданімаў Івана (Яна) Неслухоўскага. Ім ён падпісваў толькі беларускамоўныя творы. Псеўданім сімвалізаваў духоўнае яднанне творчасці паэта з беларускім народам і яго асветніцкую ролю."},"thirdData":"1865-1871","thirdText":{"rus":"В 14-летнем возрасте стал учащимся минской классической гимназии, которую закончил в 1870 году в ряде лучших учеников. После в 1870—1871 годах Иван Неслуховский учился на математическом факультете Санкт-Петербургского университета. Он успешно сдал вступительные экзамены. В 1871 он попросил разрешение на отдых и, не дожидаясь сессии, выехал в Минск.","eng":"At the age of 14 he became a student of the Minsk classical gymnasium, which he graduated in 1870 in a number of the best students. After 1870-1871, Ivan Neslukhovsky studied at the mathematics department of St. Petersburg University. He successfully passed the entrance exams. In 1871 he asked for permission to rest and, without waiting for the session, went to Minsk.","bel":"У 14-гадовым узросце стаў навучэнцам мінскай класічнай гімназіі, якую скончыў у 1870 г. у шэрагу лепшых вучняў. Пасля ў 1870-1871 гадах Іван Неслухоўскі вучыўся на матэматычным факультэце Санкт-Пецярбургскага універсітэта. Ён паспяхова здаў уступныя экзамены. У 1871 ён папрасіў дазвол на адпачынак і, не чакаючы сесіі, выехаў у Менск."},"fourthData":"1871-1877","fourthText":{"rus":"Неожиданно его выбор остановился на профессии инженера, и осенью 1871 года Иван Луцианович оформил отчисление из университета и поступил в Санкт-Петербургский государственный технологический институт, который окончил в 1877 году, после чего работал начальником главных железнодорожных мастерских в Тифлисе. На Кавказе, возможно познакомился с Максимом Горьким. ","eng":"Suddenly, his choice focused on the engineering profession, and in the fall of 1871 Ivan Lutsianovich issued a deduction from the university and entered the St. Petersburg State Institute of Technology, graduating in 1877, after which he worked as head of the main railway workshops in Tiflis. In the Caucasus, perhaps met with Maxim Gorky.","bel":"Нечакана яго выбар спыніўся на прафесіі інжынера, і ўвосень 1871 году Іван Луцианович аформіў адлічэнне з універсітэта і паступіў у Санкт-Пецярбургскі дзяржаўны тэхналагічны інстытут, які скончыў ў 1877 годзе, пасля чаго працаваў начальнікам галоўных чыгуначных майстэрняў у Тыфлісе. На Каўказе, магчыма пазнаёміўся з Максімам Горкім."},"fivethData":"1877-1897","fivethText":{"rus":"В конце 1870-х годов после неудачного падения его разбил паралич, после чего он получил возможность вернуться в Минск, где начал работу в техническом бюро Либаво-Роменской железной дороги. Посещал театры и даже ходил на охоту, что давало повод слухам о том, что он симулировал болезнь.Умер Иван Неслуховский в 1897 году, похоронен на Кальварийском кладбище Минска рядом с женой.","eng":"In the late 1870s, after an unsuccessful fall, he was paralyzed, after which he was given the opportunity to return to Minsk, where he began work in the technical bureau of the Libauvo-Romenskaya railway. I visited theaters and even went hunting, which gave rise to rumors that he pretended to be sick. Ivan Neslukhovsky died in 1897, was buried in the Kalvariysky cemetery of Minsk near his wife.","bel":"У канцы 1870-х гадоў пасля няўдалага падзення яго разбіў параліч, пасля чаго ён атрымаў магчымасць вярнуцца ў Менск, дзе пачаў працу ў тэхнічным бюро Лібава-Роменскай чыгункі. Наведваў тэатры і нават хадзіў на паляванне, што давала падставу чутках пра тое, што ён сімуляваў болезнь.Умер Іван Неслухоўскі ў 1897 годзе, пахаваны на Кальварыйскіх могілках Мінска побач з жонкай."}},"works":{"firstBlock":"<span> Вершы </span> Браце мой і таварыш!<br> Серэнада<br> I як строй дамоў сталічных бачу<br> Пэўна ў сэрцы ёсць хвароба<br> Не ради славы иль расчета","secondBlock":"<span> Нарысы </span> Старасць не радасць<br>З крывавых дзён<br>Кушалеў i яго лiберальныя погляды<br>Са святочнай паездкi","thirdBlock":"<span> Лiсты </span> Да П. В. Шэйна<br> Да З. Пшасмыцкага <br>Да М. В. Доўнар-Запольскага","fourthBlock":"<span> Наследованнi </span> Адам Аснык <br> Не я пяю - народ божы... <br> Надта салодкiя думкi<br> Бусел <br> Ямшчык<br>Горсць "},"images":["one.jpg","two.jpg","three.jpg","four.jpg","five.jpg","six.jpg","seven.jpg","eight.jpg","nine.jpg","ten.jpg"],"video":"tgfp3k9hYzQ","map":"https://maps.google.com/maps?q=minsk&t=&z=13&ie=UTF8&iwloc=&output=embed"},"tank":{"menu":{"rus":["Главная","Биография","Галерея","Творчество","Видео"],"eng":["Home","Biography","Gallery","Works","Video "],"bel":["Гaлоуная","Бiяграфiя","Галерэя","Творчасць","Вiдэа"]},"photo":["tank.jpg"],"name":{"rus":"Максим Танк","eng":"Maksim Tank","bel":"Максiм Танк"},"quote":{"rus":"Однажды я спросил у человека, Который прошёл через огонь, Воду и медные трубы: — Что самое сложное на этом свете?И он сказал: — Пройти через верность.","eng":"Once I asked a man who passed through fire, Water and copper pipes: “What is the most difficult thing in this world? And he said:“ Go through loyalty.","bel":"Аднойчы я спытаў у чалавека, Які прайшоў праз агонь, Ваду і медныя трубы: - Што самае складанае на гэтым свеце? І ён сказаў: - Прайсці праз вернасць."},"biography":{"firstData":"1912-1934","firstText":{"rus":"Родился Евгений 17 сентября 1912 года в селе Пильковщина Белоруссии. Затем участвовал в революции в Западной Белоруссии. В биографии Максима Танка всегда активно выражалась гражданская позиция. За это он был арестован в 1933, а также в 1934 годах.","eng":"Yevgeny was born on September 17, 1912 in the village of Pilkovschina in Belarus. Then he participated in the revolution in Western Belarus. In the biography of Maxim Tank, civil position was always actively expressed. For this, he was arrested in 1933, as well as in 1934.","bel":"Нарадзіўся Яўген 17 верасня 1912 года ў вёсцы Пильковщина Беларусі. Затым удзельнічаў у рэвалюцыі ў Заходняй Беларусі. У біяграфіі Максіма Танка заўсёды актыўна выказвалася грамадзянская пазіцыя. За гэта ён быў арыштаваны ў 1933, а таксама ў 1934 гадах."},"secondData":"1934-1943","secondText":{"rus":"Первый опубликованный сборник стихотворений в биографии М. Танка вышел в 1936 году – «На этапах». За ним последовал сборник «Клюквенный цвет» в 1937, затем «Под мачтой» в 1938. Во всех этих книгах поэт поддерживал борьбу народа за освобождение родной земли.","eng":"The first published collection of poems in the biography of M. Tank was published in 1936 - “At the stages”. It was followed by the collection “Cranberry Blossom” in 1937, then “Under the Mast” in 1938. In all these books, the poet supported the people's struggle for the liberation of their native land.","bel":"Першы апублікаваны зборнік вершаў у біяграфіі М. Танка выйшаў у 1936 годзе - На этапах. За ім рушыў услед зборнік «Журавінавы цвет» ў 1937, затым «Пад мачтай» у 1938. Ва ўсіх гэтых кнігах паэт падтрымліваў барацьбу народа за вызваленне роднай зямлі."},"thirdData":"1943-1945","thirdText":{"rus":"Танк был корреспондентом в газете «Вилейская правда», а в годы Великой Отечественной войны работал в печати. Даже в военные времена в биографии Танка писательская деятельность не была оставлена. В 1942 году он написал поэму «Янук Сялиба», а в 1945 создал два сборника стихотворений. ","eng":"Tank was a correspondent in the newspaper Vileyskaya Pravda, and during the years of the Great Patriotic War, he worked in print. Even in wartime in the biography of Tanka, writing was not abandoned. In 1942, he wrote the poem “Yanuka Sialib”, and in 1945 he created two collections of poems.","bel":"Танк быў карэспандэнтам у газеце «Вілейская праўда», а ў гады Вялікай Айчыннай вайны працаваў у друку. Нават у ваенныя часы ў біяграфіі Танка пісьменніцкая дзейнасць не была пакінута. У 1942 годзе ён напісаў паэму «Янук Сялиба», а ў 1945 стварыў два зборнікі вершаў."},"fourthData":"1945-1966","fourthText":{"rus":"Когда закончилась война, Танк стал работать в журнале «Вожык» редактором, а позже – главным редактором (с 1948 по 1966) в журнале «Полымя».За полную биографию Танка было создано множество книг, поэм, сборников","eng":"When the war ended, Tank began to work in the magazine “Vozhik” as an editor, and later - as an editor-in-chief (from 1948 to 1966) in the magazine “Polymya.” For the full biography of Tank, many books, poems,","bel":"Калі скончылася вайна, Танк стаў працаваць у часопісе «Вожык» рэдактарам, а пазней - галоўным рэдактарам (з 1948 па 1966) у часопісе Полымя .За поўную біяграфію Танка было створана мноства кніг, паэм, зборнікаў."},"fivethData":"1966-1995","fivethText":{"rus":"В 1948 году получил Сталинскую премию, в 1978 – Ленинскую, а в 1968 – звание Народного поэта Белоруссии. Максим Танк умер в Минске 7 августа 1995 года. Похоронен в родном селе","eng":"In 1948 he was awarded the Stalin Prize in 1978 - Lenin, d 1968 - the title of People's Poet of Belarus. Maxim Tank died in Minsk on August 7, 1995. Buried in his native village","bel":"У 1948 г. атрымаў Сталінскую прэмію, у 1978 - Ленінскую, а ў 1968 - званне Народнага паэта Беларусі. Максім Танк памёр у Менску 7 жніўня 1995 года. Пахаваны ў роднай вёсцы."}},"works":{"firstBlock":"<span> Книги поэзии </span>  «На этапах»<br> «Журавінавы цвет»<br> «Пад мачтай»<br> «Выбраныя вершы» (1940)<br> «Вастрыце зброю» (1945)","secondBlock":"<span> Книги поэзии </span> «Праз вогненны небасхіл» (1945) <br> «Выбраныя вершы»<br> «Вершы»<br> «Каб ведалі» (1948)","thirdBlock":"<span>  Книги поэзии </span>  «На камні, жалезе і золаце»<br> «Выбраныя творы» (1954)<br> «У дарозе» (1954)<br> «След бліскавіцы» (1957)<br>","fourthBlock":"<span> Книги поэзии </span> «Лірыка» (1963)<br> «Глыток вады» (1964)<br> «Вершы» (1967)<br> «Ключ жураўліны» (1972)<br> «Хай будзе святло» (1972)"},"images":["one.jpg","two.jpg","three.jpg","four.jpg","five.jpg","six.jpg","seven.jpg","eight.jpg","nine.jpg","ten.jpg"],"video":"40Uhtifsk7s","map":"https://maps.google.com/maps?q=%D0%BC%D1%8F%D0%B4%D0%B5%D0%BB%D1%8C&t=&z=13&ie=UTF8&iwloc=&output=embed"}};

/***/ }),

/***/ "./src/screens/poets/poets.template.js":
/*!*********************************************!*\
  !*** ./src/screens/poets/poets.template.js ***!
  \*********************************************/
/*! exports provided: getTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTemplate", function() { return getTemplate; });
/* harmony import */ var _poets_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./poets.json */ "./src/screens/poets/poets.json");
var _poets_json__WEBPACK_IMPORTED_MODULE_0___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./poets.json */ "./src/screens/poets/poets.json", 1);

var getTemplate = function getTemplate(poet) {
  var lang = localStorage.getItem('currLang') || 'rus';
  return "<nav class=\"header__menu-container\">\n  <ul class=\"header__menu\">\n    <li> <a class=\"home\"> ".concat(_poets_json__WEBPACK_IMPORTED_MODULE_0__[poet].menu[lang][0], "  </a> </li>\n    <li> <a href=\"#biography\"> ").concat(_poets_json__WEBPACK_IMPORTED_MODULE_0__[poet].menu[lang][1], "  </a> </li>\n    <li> <a href=\"#gallery\"> ").concat(_poets_json__WEBPACK_IMPORTED_MODULE_0__[poet].menu[lang][2], "</a> </li>\n    <li> <a href=\"#works\"> ").concat(_poets_json__WEBPACK_IMPORTED_MODULE_0__[poet].menu[lang][3], "</a> </li>\n    <li> <a href=\"#video\"> ").concat(_poets_json__WEBPACK_IMPORTED_MODULE_0__[poet].menu[lang][4], "</a> </li>\n  </ul>\n</nav>\n\n<header class=\"header__poet\">\n  <div class=\"header__poet-inform\">\n  <div class=\"header__photo\">\n  <img src=\"assets/").concat(poet, "/").concat(_poets_json__WEBPACK_IMPORTED_MODULE_0__[poet].photo[0], "\">\n  </div>\n  <span class=\"header__poet-name\">").concat(_poets_json__WEBPACK_IMPORTED_MODULE_0__[poet].name[lang], "</span>\n  <span class=\"header__poet-quote\">\n    \"").concat(_poets_json__WEBPACK_IMPORTED_MODULE_0__[poet].quote[lang], "\"\n  </span>\n  </div>\n</header>\n\n<main>\n  <section class=\"main__timeline\"> <a name=\"biography\"></a>\n  <div class=main__timeline-container>\n      <div class=\"main__timeline-block\">\n          <div class=\"timeline-block-year\">").concat(_poets_json__WEBPACK_IMPORTED_MODULE_0__[poet].biography.firstData, "</div>\n          <div class=\"timeline-block-text\">\n          ").concat(_poets_json__WEBPACK_IMPORTED_MODULE_0__[poet].biography.firstText[lang], "\n          </div>\n          <div class=\"timeline-block-emblem\">\n              <img src=\"assets/emblem_village.png\"> </img>\n          </div>\n      </div>\n      <div class=\"main__timeline-block\">\n          <div class=\"timeline-block-year\">").concat(_poets_json__WEBPACK_IMPORTED_MODULE_0__[poet].biography.secondData, "</div>\n          <div class=\"timeline-block-text\">\n          ").concat(_poets_json__WEBPACK_IMPORTED_MODULE_0__[poet].biography.secondText[lang], "\n          </div>\n          <div class=\"timeline-block-emblem\">\n              <img src=\"assets/emblem_education.png\"> </img>\n          </div>\n      </div>\n      <div class=\"main__timeline-block\">\n          <div class=\"timeline-block-year\">").concat(_poets_json__WEBPACK_IMPORTED_MODULE_0__[poet].biography.thirdData, "</div>\n          <div class=\"timeline-block-text\">\n          ").concat(_poets_json__WEBPACK_IMPORTED_MODULE_0__[poet].biography.thirdText[lang], "\n          </div>\n          <div class=\"timeline-block-emblem three\">\n              <img src=\"assets/emblem_work.png\"> </img>\n          </div>\n      </div>\n      <div class=\"main__timeline-block\">\n          <div class=\"timeline-block-year\">").concat(_poets_json__WEBPACK_IMPORTED_MODULE_0__[poet].biography.fourthData, "</div>\n          <div class=\"timeline-block-text\">\n          ").concat(_poets_json__WEBPACK_IMPORTED_MODULE_0__[poet].biography.fourthText[lang], "\n          </div>\n          <div class=\"timeline-block-emblem\">\n              <img src=\"assets/emblem_awards.png\"> </img>\n          </div>\n      </div>\n      <div class=\"main__timeline-block\">\n          <div class=\"timeline-block-year\">").concat(_poets_json__WEBPACK_IMPORTED_MODULE_0__[poet].biography.fivethData, "</div>\n          <div class=\"timeline-block-text\">\n          ").concat(_poets_json__WEBPACK_IMPORTED_MODULE_0__[poet].biography.fivethText[lang], "\n              </div>\n          <div class=\"timeline-block-emblem\">\n              <img src=\"assets/emblem_family.png\"> </img>\n          </div>\n      </div>\n  </div>\n  </section>\n\n  <a name=\"gallery\"></a>\n  <section id=\"image_container\" class=\"image_container\">\n    <img src=\"assets/").concat(poet, "/").concat(_poets_json__WEBPACK_IMPORTED_MODULE_0__[poet].images[0], "\" data-bp=\"assets/").concat(poet, "/").concat(_poets_json__WEBPACK_IMPORTED_MODULE_0__[poet].images[0], "\" class=\"image_container_item\">\n\n    <img src=\"assets/").concat(poet, "/").concat(_poets_json__WEBPACK_IMPORTED_MODULE_0__[poet].images[1], "\" data-bp=\"assets/").concat(poet, "/").concat(_poets_json__WEBPACK_IMPORTED_MODULE_0__[poet].images[1], "\" class=\"image_container_item\">\n\n  <img src=\"assets/").concat(poet, "/").concat(_poets_json__WEBPACK_IMPORTED_MODULE_0__[poet].images[2], "\" data-bp=\"assets/").concat(poet, "/").concat(_poets_json__WEBPACK_IMPORTED_MODULE_0__[poet].images[2], "\" class=\"image_container_item\">\n\n  <img src=\"assets/").concat(poet, "/").concat(_poets_json__WEBPACK_IMPORTED_MODULE_0__[poet].images[3], "\" data-bp=\"assets/").concat(poet, "/").concat(_poets_json__WEBPACK_IMPORTED_MODULE_0__[poet].images[3], "\" class=\"image_container_item\">\n\n  <img src=\"assets/").concat(poet, "/").concat(_poets_json__WEBPACK_IMPORTED_MODULE_0__[poet].images[4], "\" data-bp=\"assets/").concat(poet, "/").concat(_poets_json__WEBPACK_IMPORTED_MODULE_0__[poet].images[4], "\" class=\"image_container_item\">\n\n  <img src=\"assets/").concat(poet, "/").concat(_poets_json__WEBPACK_IMPORTED_MODULE_0__[poet].images[5], "\" data-bp=\"assets/").concat(poet, "/").concat(_poets_json__WEBPACK_IMPORTED_MODULE_0__[poet].images[5], "\" class=\"image_container_item\">\n\n  <img src=\"assets/").concat(poet, "/").concat(_poets_json__WEBPACK_IMPORTED_MODULE_0__[poet].images[6], "\" data-bp=\"assets/").concat(poet, "/").concat(_poets_json__WEBPACK_IMPORTED_MODULE_0__[poet].images[6], "\" class=\"image_container_item\">\n\n  <img src=\"assets/").concat(poet, "/").concat(_poets_json__WEBPACK_IMPORTED_MODULE_0__[poet].images[7], "\" data-bp=\"assets/").concat(poet, "/").concat(_poets_json__WEBPACK_IMPORTED_MODULE_0__[poet].images[7], "\" class=\"image_container_item\">\n\n  <img src=\"assets/").concat(poet, "/").concat(_poets_json__WEBPACK_IMPORTED_MODULE_0__[poet].images[8], "\" data-bp=\"assets/").concat(poet, "/").concat(_poets_json__WEBPACK_IMPORTED_MODULE_0__[poet].images[8], "\" class=\"image_container_item\">\n\n  <img src=\"assets/").concat(poet, "/").concat(_poets_json__WEBPACK_IMPORTED_MODULE_0__[poet].images[9], "\" data-bp=\"assets/").concat(poet, "/").concat(_poets_json__WEBPACK_IMPORTED_MODULE_0__[poet].images[9], "\" class=\"image_container_item\">\n\n  </section>\n\n  <section class=\"main__books\">\n    <a name=\"works\"></a>\n    <div>\n    ").concat(_poets_json__WEBPACK_IMPORTED_MODULE_0__[poet].works.firstBlock, "\n    </div>\n\n    <div>\n    ").concat(_poets_json__WEBPACK_IMPORTED_MODULE_0__[poet].works.secondBlock, "\n    </div>\n\n    <div>\n    ").concat(_poets_json__WEBPACK_IMPORTED_MODULE_0__[poet].works.thirdBlock, "\n    </div>\n\n    <div>\n    ").concat(_poets_json__WEBPACK_IMPORTED_MODULE_0__[poet].works.fourthBlock, "\n    </div>\n    </section>\n\n  <section class=\"main__video\">\n  <a name=\"video\"></a>\n    <img class=\"youtube\" src=\"assets/video.png\" ytsrc=\"").concat(_poets_json__WEBPACK_IMPORTED_MODULE_0__[poet].video, "\">\n\n  </section>\n\n  <section class=\"main__map\">\n  <div class=\"mapouter\">\n      <div class=\"gmap_canvas\">\n          <iframe height=\"500\" id=\"gmap_canvas\" src=\" ").concat(_poets_json__WEBPACK_IMPORTED_MODULE_0__[poet].map, "\"></iframe>\n      </div>\n  </div>\n  </section>\n\n  <div class=\"modal\">\n  </div>\n\n</main>");
};

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! exports provided: $$, addAttr, addClass, append, create, getByClass, inner, remove, setId, sleep */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "$$", function() { return $$; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addAttr", function() { return addAttr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addClass", function() { return addClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "append", function() { return append; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getByClass", function() { return getByClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "inner", function() { return inner; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "remove", function() { return remove; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setId", function() { return setId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sleep", function() { return sleep; });
var $$ = function $$(el) {
  return document.querySelector(el);
};
var addAttr = function addAttr(el, attrs) {
  for (var name in attrs) {
    el.setAttribute(name, attrs[name]);
  }
};
var addClass = function addClass(el, className) {
  return el.classList.add(className), el;
};
var append = function append(parent, child) {
  return parent.appendChild(child), parent;
};
var create = function create(el) {
  return document.createElement(el);
};
var getByClass = function getByClass(el) {
  return document.getElementsByClassName(el);
};
var inner = function inner(el, text) {
  return el.innerHTML += text, el;
};
var remove = function remove(parent, child) {
  return parent.removeChild(child), parent;
};
var setId = function setId(el, newId) {
  return el.id = newId, el;
};
var sleep = function sleep(milliseconds) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, milliseconds);
  });
};

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JpZ3BpY3R1cmUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JlZW5zL2Fib3V0VVMvYWJvdXQudGVtcGxhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmVlbnMvYWJvdXRVUy9hYm91dFVzLmNzcz81NjNkIiwid2VicGFjazovLy8uL3NyYy9zY3JlZW5zL2Fib3V0VVMvYWJvdXRVcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyZWVucy9saXN0L2xpc3QuY3NzP2Q2MzciLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmVlbnMvbGlzdC9saXN0LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JlZW5zL2xpc3QvbGlzdC50ZW1wbGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyZWVucy9tYWluL21haW4uY3NzPzM5MTMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmVlbnMvbWFpbi9tYWluLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JlZW5zL21haW4vbWFpbi50ZW1wbGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyZWVucy9wb2V0cy9wb2V0cy5jc3M/ZjVjNyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyZWVucy9wb2V0cy9wb2V0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyZWVucy9wb2V0cy9wb2V0cy50ZW1wbGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMuanMiXSwibmFtZXMiOlsiZ2xvYmFsIiwid2luZG93IiwiZWwiLCJpbml0aWFsaXplZCIsImNvbnRhaW5lciIsImRpc3BsYXlFbGVtZW50IiwiZGlzcGxheUltYWdlIiwiZGlzcGxheVZpZGVvIiwiZGlzcGxheUF1ZGlvIiwiaWZyYW1lQ29udGFpbmVyIiwiaWZyYW1lU2l0ZVZpZCIsImltZ1NyYyIsImNsb3NlQnV0dG9uIiwic2l0ZVZpZElEIiwiaXNMb2FkaW5nIiwiY2hlY2tNZWRpYVRpbWVvdXQiLCJsb2FkaW5nSWNvbiIsImNhcHRpb24iLCJjYXB0aW9uVGV4dCIsImNhcHRpb25Db250ZW50IiwiY2FwdGlvbkhpZGVCdXR0b24iLCJpc09wZW4iLCJnYWxsZXJ5T3BlbiIsImlzQ2xvc2luZyIsImltZ0NhY2hlIiwicmVtb3RlSW1hZ2UiLCJhbmltYXRpb25TdGFydCIsImFuaW1hdGlvbkVuZCIsInJpZ2h0QXJyb3dCdG4iLCJsZWZ0QXJyb3dCdG4iLCJnYWxsZXJ5UG9zaXRpb24iLCJnYWxsZXJ5RWxzIiwiZ2FsbGVyeUNvdW50ZXIiLCJwcmVsb2FkZWRJbWFnZXMiLCJzdXBwb3J0c1RvdWNoIiwib3B0cyIsImRvYyIsImRvY3VtZW50IiwiYXBwZW5kRWwiLCJjcmVhdGVFbCIsInJlbW92ZUVsIiwiaHRtbElubmVyIiwicG9pbnRlckV2ZW50c0F1dG8iLCJjSGVpZ2h0IiwiY1dpZHRoIiwibGlzdGVuRm9yIiwidGltZW91dCIsInNldFRpbWVvdXQiLCJjbGVhclRpbWVvdXQiLCJtb2R1bGUiLCJleHBvcnRzIiwib3B0aW9ucyIsImluaXRpYWxpemUiLCJyZW1vdmVDb250YWluZXIiLCJ5dFNyYyIsInZpbWVvU3JjIiwiZ2V0QXR0cmlidXRlIiwiZ2FsbGVyeSIsIm1ha2VHYWxsZXJ5IiwiaWZyYW1lU3JjIiwidG9nZ2xlTG9hZGluZ0ljb24iLCJjcmVhdGVJZnJhbWUiLCJpbmRleE9mIiwic3JjIiwiYXVkaW8iLCJjaGVja01lZGlhIiwidmlkU3JjIiwibWFrZVZpZFNyYyIsInRhZ05hbWUiLCJnZXRDb21wdXRlZFN0eWxlIiwiYmFja2dyb3VuZEltYWdlIiwicmVwbGFjZSIsImJvZHkiLCJzdGFydFgiLCJjcmVhdGVDbG9zZUJ1dHRvbiIsImNsYXNzTmFtZSIsImNyZWF0ZUFycm93U3ltYm9sIiwiZGlyZWN0aW9uIiwic3R5bGUiLCJjaGFuZ2VDU1MiLCJvbmNsaWNrIiwiZSIsInN0b3BQcm9wYWdhdGlvbiIsInVwZGF0ZUdhbGxlcnkiLCJoZWFkIiwiaWQiLCJjbG9zZSIsIm9udG91Y2hzdGFydCIsImNoYW5nZWRUb3VjaGVzIiwicGFnZVgiLCJvbnRvdWNobW92ZSIsInByZXZlbnREZWZhdWx0Iiwib250b3VjaGVuZCIsInRvdWNob2JqIiwiZGlzdFgiLCJzZXRBdHRyaWJ1dGUiLCJjb250cm9scyIsImxvb3AiLCJ0b2dnbGVDYXB0aW9uIiwiYmluZCIsImFsbG93RnVsbHNjcmVlbiIsIm9ubG9hZCIsIm9wZW4iLCJvbmVycm9yIiwia2V5Iiwia2V5Q29kZSIsInVzZWRLZXlzIiwiY29udGFpbnMiLCJ0YXJnZXQiLCJmb2N1cyIsImdldFJlY3QiLCJyZWN0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwibGVmdE9mZnNldCIsImxlZnQiLCJ3aWR0aCIsImNlbnRlclRvcCIsInRvcCIsImhlaWdodCIsInNjYWxlV2lkdGgiLCJzY2FsZUhlaWdodCIsInNvdXJjZSIsIkFycmF5IiwiaXNBcnJheSIsImNsb25lTm9kZSIsImZvckVhY2giLCJ0eXBlIiwibWF0Y2giLCJzbGljZSIsImNhbGwiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZWxJbmRleCIsIm1hcCIsImxlbmd0aCIsIm1vdmVtZW50IiwiZ2FsbGVyeUxlbmd0aCIsImlzRW5kIiwiTWF0aCIsIm1heCIsIm1pbiIsInBvc2l0aW9uIiwiaW1nIiwiYWRkVG9JbWdDYWNoZSIsImNvbXBsZXRlIiwiY2hhbmdlR2FsbGVyeUltYWdlIiwiZXJyb3IiLCJhY3RpdmVFbCIsImFsZXJ0Iiwib2xkaW1nIiwicXVlcnlTZWxlY3RvciIsInVybCIsInByZWZpeCIsInN1ZmZpeCIsImVyck1zZyIsInJlYWR5U3RhdGUiLCJwbGF5IiwiYm9vbCIsIm5vTG9hZGVyIiwib2Zmc2V0VG9wIiwib2Zmc2V0TGVmdCIsInBhcmVudEVsZW1lbnQiLCJwdXNoIiwiZXJyIiwib25FcnJvciIsImNsaWNrRWxzIiwiYmx1ciIsImNzc1RleHQiLCJyZW1vdmVBdHRyaWJ1dGUiLCJpbWFnZXMiLCJpIiwib25DbG9zZSIsImVsZW1lbnQiLCJuZXdTdHlsZSIsIiQkIiwiYWRkRXZlbnRMaXN0ZW5lciIsImVsQ2xhc3MiLCJhZGRDbGFzcyIsInNsZWVwIiwidGhlbiIsImlubmVySFRNTCIsImlubmVyIiwidGVtcGxhdGUiLCJ0ZW1wbGF0ZU1haW4iLCJhZGRQb2V0c0xpbmtzIiwiQmlnUGljdHVyZSIsInBvZXRzU2VhcmNoIiwicmVwZWF0IiwidG9VcHBlckNhc2UiLCJpbmNsdWRlcyIsInZhbHVlIiwiY2hlY2tpbmdJbnRlcnZhbCIsImV2ZW50Iiwib3BhY2l0eSIsInpJbmRleCIsInNldEludGVydmFsIiwibG9jYWxTdG9yYWdlIiwic2V0SXRlbSIsIm9uYmx1ciIsImNsZWFySW50ZXJ2YWwiLCJkaXNwbGF5IiwicmVtb3ZlIiwiaW5zZXJ0QmVmb3JlIiwic2hvd1BvZXQiLCJuYW1lIiwiZ2V0VGVtcGxhdGUiLCJkYXRhc2V0IiwicG9ldCIsImxhbmciLCJnZXRJdGVtIiwicG9ldHMiLCJtZW51IiwicGhvdG8iLCJxdW90ZSIsImJpb2dyYXBoeSIsImZpcnN0RGF0YSIsImZpcnN0VGV4dCIsInNlY29uZERhdGEiLCJzZWNvbmRUZXh0IiwidGhpcmREYXRhIiwidGhpcmRUZXh0IiwiZm91cnRoRGF0YSIsImZvdXJ0aFRleHQiLCJmaXZldGhEYXRhIiwiZml2ZXRoVGV4dCIsIndvcmtzIiwiZmlyc3RCbG9jayIsInNlY29uZEJsb2NrIiwidGhpcmRCbG9jayIsImZvdXJ0aEJsb2NrIiwidmlkZW8iLCJhZGRBdHRyIiwiYXR0cnMiLCJjbGFzc0xpc3QiLCJhZGQiLCJhcHBlbmQiLCJwYXJlbnQiLCJjaGlsZCIsImFwcGVuZENoaWxkIiwiY3JlYXRlIiwiY3JlYXRlRWxlbWVudCIsImdldEJ5Q2xhc3MiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwidGV4dCIsInJlbW92ZUNoaWxkIiwic2V0SWQiLCJuZXdJZCIsIm1pbGxpc2Vjb25kcyIsIlByb21pc2UiLCJyZXNvbHZlIl0sIm1hcHBpbmdzIjoiO0FBQUE7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c291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIvLyBCaWdQaWN0dXJlLmpzIHwgbGljZW5zZSBNSVQgfCBoZW5yeWdkLm1lL2JpZ3BpY3R1cmVcbihmdW5jdGlvbigpIHtcblx0dmFyIC8vIGFzc2lnbiB3aW5kb3cgb2JqZWN0IHRvIHZhcmlhYmxlXG5cdFx0Z2xvYmFsID0gd2luZG93LFxuXHRcdC8vIHRyaWdnZXIgZWxlbWVudCB1c2VkIHRvIG9wZW4gcG9wdXBcblx0XHRlbCxcblx0XHQvLyBzZXQgdG8gdHJ1ZSBhZnRlciBmaXJzdCBpbnRlcmFjdGlvblxuXHRcdGluaXRpYWxpemVkLFxuXHRcdC8vIGNvbnRhaW5lciBlbGVtZW50IGhvbGRpbmcgaHRtbCBuZWVkZWQgZm9yIHNjcmlwdFxuXHRcdGNvbnRhaW5lcixcblx0XHQvLyBjdXJyZW50bHkgYWN0aXZlIGRpc3BsYXkgZWxlbWVudCAoaW1hZ2UsIHZpZGVvLCB5b3V0dWJlIC8gdmltZW8gaWZyYW1lIGNvbnRhaW5lcilcblx0XHRkaXNwbGF5RWxlbWVudCxcblx0XHQvLyBwb3B1cCBpbWFnZSBlbGVtZW50XG5cdFx0ZGlzcGxheUltYWdlLFxuXHRcdC8vIHBvcHVwIHZpZGVvIGVsZW1lbnRcblx0XHRkaXNwbGF5VmlkZW8sXG5cdFx0Ly8gcG9wdXAgYXVkaW8gZWxlbWVudFxuXHRcdGRpc3BsYXlBdWRpbyxcblx0XHQvLyBjb250YWluZXIgZWxlbWVudCB0byBob2xkIHlvdXR1YmUgLyB2aW1lbyBpZnJhbWVcblx0XHRpZnJhbWVDb250YWluZXIsXG5cdFx0Ly8gaWZyYW1lIHRvIGhvbGQgeW91dHViZSAvIHZpbWVvIHBsYXllclxuXHRcdGlmcmFtZVNpdGVWaWQsXG5cdFx0Ly8gc3RvcmUgcmVxdWVzdGVkIGltYWdlIHNvdXJjZVxuXHRcdGltZ1NyYyxcblx0XHQvLyBidXR0b24gdGhhdCBjbG9zZXMgdGhlIGNvbnRhaW5lclxuXHRcdGNsb3NlQnV0dG9uLFxuXHRcdC8vIHlvdXR1YmUgLyB2aW1lbyB2aWRlbyBpZFxuXHRcdHNpdGVWaWRJRCxcblx0XHQvLyBrZWVwcyB0cmFjayBvZiBsb2FkaW5nIGljb24gZGlzcGxheSBzdGF0ZVxuXHRcdGlzTG9hZGluZyxcblx0XHQvLyB0aW1lb3V0IHRvIGNoZWNrIHZpZGVvIHN0YXR1cyB3aGlsZSBsb2FkaW5nXG5cdFx0Y2hlY2tNZWRpYVRpbWVvdXQsXG5cdFx0Ly8gbG9hZGluZyBpY29uIGVsZW1lbnRcblx0XHRsb2FkaW5nSWNvbixcblx0XHQvLyBjYXB0aW9uIGVsZW1lbnRcblx0XHRjYXB0aW9uLFxuXHRcdC8vIGNhcHRpb24gY29udGVudCBlbGVtZW50XG5cdFx0Y2FwdGlvblRleHQsXG5cdFx0Ly8gc3RvcmUgY2FwdGlvbiBjb250ZW50XG5cdFx0Y2FwdGlvbkNvbnRlbnQsXG5cdFx0Ly8gaGlkZSBjYXB0aW9uIGJ1dHRvbiBlbGVtZW50XG5cdFx0Y2FwdGlvbkhpZGVCdXR0b24sXG5cdFx0Ly8gb3BlbiBzdGF0ZSBmb3IgY29udGFpbmVyIGVsZW1lbnRcblx0XHRpc09wZW4sXG5cdFx0Ly8gZ2FsbGVyeSBvcGVuIHN0YXRlXG5cdFx0Z2FsbGVyeU9wZW4sXG5cdFx0Ly8gdXNlZCBkdXJpbmcgY2xvc2UgYW5pbWF0aW9uIHRvIGF2b2lkIHRyaWdnZXJpbmcgdGltZW91dCB0d2ljZVxuXHRcdGlzQ2xvc2luZyxcblx0XHQvLyBhcnJheSBvZiBwcmV2IHZpZXdlZCBpbWFnZSB1cmxzIHRvIGNoZWNrIGlmIGNhY2hlZCBiZWZvcmUgc2hvd2luZyBsb2FkaW5nIGljb25cblx0XHRpbWdDYWNoZSA9IFtdLFxuXHRcdC8vIHN0b3JlIHdoZXRoZXIgaW1hZ2UgcmVxdWVzdGVkIGlzIHJlbW90ZSBvciBsb2NhbFxuXHRcdHJlbW90ZUltYWdlLFxuXHRcdC8vIHN0b3JlIGFuaW1hdGlvbiBvcGVuaW5nIGNhbGxiYWNrc1xuXHRcdGFuaW1hdGlvblN0YXJ0LFxuXHRcdGFuaW1hdGlvbkVuZCxcblx0XHQvLyBnYWxsZXJ5IGxlZnQgLyByaWdodCBpY29uc1xuXHRcdHJpZ2h0QXJyb3dCdG4sXG5cdFx0bGVmdEFycm93QnRuLFxuXHRcdC8vIHBvc2l0aW9uIG9mIGdhbGxlcnlcblx0XHRnYWxsZXJ5UG9zaXRpb24sXG5cdFx0Ly8gaG9sZCBhY3RpdmUgZ2FsbGVyeSBlbHMgLyBpbWFnZSBzcmNcblx0XHRnYWxsZXJ5RWxzLFxuXHRcdC8vIGNvdW50ZXIgZWxlbWVudFxuXHRcdGdhbGxlcnlDb3VudGVyLFxuXHRcdC8vIHN0b3JlIGltYWdlcyBpbiBnYWxsZXJ5IHRoYXQgYXJlIGJlaW5nIGxvYWRlZFxuXHRcdHByZWxvYWRlZEltYWdlcyA9IHt9LFxuXHRcdC8vIHdoZXRoZXIgZGV2aWNlIHN1cHBvcnRzIHRvdWNoIGV2ZW50c1xuXHRcdHN1cHBvcnRzVG91Y2gsXG5cdFx0Ly8gb3B0aW9ucyBvYmplY3Rcblx0XHRvcHRzLFxuXHRcdC8vIFNhdmUgYnl0ZXMgaW4gdGhlIG1pbmlmaWVkIHZlcnNpb25cblx0XHRkb2MgPSBkb2N1bWVudCxcblx0XHRhcHBlbmRFbCA9ICdhcHBlbmRDaGlsZCcsXG5cdFx0Y3JlYXRlRWwgPSAnY3JlYXRlRWxlbWVudCcsXG5cdFx0cmVtb3ZlRWwgPSAncmVtb3ZlQ2hpbGQnLFxuXHRcdGh0bWxJbm5lciA9ICdpbm5lckhUTUwnLFxuXHRcdHBvaW50ZXJFdmVudHNBdXRvID0gJ3BvaW50ZXItZXZlbnRzOmF1dG8nLFxuXHRcdGNIZWlnaHQgPSAnY2xpZW50SGVpZ2h0Jyxcblx0XHRjV2lkdGggPSAnY2xpZW50V2lkdGgnLFxuXHRcdGxpc3RlbkZvciA9ICdhZGRFdmVudExpc3RlbmVyJyxcblx0XHR0aW1lb3V0ID0gZ2xvYmFsLnNldFRpbWVvdXQsXG5cdFx0Y2xlYXJUaW1lb3V0ID0gZ2xvYmFsLmNsZWFyVGltZW91dFxuXG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob3B0aW9ucykge1xuXHRcdC8vIGluaXRpYWxpemUgY2FsbGVkIG9uIGluaXRpYWwgb3BlbiB0byBjcmVhdGUgZWxlbWVudHMgLyBzdHlsZSAvIGV2ZW50IGhhbmRsZXJzXG5cdFx0aW5pdGlhbGl6ZWQgfHwgaW5pdGlhbGl6ZSgpXG5cblx0XHQvLyBjbGVhciBjdXJyZW50bHkgbG9hZGluZyBzdHVmZlxuXHRcdGlmIChpc0xvYWRpbmcpIHtcblx0XHRcdGNsZWFyVGltZW91dChjaGVja01lZGlhVGltZW91dClcblx0XHRcdHJlbW92ZUNvbnRhaW5lcigpXG5cdFx0fVxuXG5cdFx0b3B0cyA9IG9wdGlvbnNcblxuXHRcdC8vIHN0b3JlIHZpZGVvIGlkIGlmIHlvdXR1YmUgLyB2aW1lbyB2aWRlbyBpcyByZXF1ZXN0ZWRcblx0XHRzaXRlVmlkSUQgPSBvcHRpb25zLnl0U3JjIHx8IG9wdGlvbnMudmltZW9TcmNcblxuXHRcdC8vIHN0b3JlIG9wdGlvbmFsIGNhbGxiYWNrc1xuXHRcdGFuaW1hdGlvblN0YXJ0ID0gb3B0aW9ucy5hbmltYXRpb25TdGFydFxuXHRcdGFuaW1hdGlvbkVuZCA9IG9wdGlvbnMuYW5pbWF0aW9uRW5kXG5cdFx0XG5cdFx0Ly8gc2V0IHRyaWdnZXIgZWxlbWVudFxuXHRcdGVsID0gb3B0aW9ucy5lbFxuXG5cdFx0Ly8gd2lwZSBleGlzdGluZyByZW1vdGVJbWFnZSBzdGF0ZVxuXHRcdHJlbW90ZUltYWdlID0gZmFsc2VcblxuXHRcdC8vIHNldCBjYXB0aW9uIGlmIHByb3ZpZGVkXG5cdFx0Y2FwdGlvbkNvbnRlbnQgPSBlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY2FwdGlvbicpXG5cblx0XHRpZiAob3B0aW9ucy5nYWxsZXJ5KSB7XG5cdFx0XHRtYWtlR2FsbGVyeShvcHRpb25zLmdhbGxlcnkpXG5cdFx0fSBlbHNlIGlmIChzaXRlVmlkSUQgfHwgb3B0aW9ucy5pZnJhbWVTcmMpIHtcblx0XHRcdC8vIGlmIHZpbWVvLCB5b3V0dWJlLCBvciBpZnJhbWUgdmlkZW9cblx0XHRcdHRvZ2dsZUxvYWRpbmdJY29uKHRydWUpXG5cdFx0XHRkaXNwbGF5RWxlbWVudCA9IGlmcmFtZUNvbnRhaW5lclxuXHRcdFx0Y3JlYXRlSWZyYW1lKCk7XG5cdFx0fSBlbHNlIGlmIChvcHRpb25zLmltZ1NyYykge1xuXHRcdFx0Ly8gaWYgcmVtb3RlIGltYWdlXG5cdFx0XHRyZW1vdGVJbWFnZSA9IHRydWVcblx0XHRcdGltZ1NyYyA9IG9wdGlvbnMuaW1nU3JjXG5cdFx0XHQhfmltZ0NhY2hlLmluZGV4T2YoaW1nU3JjKSAmJiB0b2dnbGVMb2FkaW5nSWNvbih0cnVlKVxuXHRcdFx0ZGlzcGxheUVsZW1lbnQgPSBkaXNwbGF5SW1hZ2Vcblx0XHRcdGRpc3BsYXlFbGVtZW50LnNyYyA9IGltZ1NyY1xuXHRcdH0gZWxzZSBpZiAob3B0aW9ucy5hdWRpbykge1xuXHRcdFx0Ly8gaWYgZGlyZWN0IHZpZGVvIGxpbmtcblx0XHRcdHRvZ2dsZUxvYWRpbmdJY29uKHRydWUpXG5cdFx0XHRkaXNwbGF5RWxlbWVudCA9IGRpc3BsYXlBdWRpb1xuXHRcdFx0ZGlzcGxheUVsZW1lbnQuc3JjID0gb3B0aW9ucy5hdWRpb1xuXHRcdFx0Y2hlY2tNZWRpYSgnYXVkaW8gZmlsZScpXG5cdFx0fSBlbHNlIGlmIChvcHRpb25zLnZpZFNyYykge1xuXHRcdFx0Ly8gaWYgZGlyZWN0IHZpZGVvIGxpbmtcblx0XHRcdHRvZ2dsZUxvYWRpbmdJY29uKHRydWUpXG5cdFx0XHRtYWtlVmlkU3JjKG9wdGlvbnMudmlkU3JjKVxuXHRcdFx0Y2hlY2tNZWRpYSgndmlkZW8nKVxuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBsb2NhbCBpbWFnZSAvIGJhY2tncm91bmQgaW1hZ2UgYWxyZWFkeSBsb2FkZWQgb24gcGFnZVxuXHRcdFx0ZGlzcGxheUVsZW1lbnQgPSBkaXNwbGF5SW1hZ2Vcblx0XHRcdC8vIGdldCBpbWcgc291cmNlIG9yIGVsZW1lbnQgYmFja2dyb3VuZCBpbWFnZVxuXHRcdFx0ZGlzcGxheUVsZW1lbnQuc3JjID1cblx0XHRcdFx0ZWwudGFnTmFtZSA9PT0gJ0lNRydcblx0XHRcdFx0XHQ/IGVsLnNyY1xuXHRcdFx0XHRcdDogZ2xvYmFsXG5cdFx0XHRcdFx0XHQuZ2V0Q29tcHV0ZWRTdHlsZShlbClcblx0XHRcdFx0XHRcdC5iYWNrZ3JvdW5kSW1hZ2UucmVwbGFjZSgvXnVybHxbKHwpfCd8XCJdL2csICcnKVxuXHRcdH1cblxuXHRcdC8vIGFkZCBjb250YWluZXIgdG8gcGFnZVxuXHRcdGNvbnRhaW5lclthcHBlbmRFbF0oZGlzcGxheUVsZW1lbnQpXG5cdFx0ZG9jLmJvZHlbYXBwZW5kRWxdKGNvbnRhaW5lcilcblx0fVxuXG5cdC8vIGNyZWF0ZSBhbGwgbmVlZGVkIG1ldGhvZHMgLyBzdG9yZSBkb20gZWxlbWVudHMgb24gZmlyc3QgdXNlXG5cdGZ1bmN0aW9uIGluaXRpYWxpemUoKSB7XG5cdFx0dmFyIHN0YXJ0WFxuXHRcdC8vIHJldHVybiBjbG9zZSBidXR0b24gZWxlbWVudHNcblx0XHRmdW5jdGlvbiBjcmVhdGVDbG9zZUJ1dHRvbihjbGFzc05hbWUpIHtcblx0XHRcdHZhciBlbCA9IGRvY1tjcmVhdGVFbF0oJ2J1dHRvbicpXG5cdFx0XHRlbC5jbGFzc05hbWUgPSBjbGFzc05hbWVcblx0XHRcdGVsW2h0bWxJbm5lcl0gPSAnPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCA0OCA0OFwiPjxwYXRoIGQ9XCJNMjggMjRMNDcgNWEzIDMgMCAxIDAtNC00TDI0IDIwIDUgMWEzIDMgMCAxIDAtNCA0bDE5IDE5TDEgNDNhMyAzIDAgMSAwIDQgNGwxOS0xOSAxOSAxOWEzIDMgMCAwIDAgNCAwdi00TDI4IDI0elwiLz48L3N2Zz4nXG5cdFx0XHRyZXR1cm4gZWxcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBjcmVhdGVBcnJvd1N5bWJvbChkaXJlY3Rpb24sIHN0eWxlKSB7XG5cdFx0XHR2YXIgZWwgPSBkb2NbY3JlYXRlRWxdKCdidXR0b24nKVxuXHRcdFx0ZWwuY2xhc3NOYW1lID0gJ2JwLWxyJ1xuXHRcdFx0ZWxbaHRtbElubmVyXSA9XG5cdFx0XHRcdCc8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDEyOSAxMjlcIiBoZWlnaHQ9XCI3MFwiIGZpbGw9XCIjZmZmXCI+PHBhdGggZD1cIk04OC42IDEyMS4zYy44LjggMS44IDEuMiAyLjkgMS4yczIuMS0uNCAyLjktMS4yYTQuMSA0LjEgMCAwIDAgMC01LjhsLTUxLTUxIDUxLTUxYTQuMSA0LjEgMCAwIDAtNS44LTUuOGwtNTQgNTMuOWE0LjEgNC4xIDAgMCAwIDAgNS44bDU0IDUzLjl6XCIvPjwvc3ZnPidcblx0XHRcdGNoYW5nZUNTUyhlbCwgc3R5bGUpXG5cdFx0XHRlbC5vbmNsaWNrID0gZnVuY3Rpb24oZSkge1xuXHRcdFx0XHRlLnN0b3BQcm9wYWdhdGlvbigpXG5cdFx0XHRcdHVwZGF0ZUdhbGxlcnkoZGlyZWN0aW9uKVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGVsXG5cdFx0fVxuXG5cdFx0Ly8gYWRkIHN0eWxlIC0gaWYgeW91IHdhbnQgdG8gdHdlYWssIHJ1biB0aHJvdWdoIGJlYXV0aWZpZXJcblx0XHR2YXIgc3R5bGUgPSBkb2NbY3JlYXRlRWxdKCdTVFlMRScpXG5cdFx0c3R5bGVbaHRtbElubmVyXSA9XG5cdFx0XHQnI2JwX2NhcHRpb24sI2JwX2NvbnRhaW5lcntib3R0b206MDtsZWZ0OjA7cmlnaHQ6MDtwb3NpdGlvbjpmaXhlZDtvcGFjaXR5OjB9I2JwX2NvbnRhaW5lcj4qLCNicF9sb2FkZXJ7cG9zaXRpb246YWJzb2x1dGU7cmlnaHQ6MDt6LWluZGV4OjEwfSNicF9jb250YWluZXJ7dG9wOjA7ei1pbmRleDo5OTk5O2JhY2tncm91bmQ6cmdiYSgwLDAsMCwuNyk7b3BhY2l0eTowO3BvaW50ZXItZXZlbnRzOm5vbmU7dHJhbnNpdGlvbjpvcGFjaXR5IC4zNXN9I2JwX2xvYWRlcnt0b3A6MDtsZWZ0OjA7Ym90dG9tOjA7ZGlzcGxheTpmbGV4O21hcmdpbjowO2N1cnNvcjp3YWl0O3otaW5kZXg6OTtiYWNrZ3JvdW5kOjAgMH0jYnBfbG9hZGVyIHN2Z3t3aWR0aDo1MCU7bWF4LXdpZHRoOjMwMHB4O21heC1oZWlnaHQ6NTAlO21hcmdpbjphdXRvO2FuaW1hdGlvbjpicHR1cm4gMXMgaW5maW5pdGUgbGluZWFyfSNicF9hdWQsI2JwX2NvbnRhaW5lciBpbWcsI2JwX3N2LCNicF92aWR7dXNlci1zZWxlY3Q6bm9uZTttYXgtaGVpZ2h0Ojk2JTttYXgtd2lkdGg6OTYlO3RvcDowO2JvdHRvbTowO2xlZnQ6MDttYXJnaW46YXV0bztib3gtc2hhZG93OjAgMCAzZW0gcmdiYSgwLDAsMCwuNCk7ei1pbmRleDotMX0jYnBfc3Z7aGVpZ2h0OjA7cGFkZGluZy1ib3R0b206NTQlO2JhY2tncm91bmQtY29sb3I6IzAwMDt3aWR0aDo5NiV9I2JwX2NhcHRpb257cG9pbnRlci1ldmVudHM6bm9uZTtmb250LXNpemU6LjllbTtwYWRkaW5nOjEuM2VtO2JhY2tncm91bmQ6cmdiYSgxNSwxNSwxNSwuOTQpO2NvbG9yOiNmZmY7dGV4dC1hbGlnbjpjZW50ZXI7dHJhbnNpdGlvbjpvcGFjaXR5IC4zc30jYnBfYXVke3dpZHRoOjY1MHB4O3RvcDpjYWxjKDUwJSAtIDIwcHgpO2JvdHRvbTphdXRvO2JveC1zaGFkb3c6bm9uZX0jYnBfY291bnR7bGVmdDowO3JpZ2h0OmF1dG87cGFkZGluZzoxNHB4O2NvbG9yOnJnYmEoMjU1LDI1NSwyNTUsLjcpO2ZvbnQtc2l6ZToyMnB4O2N1cnNvcjpkZWZhdWx0fSNicF9jb250YWluZXIgYnV0dG9ue3Bvc2l0aW9uOmFic29sdXRlO2JvcmRlcjowO291dGxpbmU6MDtiYWNrZ3JvdW5kOjAgMDtjdXJzb3I6cG9pbnRlcjt0cmFuc2l0aW9uOmFsbCAuMXN9I2JwX2NvbnRhaW5lcj4uYnAteHtoZWlnaHQ6NDFweDt3aWR0aDo0MXB4O2JvcmRlci1yYWRpdXM6MTAwJTtsaW5lLWhlaWdodDo1MHB4O3RvcDo4cHg7cmlnaHQ6MTRweDtvcGFjaXR5Oi44fSNicF9jb250YWluZXI+LmJwLXg6Zm9jdXMsI2JwX2NvbnRhaW5lcj4uYnAteDpob3ZlcntiYWNrZ3JvdW5kOnJnYmEoMjU1LDI1NSwyNTUsLjIpfS5icC14IHN2ZywuYnAteGMgc3Zne2hlaWdodDoyMHB4O3dpZHRoOjIwcHg7ZmlsbDojZmZmfS5icC14YyBzdmd7d2lkdGg6MTZweH0jYnBfY29udGFpbmVyIC5icC14Y3tsZWZ0OjIlO2JvdHRvbToxMDAlO3BhZGRpbmc6OXB4IDIwcHggNHB4O2JhY2tncm91bmQ6I2QwNDQ0NDtib3JkZXItcmFkaXVzOjJweCAycHggMCAwO29wYWNpdHk6Ljg1fSNicF9jb250YWluZXIgLmJwLXhjOmZvY3VzLCNicF9jb250YWluZXIgLmJwLXhjOmhvdmVye29wYWNpdHk6MX0uYnAtbHJ7dG9wOjUwJTt0b3A6Y2FsYyg1MCUgLSAxMzBweCk7cGFkZGluZzo5OXB4IDA7d2lkdGg6NiU7YmFja2dyb3VuZDowIDA7Ym9yZGVyOjA7b3BhY2l0eTouNDt0cmFuc2l0aW9uOm9wYWNpdHkgLjFzfS5icC1scjpmb2N1cywuYnAtbHI6aG92ZXJ7b3BhY2l0eTouOH1Aa2V5ZnJhbWVzIGJwZns1MCV7dHJhbnNmb3JtOnRyYW5zbGF0ZXgoMTVweCl9MTAwJXt0cmFuc2Zvcm06bm9uZX19QGtleWZyYW1lcyBicGx7NTAle3RyYW5zZm9ybTp0cmFuc2xhdGV4KC0xNXB4KX0xMDAle3RyYW5zZm9ybTpub25lfX1Aa2V5ZnJhbWVzIGJwZmx7MCV7b3BhY2l0eTowO3RyYW5zZm9ybTp0cmFuc2xhdGV4KDcwcHgpfTEwMCV7b3BhY2l0eToxO3RyYW5zZm9ybTpub25lfX1Aa2V5ZnJhbWVzIGJwZnJ7MCV7b3BhY2l0eTowO3RyYW5zZm9ybTp0cmFuc2xhdGV4KC03MHB4KX0xMDAle29wYWNpdHk6MTt0cmFuc2Zvcm06bm9uZX19QGtleWZyYW1lcyBicGZvbHswJXtvcGFjaXR5OjE7dHJhbnNmb3JtOm5vbmV9MTAwJXtvcGFjaXR5OjA7dHJhbnNmb3JtOnRyYW5zbGF0ZXgoLTcwcHgpfX1Aa2V5ZnJhbWVzIGJwZm9yezAle29wYWNpdHk6MTt0cmFuc2Zvcm06bm9uZX0xMDAle29wYWNpdHk6MDt0cmFuc2Zvcm06dHJhbnNsYXRleCg3MHB4KX19QGtleWZyYW1lcyBicHR1cm57MCV7dHJhbnNmb3JtOm5vbmV9MTAwJXt0cmFuc2Zvcm06cm90YXRlKDM2MGRlZyl9fUBtZWRpYSAobWF4LXdpZHRoOjYwMHB4KXsuYnAtbHJ7Zm9udC1zaXplOjE1dnd9fUBtZWRpYSAobWluLWFzcGVjdC1yYXRpbzo5LzUpeyNicF9zdntoZWlnaHQ6OTglO3dpZHRoOjE3MC42dmg7cGFkZGluZzowfX0nXG5cdFx0ZG9jLmhlYWRbYXBwZW5kRWxdKHN0eWxlKVxuXG5cdFx0Ly8gY3JlYXRlIGNvbnRhaW5lciBlbGVtZW50XG5cdFx0Y29udGFpbmVyID0gZG9jW2NyZWF0ZUVsXSgnRElWJylcblx0XHRjb250YWluZXIuaWQgPSAnYnBfY29udGFpbmVyJ1xuXHRcdGNvbnRhaW5lci5vbmNsaWNrID0gY2xvc2Vcblx0XHRjbG9zZUJ1dHRvbiA9IGNyZWF0ZUNsb3NlQnV0dG9uKCdicC14Jylcblx0XHRjb250YWluZXJbYXBwZW5kRWxdKGNsb3NlQnV0dG9uKVxuXHRcdC8vIGdhbGxlcnkgc3dpcGUgbGlzdGVuZXJzXG5cdFx0aWYgKCdvbnRvdWNoc3RhcnQnIGluIGdsb2JhbCkge1xuXHRcdFx0c3VwcG9ydHNUb3VjaCA9IHRydWVcblx0XHRcdGNvbnRhaW5lci5vbnRvdWNoc3RhcnQgPSBmdW5jdGlvbihlKSB7XG5cdFx0XHRcdHN0YXJ0WCA9IGUuY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVhcblx0XHRcdH1cblx0XHRcdGNvbnRhaW5lci5vbnRvdWNobW92ZSA9IGZ1bmN0aW9uKGUpIHtcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpXG5cdFx0XHR9XG5cdFx0XHRjb250YWluZXIub250b3VjaGVuZCA9IGZ1bmN0aW9uKGUpIHtcblx0XHRcdFx0aWYgKCFnYWxsZXJ5T3Blbikge1xuXHRcdFx0XHRcdHJldHVyblxuXHRcdFx0XHR9XG5cdFx0XHRcdHZhciB0b3VjaG9iaiA9IGUuY2hhbmdlZFRvdWNoZXNbMF1cblx0XHRcdFx0dmFyIGRpc3RYID0gdG91Y2hvYmoucGFnZVggLSBzdGFydFhcblx0XHRcdFx0Ly8gc3dpcGUgcmlnaHRcblx0XHRcdFx0ZGlzdFggPCAtMzAgJiYgdXBkYXRlR2FsbGVyeSgxKVxuXHRcdFx0XHQvLyBzd2lwZSBsZWZ0XG5cdFx0XHRcdGRpc3RYID4gMzAgJiYgdXBkYXRlR2FsbGVyeSgtMSlcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBjcmVhdGUgZGlzcGxheSBpbWFnZSBlbGVtZW50XG5cdFx0ZGlzcGxheUltYWdlID0gZG9jW2NyZWF0ZUVsXSgnSU1HJylcblxuXHRcdC8vIGNyZWF0ZSBkaXNwbGF5IHZpZGVvIGVsZW1lbnRcblx0XHRkaXNwbGF5VmlkZW8gPSBkb2NbY3JlYXRlRWxdKCdWSURFTycpXG5cdFx0ZGlzcGxheVZpZGVvLmlkID0gJ2JwX3ZpZCdcblx0XHRkaXNwbGF5VmlkZW8uc2V0QXR0cmlidXRlKCdwbGF5c2lubGluZScsIHRydWUpXG5cdFx0ZGlzcGxheVZpZGVvLmNvbnRyb2xzID0gdHJ1ZVxuXHRcdGRpc3BsYXlWaWRlby5sb29wID0gdHJ1ZVxuXG5cdFx0Ly8gY3JlYXRlIGF1ZGlvIGVsZW1lbnRcblx0XHRkaXNwbGF5QXVkaW8gPSBkb2NbY3JlYXRlRWxdKFwiYXVkaW9cIilcblx0XHRkaXNwbGF5QXVkaW8uaWQgPSBcImJwX2F1ZFwiXG5cdFx0ZGlzcGxheUF1ZGlvLmNvbnRyb2xzID0gdHJ1ZVxuXHRcdGRpc3BsYXlBdWRpby5sb29wID0gdHJ1ZVxuXG5cdFx0Ly8gY3JlYXRlIGdhbGxlcnkgY291bnRlclxuXHRcdGdhbGxlcnlDb3VudGVyID0gZG9jW2NyZWF0ZUVsXSgnc3BhbicpXG5cdFx0Z2FsbGVyeUNvdW50ZXIuaWQgPSAnYnBfY291bnQnXG5cblx0XHQvLyBjcmVhdGUgY2FwdGlvbiBlbGVtZW50c1xuXHRcdGNhcHRpb24gPSBkb2NbY3JlYXRlRWxdKCdESVYnKVxuXHRcdGNhcHRpb24uaWQgPSAnYnBfY2FwdGlvbidcblx0XHRjYXB0aW9uSGlkZUJ1dHRvbiA9IGNyZWF0ZUNsb3NlQnV0dG9uKCdicC14YycpXG5cdFx0Y2FwdGlvbkhpZGVCdXR0b24ub25jbGljayA9IHRvZ2dsZUNhcHRpb24uYmluZChudWxsLCBmYWxzZSlcblx0XHRjYXB0aW9uW2FwcGVuZEVsXShjYXB0aW9uSGlkZUJ1dHRvbilcblx0XHRjYXB0aW9uVGV4dCA9IGRvY1tjcmVhdGVFbF0oJ1NQQU4nKVxuXHRcdGNhcHRpb25bYXBwZW5kRWxdKGNhcHRpb25UZXh0KVxuXHRcdGNvbnRhaW5lclthcHBlbmRFbF0oY2FwdGlvbilcblxuXHRcdC8vIGxlZnQgLyByaWdodCBhcnJvdyBpY29uc1xuXHRcdHJpZ2h0QXJyb3dCdG4gPSBjcmVhdGVBcnJvd1N5bWJvbCgxLCAndHJhbnNmb3JtOnNjYWxleCgtMSknKVxuXHRcdGxlZnRBcnJvd0J0biA9IGNyZWF0ZUFycm93U3ltYm9sKC0xLCAnbGVmdDowO3JpZ2h0OmF1dG8nKVxuXG5cdFx0Ly8gY3JlYXRlIGxvYWRpbmcgaWNvbiBlbGVtZW50XG5cdFx0bG9hZGluZ0ljb24gPSBkb2NbY3JlYXRlRWxdKCdESVYnKVxuXHRcdGxvYWRpbmdJY29uLmlkID0gJ2JwX2xvYWRlcidcblx0XHRsb2FkaW5nSWNvbltodG1sSW5uZXJdID1cblx0XHRcdCc8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Ym94PVwiMCAwIDMyIDMyXCIgZmlsbD1cIiNmZmZcIiBvcGFjaXR5PVwiLjhcIj48cGF0aCBkPVwiTTE2IDBhMTYgMTYgMCAwIDAgMCAzMiAxNiAxNiAwIDAgMCAwLTMybTAgNGExMiAxMiAwIDAgMSAwIDI0IDEyIDEyIDAgMCAxIDAtMjRcIiBmaWxsPVwiIzAwMFwiIG9wYWNpdHk9XCIuNVwiLz48cGF0aCBkPVwiTTE2IDBhMTYgMTYgMCAwIDEgMTYgMTZoLTRBMTIgMTIgMCAwIDAgMTYgNHpcIi8+PC9zdmc+J1xuXHRcdC8vIGNyZWF0ZSB5b3V0dWJlIC8gdmltZW8gY29udGFpbmVyXG5cdFx0aWZyYW1lQ29udGFpbmVyID0gZG9jW2NyZWF0ZUVsXSgnRElWJylcblx0XHRpZnJhbWVDb250YWluZXIuaWQgPSAnYnBfc3YnXG5cblx0XHQvLyBjcmVhdGUgaWZyYW1lIHRvIGhvbGQgeW91dHViZSAvIHZpbWVvIHBsYXllclxuXHRcdGlmcmFtZVNpdGVWaWQgPSBkb2NbY3JlYXRlRWxdKCdJRlJBTUUnKVxuXHRcdGlmcmFtZVNpdGVWaWQuYWxsb3dGdWxsc2NyZWVuID0gdHJ1ZVxuXHRcdGlmcmFtZVNpdGVWaWQub25sb2FkID0gb3BlblxuXHRcdGNoYW5nZUNTUyhpZnJhbWVTaXRlVmlkLCAnYm9yZGVyOjA7cG9zaXRpb246YWJzb2x1dGU7aGVpZ2h0OjEwMCU7d2lkdGg6MTAwJTtsZWZ0OjA7dG9wOjAnKVxuXHRcdGlmcmFtZUNvbnRhaW5lclthcHBlbmRFbF0oaWZyYW1lU2l0ZVZpZClcblxuXHRcdC8vIGRpc3BsYXkgaW1hZ2UgYmluZGluZ3MgZm9yIGltYWdlIGxvYWQgYW5kIGVycm9yXG5cdFx0ZGlzcGxheUltYWdlLm9ubG9hZCA9IG9wZW5cblx0XHRkaXNwbGF5SW1hZ2Uub25lcnJvciA9IG9wZW4uYmluZChudWxsLCAnaW1hZ2UnKVxuXG5cdFx0Ly8gYWRqdXN0IGxvYWRlciBwb3NpdGlvbiBvbiB3aW5kb3cgcmVzaXplXG5cdFx0Z2xvYmFsW2xpc3RlbkZvcl0oJ3Jlc2l6ZScsIGZ1bmN0aW9uKCkge1xuXHRcdFx0Z2FsbGVyeU9wZW4gfHwgKGlzTG9hZGluZyAmJiB0b2dnbGVMb2FkaW5nSWNvbih0cnVlKSlcblx0XHR9KVxuXG5cdFx0Ly8gY2xvc2UgY29udGFpbmVyIG9uIGVzY2FwZSBrZXkgcHJlc3MgYW5kIGFycm93IGJ1dHRvbnMgZm9yIGdhbGxlcnlcblx0XHRkb2NbbGlzdGVuRm9yXSgna2V5dXAnLCBmdW5jdGlvbihlKSB7XG5cdFx0XHR2YXIga2V5ID0gZS5rZXlDb2RlXG5cdFx0XHRrZXkgPT09IDI3ICYmIGlzT3BlbiAmJiBjbG9zZShjb250YWluZXIpXG5cdFx0XHRpZiAoZ2FsbGVyeU9wZW4pIHtcblx0XHRcdFx0a2V5ID09PSAzOSAmJiB1cGRhdGVHYWxsZXJ5KDEpXG5cdFx0XHRcdGtleSA9PT0gMzcgJiYgdXBkYXRlR2FsbGVyeSgtMSlcblx0XHRcdFx0a2V5ID09PSAzOCAmJiB1cGRhdGVHYWxsZXJ5KDEwKVxuXHRcdFx0XHRrZXkgPT09IDQwICYmIHVwZGF0ZUdhbGxlcnkoLTEwKVxuXHRcdFx0fVxuXHRcdH0pXG5cdFx0Ly8gcHJldmVudCBzY3JvbGxpbmcgd2l0aCBhcnJvdyBrZXlzIGlmIGdhbGxlcnkgb3BlblxuXHRcdGRvY1tsaXN0ZW5Gb3JdKCdrZXlkb3duJywgZnVuY3Rpb24oZSkge1xuXHRcdFx0dmFyIHVzZWRLZXlzID0gWzM3LCAzOCwgMzksIDQwXVxuXHRcdFx0aWYgKGdhbGxlcnlPcGVuICYmIH51c2VkS2V5cy5pbmRleE9mKGUua2V5Q29kZSkpIHtcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpXG5cdFx0XHR9XG5cdFx0fSlcblxuXHRcdC8vIHRyYXAgZm9jdXMgd2l0aGluIGNvbmFpbmVyIHdoaWxlIG9wZW5cblx0XHRkb2NbbGlzdGVuRm9yXShcblx0XHRcdCdmb2N1cycsXG5cdFx0XHRmdW5jdGlvbihlKSB7XG5cdFx0XHRcdGlmIChpc09wZW4gJiYgIWNvbnRhaW5lci5jb250YWlucyhlLnRhcmdldCkpIHtcblx0XHRcdFx0XHRlLnN0b3BQcm9wYWdhdGlvbigpXG5cdFx0XHRcdFx0Y2xvc2VCdXR0b24uZm9jdXMoKVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0dHJ1ZVxuXHRcdClcblxuXHRcdC8vIGFsbCBkb25lXG5cdFx0aW5pdGlhbGl6ZWQgPSB0cnVlXG5cdH1cblxuXHQvLyByZXR1cm4gdHJhbnNmb3JtIHN0eWxlIHRvIG1ha2UgZnVsbCBzaXplIGRpc3BsYXkgZWwgbWF0Y2ggdHJpZ2dlciBlbCBzaXplXG5cdGZ1bmN0aW9uIGdldFJlY3QoKSB7XG5cdFx0dmFyIHJlY3QgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuXHRcdHZhciBsZWZ0T2Zmc2V0ID0gcmVjdC5sZWZ0IC0gKGNvbnRhaW5lcltjV2lkdGhdIC0gcmVjdC53aWR0aCkgLyAyXG5cdFx0dmFyIGNlbnRlclRvcCA9IHJlY3QudG9wIC0gKGNvbnRhaW5lcltjSGVpZ2h0XSAtIHJlY3QuaGVpZ2h0KSAvIDJcblx0XHR2YXIgc2NhbGVXaWR0aCA9IGVsW2NXaWR0aF0gLyBkaXNwbGF5RWxlbWVudFtjV2lkdGhdXG5cdFx0dmFyIHNjYWxlSGVpZ2h0ID0gZWxbY0hlaWdodF0gLyBkaXNwbGF5RWxlbWVudFtjSGVpZ2h0XVxuXHRcdHJldHVybiAndHJhbnNmb3JtOnRyYW5zbGF0ZTNEKCcgK1xuXHRcdFx0bGVmdE9mZnNldCArXG5cdFx0XHQncHgsICcgK1xuXHRcdFx0Y2VudGVyVG9wICtcblx0XHRcdCdweCwgMCkgc2NhbGUzRCgnICtcblx0XHRcdHNjYWxlV2lkdGggK1xuXHRcdFx0JywgJyArXG5cdFx0XHRzY2FsZUhlaWdodCArXG5cdFx0XHQnLCAwKSdcblx0fVxuXG5cdGZ1bmN0aW9uIG1ha2VWaWRTcmMoc291cmNlKSB7XG5cdFx0aWYgKEFycmF5LmlzQXJyYXkoc291cmNlKSkge1xuXHRcdFx0ZGlzcGxheUVsZW1lbnQgPSBkaXNwbGF5VmlkZW8uY2xvbmVOb2RlKClcblx0XHRcdHNvdXJjZS5mb3JFYWNoKGZ1bmN0aW9uKHNyYykge1xuXHRcdFx0XHR2YXIgc291cmNlID0gZG9jW2NyZWF0ZUVsXSgnU09VUkNFJylcblx0XHRcdFx0c291cmNlLnNyYyA9IHNyY1xuXHRcdFx0XHRzb3VyY2UudHlwZSA9ICd2aWRlby8nICsgc3JjLm1hdGNoKC8uKFxcdyspJC8pWzFdXG5cdFx0XHRcdGRpc3BsYXlFbGVtZW50W2FwcGVuZEVsXShzb3VyY2UpXG5cdFx0XHR9KVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRkaXNwbGF5RWxlbWVudCA9IGRpc3BsYXlWaWRlb1xuXHRcdFx0ZGlzcGxheUVsZW1lbnQuc3JjID0gc291cmNlXG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gbWFrZUdhbGxlcnkoZ2FsbGVyeSkge1xuXHRcdGlmIChBcnJheS5pc0FycmF5KGdhbGxlcnkpKSB7XG5cdFx0XHQvLyBpcyBhcnJheSBvZiBpbWFnZXNcblx0XHRcdGdhbGxlcnlQb3NpdGlvbiA9IDBcblx0XHRcdGdhbGxlcnlFbHMgPSBnYWxsZXJ5XG5cdFx0XHRjYXB0aW9uQ29udGVudCA9IGdhbGxlcnlbMF0uY2FwdGlvblxuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBpcyBlbGVtZW50IHNlbGVjdG9yIG9yIG5vZGVsaXN0XG5cdFx0XHRnYWxsZXJ5RWxzID0gW10uc2xpY2UuY2FsbCh0eXBlb2YgZ2FsbGVyeSA9PT0gJ3N0cmluZycgPyBkb2MucXVlcnlTZWxlY3RvckFsbChnYWxsZXJ5ICsgJyBbZGF0YS1icF0nKSA6IGdhbGxlcnkpXG5cdFx0XHQvLyBmaW5kIGluaXRpYWwgZ2FsbGVyeSBwb3NpdGlvblxuXHRcdFx0dmFyIGVsSW5kZXggPSBnYWxsZXJ5RWxzLmluZGV4T2YoZWwpXG5cdFx0XHRnYWxsZXJ5UG9zaXRpb24gPSBlbEluZGV4ICE9PSAtMSA/IGVsSW5kZXggOiAwXG5cdFx0XHQvLyBtYWtlIGdhbGxlcnkgb2JqZWN0IHcvIGVscyAvIHNyYyAvIGNhcHRpb25cblx0XHRcdGdhbGxlcnlFbHMgPSBnYWxsZXJ5RWxzLm1hcChmdW5jdGlvbihlbCkge1xuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdGVsOiBlbCxcblx0XHRcdFx0XHRzcmM6IGVsLmdldEF0dHJpYnV0ZSgnZGF0YS1icCcpLFxuXHRcdFx0XHRcdGNhcHRpb246IGVsLmdldEF0dHJpYnV0ZSgnZGF0YS1jYXB0aW9uJylcblx0XHRcdFx0fVxuXHRcdFx0fSlcblx0XHR9XG5cdFx0Ly8gc2hvdyBsb2FkaW5nIGljb24gaWYgbmVlZGVkXG5cdFx0cmVtb3RlSW1hZ2UgPSB0cnVlXG5cdFx0Ly8gc2V0IGluaXRpYWwgc3JjIHRvIGltZ1NyYyBzbyBpdCB3aWxsIGJlIGNhY2hlZCBpbiBvcGVuIGZ1bmNcblx0XHRpbWdTcmMgPSBnYWxsZXJ5RWxzW2dhbGxlcnlQb3NpdGlvbl0uc3JjXG5cdFx0IX5pbWdDYWNoZS5pbmRleE9mKGltZ1NyYykgJiYgdG9nZ2xlTG9hZGluZ0ljb24odHJ1ZSlcblx0XHRpZiAoZ2FsbGVyeUVscy5sZW5ndGggPiAxKSB7XG5cdFx0XHQvLyBpZiBsZW5ndGggaXMgZ3JlYXRlciB0aGFuIG9uZSwgYWRkIGdhbGxlcnkgc3R1ZmZcblx0XHRcdGNvbnRhaW5lclthcHBlbmRFbF0oZ2FsbGVyeUNvdW50ZXIpXG5cdFx0XHRnYWxsZXJ5Q291bnRlcltodG1sSW5uZXJdID0gZ2FsbGVyeVBvc2l0aW9uICsgMSArICcvJyArIGdhbGxlcnlFbHMubGVuZ3RoXG5cdFx0XHRpZiAoIXN1cHBvcnRzVG91Y2gpIHtcblx0XHRcdFx0Ly8gYWRkIGFycm93cyBpZiBkZXZpY2UgZG9lc24ndCBzdXBwb3J0IHRvdWNoXG5cdFx0XHRcdGNvbnRhaW5lclthcHBlbmRFbF0ocmlnaHRBcnJvd0J0bilcblx0XHRcdFx0Y29udGFpbmVyW2FwcGVuZEVsXShsZWZ0QXJyb3dCdG4pXG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIGdhbGxlcnkgaXMgb25lLCBqdXN0IHNob3cgd2l0aG91dCBjbHV0dGVyXG5cdFx0XHRnYWxsZXJ5RWxzID0gZmFsc2Vcblx0XHR9XG5cdFx0ZGlzcGxheUVsZW1lbnQgPSBkaXNwbGF5SW1hZ2Vcblx0XHQvLyBzZXQgaW5pdGlhbCBpbWFnZSBzcmNcblx0XHRkaXNwbGF5RWxlbWVudC5zcmMgPSBpbWdTcmNcblx0fVxuXG5cdGZ1bmN0aW9uIHVwZGF0ZUdhbGxlcnkobW92ZW1lbnQpIHtcblx0XHR2YXIgZ2FsbGVyeUxlbmd0aCA9IGdhbGxlcnlFbHMubGVuZ3RoIC0gMVxuXHRcdHZhciBpc0VuZFxuXG5cdFx0Ly8gb25seSBhbGxvdyBvbmUgY2hhbmdlIGF0IGEgdGltZVxuXHRcdGlmIChpc0xvYWRpbmcpIHtcblx0XHRcdHJldHVyblxuXHRcdH1cblxuXHRcdC8vIHJldHVybiBpZiByZXF1ZXN0aW5nIG91dCBvZiByYW5nZSBpbWFnZVxuXHRcdGlmIChtb3ZlbWVudCA+IDApIHtcblx0XHRcdGlmIChnYWxsZXJ5UG9zaXRpb24gPT09IGdhbGxlcnlMZW5ndGgpIHtcblx0XHRcdFx0aXNFbmQgPSB0cnVlXG5cdFx0XHR9XG5cdFx0fSBlbHNlIGlmIChnYWxsZXJ5UG9zaXRpb24gPT09IDApIHtcblx0XHRcdGlzRW5kID0gdHJ1ZVxuXHRcdH1cblx0XHRpZiAoaXNFbmQpIHtcblx0XHRcdC8vIGlmIGJlZ2lubmluZyBvciBlbmQgb2YgZ2FsbGVyeSwgcnVuIGVuZCBhbmltYXRpb25cblx0XHRcdGNoYW5nZUNTUyhkaXNwbGF5SW1hZ2UsICcnKVxuXHRcdFx0dGltZW91dChjaGFuZ2VDU1MsIDksIGRpc3BsYXlJbWFnZSwgJ2FuaW1hdGlvbjonICsgKG1vdmVtZW50ID4gMCA/ICdicGwnIDogJ2JwZicpICsgJyAuM3M7dHJhbnNpdGlvbjp0cmFuc2Zvcm0gLjM1cycpXG5cdFx0XHRyZXR1cm5cblx0XHR9XG5cblx0XHQvLyBub3JtYWxpemUgcG9zaXRpb25cblx0XHRnYWxsZXJ5UG9zaXRpb24gPSBNYXRoLm1heChcblx0XHRcdDAsXG5cdFx0XHRNYXRoLm1pbihnYWxsZXJ5UG9zaXRpb24gKyBtb3ZlbWVudCwgZ2FsbGVyeUxlbmd0aClcblx0XHQpXG5cblx0XHQvLyBsb2FkIGltYWdlcyBiZWZvcmUgYW5kIGFmdGVyIGZvciBxdWlja2VyIHNjcm9sbGluZyB0aHJvdWdoIHBpY3R1cmVzXG5cdFx0O1tnYWxsZXJ5UG9zaXRpb24gLSAxLCBnYWxsZXJ5UG9zaXRpb24sIGdhbGxlcnlQb3NpdGlvbiArIDFdLmZvckVhY2goXG5cdFx0XHRmdW5jdGlvbihwb3NpdGlvbikge1xuXHRcdFx0XHQvLyBub3JtYWxpemUgcG9zaXRpb25cblx0XHRcdFx0cG9zaXRpb24gPSBNYXRoLm1heCgwLCBNYXRoLm1pbihwb3NpdGlvbiwgZ2FsbGVyeUxlbmd0aCkpXG5cdFx0XHRcdC8vIGNhbmNlbCBpZiBpbWFnZSBoYXMgYWxyZWFkeSBiZWVuIHByZWxvYWRlZFxuXHRcdFx0XHRpZiAocHJlbG9hZGVkSW1hZ2VzW3Bvc2l0aW9uXSkgcmV0dXJuXG5cdFx0XHRcdHZhciBzcmMgPSBnYWxsZXJ5RWxzW3Bvc2l0aW9uXS5zcmNcblx0XHRcdFx0Ly8gY3JlYXRlIGltYWdlIGZvciBwcmVsb2FkZWRJbWFnZXNcblx0XHRcdFx0dmFyIGltZyA9IGRvY1tjcmVhdGVFbF0oJ0lNRycpXG5cdFx0XHRcdGltZ1tsaXN0ZW5Gb3JdKCdsb2FkJywgYWRkVG9JbWdDYWNoZS5iaW5kKG51bGwsIHNyYykpXG5cdFx0XHRcdGltZy5zcmMgPSBzcmNcblx0XHRcdFx0cHJlbG9hZGVkSW1hZ2VzW3Bvc2l0aW9uXSA9IGltZ1xuXHRcdFx0fVxuXHRcdClcblx0XHQvLyBpZiBpbWFnZSBpcyBsb2FkZWQsIHNob3cgaXRcblx0XHRpZiAocHJlbG9hZGVkSW1hZ2VzW2dhbGxlcnlQb3NpdGlvbl0uY29tcGxldGUpIHtcblx0XHRcdHJldHVybiBjaGFuZ2VHYWxsZXJ5SW1hZ2UobW92ZW1lbnQpXG5cdFx0fVxuXHRcdC8vIGlmIG5vdCwgc2hvdyBsb2FkaW5nIGljb24gYW5kIGNoYW5nZSB3aGVuIGxvYWRlZFxuXHRcdGlzTG9hZGluZyA9IHRydWVcblx0XHRjaGFuZ2VDU1MobG9hZGluZ0ljb24sICdvcGFjaXR5Oi40OycpXG5cdFx0Y29udGFpbmVyW2FwcGVuZEVsXShsb2FkaW5nSWNvbilcblx0XHRwcmVsb2FkZWRJbWFnZXNbZ2FsbGVyeVBvc2l0aW9uXS5vbmxvYWQgPSBmdW5jdGlvbigpIHtcblx0XHRcdGdhbGxlcnlPcGVuICYmIGNoYW5nZUdhbGxlcnlJbWFnZShtb3ZlbWVudClcblx0XHR9XG5cdFx0Ly8gaWYgZXJyb3IsIHN0b3JlIGVycm9yIG9iamVjdCBpbiBlbCBhcnJheVxuXHRcdHByZWxvYWRlZEltYWdlc1tnYWxsZXJ5UG9zaXRpb25dLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcblx0XHRcdGdhbGxlcnlFbHNbZ2FsbGVyeVBvc2l0aW9uXSA9IHtcblx0XHRcdFx0ZXJyb3I6ICdFcnJvciBsb2FkaW5nIGltYWdlJ1xuXHRcdFx0fVxuXHRcdFx0Z2FsbGVyeU9wZW4gJiYgY2hhbmdlR2FsbGVyeUltYWdlKG1vdmVtZW50KVxuXHRcdH1cblx0fVxuXG5cdGZ1bmN0aW9uIGNoYW5nZUdhbGxlcnlJbWFnZShtb3ZlbWVudCkge1xuXHRcdGlmIChpc0xvYWRpbmcpIHtcblx0XHRcdGNvbnRhaW5lcltyZW1vdmVFbF0obG9hZGluZ0ljb24pXG5cdFx0XHRpc0xvYWRpbmcgPSBmYWxzZVxuXHRcdH1cblx0XHR2YXIgYWN0aXZlRWwgPSBnYWxsZXJ5RWxzW2dhbGxlcnlQb3NpdGlvbl1cblx0XHRpZiAoYWN0aXZlRWwuZXJyb3IpIHtcblx0XHRcdC8vIHNob3cgYWxlcnQgaWYgZXJyb3Jcblx0XHRcdGFsZXJ0KGFjdGl2ZUVsLmVycm9yKVxuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBhZGQgbmV3IGltYWdlLCBhbmltYXRlIGltYWdlcyBpbiBhbmQgb3V0IHcvIGNzcyBhbmltYXRpb25cblx0XHRcdHZhciBvbGRpbWcgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignaW1nOmxhc3Qtb2YtdHlwZScpXG5cdFx0XHRkaXNwbGF5SW1hZ2UgPSBkaXNwbGF5RWxlbWVudCA9IHByZWxvYWRlZEltYWdlc1tnYWxsZXJ5UG9zaXRpb25dXG5cdFx0XHRjaGFuZ2VDU1MoZGlzcGxheUltYWdlLCAnYW5pbWF0aW9uOicgKyAobW92ZW1lbnQgPiAwID8gJ2JwZmwnIDogJ2JwZnInKSArICcgLjM1czt0cmFuc2l0aW9uOnRyYW5zZm9ybSAuMzVzJylcblx0XHRcdGNoYW5nZUNTUyhvbGRpbWcsICdhbmltYXRpb246JyArIChtb3ZlbWVudCA+IDAgPyAnYnBmb2wnIDogJ2JwZm9yJykgKyAnIC4zNXMgYm90aCcpXG5cdFx0XHRjb250YWluZXJbYXBwZW5kRWxdKGRpc3BsYXlJbWFnZSlcblx0XHRcdC8vIHVwZGF0ZSBlbCBmb3IgY2xvc2luZyBhbmltYXRpb25cblx0XHRcdGlmIChhY3RpdmVFbC5lbCkge1xuXHRcdFx0XHRlbCA9IGFjdGl2ZUVsLmVsXG5cdFx0XHR9XG5cdFx0fVxuXHRcdC8vIHVwZGF0ZSBjb3VudGVyXG5cdFx0Z2FsbGVyeUNvdW50ZXJbaHRtbElubmVyXSA9IGdhbGxlcnlQb3NpdGlvbiArIDEgKyAnLycgKyBnYWxsZXJ5RWxzLmxlbmd0aFxuXHRcdC8vIHNob3cgLyBoaWRlIGNhcHRpb25cblx0XHR0b2dnbGVDYXB0aW9uKGdhbGxlcnlFbHNbZ2FsbGVyeVBvc2l0aW9uXS5jYXB0aW9uKVxuXHR9XG5cblx0Ly8gY3JlYXRlIHZpZGVvIGlmcmFtZVxuXHRmdW5jdGlvbiBjcmVhdGVJZnJhbWUoKSB7XG5cdFx0dmFyIHVybDtcblx0XHR2YXIgcHJlZml4ID0gJ2h0dHBzOi8vJztcblx0XHR2YXIgc3VmZml4ID0gJ2F1dG9wbGF5PTEnO1xuXG5cdFx0Ly8gY3JlYXRlIGFwcHJvcHJpYXRlIHVybFxuXHRcdGlmIChvcHRzLnl0U3JjKSB7XG5cdFx0XHR1cmwgPSBwcmVmaXggKyAnd3d3LnlvdXR1YmUuY29tL2VtYmVkLycgKyBzaXRlVmlkSUQgKyAnP2h0bWw1PTEmcmVsPTAmcGxheXNpbmxpbmU9MSYnICsgc3VmZml4O1xuXHRcdH0gZWxzZSBpZiAob3B0cy52aW1lb1NyYykge1xuXHRcdFx0dXJsID0gcHJlZml4ICsgJ3BsYXllci52aW1lby5jb20vdmlkZW8vJyArIHNpdGVWaWRJRCArICc/JyArIHN1ZmZpeDtcblx0XHR9IGVsc2UgaWYgKG9wdHMuaWZyYW1lU3JjKSB7XG5cdFx0XHR1cmwgPSBvcHRzLmlmcmFtZVNyYztcblx0XHR9XG5cblx0XHQvLyBzZXQgaWZyYW1lIHNyYyB0byB1cmxcblx0XHRpZnJhbWVTaXRlVmlkLnNyYyA9IHVybDtcblx0fVxuXG5cdC8vIHRpbWVvdXQgdG8gY2hlY2sgdmlkZW8gc3RhdHVzIHdoaWxlIGxvYWRpbmdcblx0ZnVuY3Rpb24gY2hlY2tNZWRpYShlcnJNc2cpIHtcblx0XHRpZiAoflsxLCA0XS5pbmRleE9mKGRpc3BsYXlFbGVtZW50LnJlYWR5U3RhdGUpKSB7XG5cdFx0XHRvcGVuKClcblx0XHRcdC8vIHNob3J0IHRpbWVvdXQgdG8gdG8gbWFrZSBzdXJlIGNvbnRyb2xzIHNob3cgaW4gc2FmYXJpIDExXG5cdFx0XHR0aW1lb3V0KGZ1bmN0aW9uKCl7XG5cdFx0XHRcdGRpc3BsYXlFbGVtZW50LnBsYXkoKVxuXHRcdFx0fSwgOTkpXG5cdFx0fVxuXHRcdGVsc2UgaWYgKGRpc3BsYXlFbGVtZW50LmVycm9yKSBvcGVuKGVyck1zZylcblx0XHRlbHNlIGNoZWNrTWVkaWFUaW1lb3V0ID0gdGltZW91dChjaGVja01lZGlhLCAzNSwgZXJyTXNnKVxuXHR9XG5cblx0Ly8gaGlkZSAvIHNob3cgbG9hZGluZyBpY29uXG5cdGZ1bmN0aW9uIHRvZ2dsZUxvYWRpbmdJY29uKGJvb2wpIHtcblx0XHQvLyBkb24ndCBzaG93IGxvYWRpbmcgaWNvbiBpZiBub0xvYWRlciBpcyBzcGVjaWZpZWRcblx0XHRpZiAob3B0cy5ub0xvYWRlcikgcmV0dXJuXG5cdFx0Ly8gYm9vbCBpcyB0cnVlIGlmIHdlIHdhbnQgdG8gc2hvdyBpY29uLCBmYWxzZSBpZiB3ZSB3YW50IHRvIHJlbW92ZVxuXHRcdC8vIGNoYW5nZSBzdHlsZSB0byBtYXRjaCB0cmlnZ2VyIGVsZW1lbnQgZGltZW5zaW9ucyBpZiB3ZSB3YW50IHRvIHNob3dcblx0XHRib29sICYmXG5cdFx0XHRjaGFuZ2VDU1MoXG5cdFx0XHRcdGxvYWRpbmdJY29uLFxuXHRcdFx0XHQndG9wOicgK1xuXHRcdFx0XHRcdGVsLm9mZnNldFRvcCArXG5cdFx0XHRcdFx0J3B4O2xlZnQ6JyArXG5cdFx0XHRcdFx0ZWwub2Zmc2V0TGVmdCArXG5cdFx0XHRcdFx0J3B4O2hlaWdodDonICtcblx0XHRcdFx0XHRlbFtjSGVpZ2h0XSArXG5cdFx0XHRcdFx0J3B4O3dpZHRoOicgK1xuXHRcdFx0XHRcdGVsW2NXaWR0aF0gK1xuXHRcdFx0XHRcdCdweCdcblx0XHRcdClcblx0XHQvLyBhZGQgb3IgcmVtb3ZlIGxvYWRlciBmcm9tIERPTVxuXHRcdGVsLnBhcmVudEVsZW1lbnRbYm9vbCA/IGFwcGVuZEVsIDogcmVtb3ZlRWxdKGxvYWRpbmdJY29uKVxuXHRcdGlzTG9hZGluZyA9IGJvb2xcblx0fVxuXG5cdC8vIGhpZGUgJiBzaG93IGNhcHRpb25cblx0ZnVuY3Rpb24gdG9nZ2xlQ2FwdGlvbihjYXB0aW9uQ29udGVudCkge1xuXHRcdGlmIChjYXB0aW9uQ29udGVudCkge1xuXHRcdFx0Y2FwdGlvblRleHRbaHRtbElubmVyXSA9IGNhcHRpb25Db250ZW50XG5cdFx0fVxuXHRcdGNoYW5nZUNTUyhcblx0XHRcdGNhcHRpb24sXG5cdFx0XHQnb3BhY2l0eTonICsgKGNhcHRpb25Db250ZW50ID8gJzE7JyArIHBvaW50ZXJFdmVudHNBdXRvIDogJzAnKVxuXHRcdClcblx0fVxuXG5cdGZ1bmN0aW9uIGFkZFRvSW1nQ2FjaGUodXJsKSB7XG5cdFx0IX5pbWdDYWNoZS5pbmRleE9mKHVybCkgJiYgaW1nQ2FjaGUucHVzaCh1cmwpXG5cdH1cblxuXHQvLyBhbmltYXRlIG9wZW4gb2YgaW1hZ2UgLyB2aWRlbzsgZGlzcGxheSBjYXB0aW9uIGlmIG5lZWRlZFxuXHRmdW5jdGlvbiBvcGVuKGVycikge1xuXHRcdC8vIGhpZGUgbG9hZGluZyBzcGlubmVyXG5cdFx0aXNMb2FkaW5nICYmIHRvZ2dsZUxvYWRpbmdJY29uKClcblxuXHRcdC8vIGV4ZWN1dGUgYW5pbWF0aW9uU3RhcnQgY2FsbGJhY2tcblx0XHRhbmltYXRpb25TdGFydCAmJiBhbmltYXRpb25TdGFydCgpXG5cblx0XHQvLyBjaGVjayBpZiB3ZSBoYXZlIGFuIGVycm9yIHN0cmluZyBpbnN0ZWFkIG9mIG5vcm1hbCBldmVudFxuXHRcdGlmICh0eXBlb2YgZXJyID09PSAnc3RyaW5nJykge1xuXHRcdFx0cmVtb3ZlQ29udGFpbmVyKClcblx0XHRcdHJldHVybiBvcHRzLm9uRXJyb3IgPyBvcHRzLm9uRXJyb3IoKSA6IGFsZXJ0KCdFcnJvcjogVGhlIHJlcXVlc3RlZCAnICsgZXJyICsgJyBjb3VsZCBub3QgYmUgbG9hZGVkLicpXG5cdFx0fVxuXG5cdFx0Ly8gaWYgcmVtb3RlIGltYWdlIGlzIGxvYWRlZCwgYWRkIHVybCB0byBpbWdDYWNoZSBhcnJheVxuXHRcdHJlbW90ZUltYWdlICYmIGFkZFRvSW1nQ2FjaGUoaW1nU3JjKVxuXG5cdFx0Ly8gdHJhbnNmb3JtIGRpc3BsYXlFbCB0byBtYXRjaCB0cmlnZ2VyIGVsXG5cdFx0Y2hhbmdlQ1NTKGRpc3BsYXlFbGVtZW50LCBnZXRSZWN0KCkpXG5cblx0XHQvLyBmYWRlIGluIGNvbnRhaW5lclxuXHRcdGNoYW5nZUNTUyhjb250YWluZXIsICdvcGFjaXR5OjE7JyArIHBvaW50ZXJFdmVudHNBdXRvKVxuXG5cdFx0Ly8gc2V0IGFuaW1hdGlvbkVuZCBjYWxsYmFjayB0byBydW4gYWZ0ZXIgYW5pbWF0aW9uIGVuZHMgKGNsZWFyZWQgaWYgY29udGFpbmVyIGNsb3NlZClcblx0XHRhbmltYXRpb25FbmQgPSB0aW1lb3V0KGFuaW1hdGlvbkVuZCwgNDEwKVxuXG5cdFx0aXNPcGVuID0gdHJ1ZVxuXG5cdFx0Z2FsbGVyeU9wZW4gPSAhIWdhbGxlcnlFbHNcblxuXHRcdC8vIGVubGFyZ2UgZGlzcGxheUVsLCBmYWRlIGluIGNhcHRpb24gaWYgaGFzQ2FwdGlvblxuXHRcdHRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHRjaGFuZ2VDU1MoZGlzcGxheUVsZW1lbnQsICd0cmFuc2l0aW9uOnRyYW5zZm9ybSAuMzVzO3RyYW5zZm9ybTpub25lJylcblx0XHRcdGNhcHRpb25Db250ZW50ICYmIHRpbWVvdXQodG9nZ2xlQ2FwdGlvbiwgMjUwLCBjYXB0aW9uQ29udGVudClcblx0XHR9LCA2MClcblx0fVxuXG5cdC8vIGNsb3NlIGFjdGl2ZSBkaXNwbGF5IGVsZW1lbnRcblx0ZnVuY3Rpb24gY2xvc2UoZSkge1xuXHRcdHZhciB0YXJnZXQgPSBlLnRhcmdldFxuXHRcdHZhciBjbGlja0VscyA9IFtcblx0XHRcdGNhcHRpb24sXG5cdFx0XHRjYXB0aW9uSGlkZUJ1dHRvbixcblx0XHRcdGRpc3BsYXlWaWRlbyxcblx0XHRcdGRpc3BsYXlBdWRpbyxcblx0XHRcdGNhcHRpb25UZXh0LFxuXHRcdFx0bGVmdEFycm93QnRuLFxuXHRcdFx0cmlnaHRBcnJvd0J0bixcblx0XHRcdGxvYWRpbmdJY29uXG5cdFx0XVxuXG5cdFx0Ly8gYmx1ciB0byBoaWRlIGNsb3NlIGJ1dHRvbiBmb2N1cyBzdHlsZVxuXHRcdHRhcmdldCAmJiB0YXJnZXQuYmx1cigpXG5cblx0XHQvLyBkb24ndCBjbG9zZSBpZiBvbmUgb2YgdGhlIGNsaWNrRWxzIHdhcyBjbGlja2VkIG9yIGNvbnRhaW5lciBpcyBhbHJlYWR5IGNsb3Npbmdcblx0XHRpZiAoaXNDbG9zaW5nIHx8IH5jbGlja0Vscy5pbmRleE9mKHRhcmdldCkpIHtcblx0XHRcdHJldHVyblxuXHRcdH1cblxuXHRcdC8vIGFuaW1hdGUgY2xvc2luZ1xuXHRcdGRpc3BsYXlFbGVtZW50LnN0eWxlLmNzc1RleHQgKz0gZ2V0UmVjdCgpXG5cdFx0Y2hhbmdlQ1NTKGNvbnRhaW5lciwgcG9pbnRlckV2ZW50c0F1dG8pXG5cblx0XHQvLyB0aW1lb3V0IHRvIHJlbW92ZSBlbHMgZnJvbSBkb207IHVzZSB2YXJpYWJsZSB0byBhdm9pZCBjYWxsaW5nIG1vcmUgdGhhbiBvbmNlXG5cdFx0dGltZW91dChyZW1vdmVDb250YWluZXIsIDM1MClcblxuXHRcdC8vIGNsZWFyIGFuaW1hdGlvbkVuZCB0aW1lb3V0XG5cdFx0Y2xlYXJUaW1lb3V0KGFuaW1hdGlvbkVuZClcblxuXHRcdGlzT3BlbiA9IGZhbHNlXG5cdFx0aXNDbG9zaW5nID0gdHJ1ZVxuXHR9XG5cblx0Ly8gcmVtb3ZlIGNvbnRhaW5lciAvIGRpc3BsYXkgZWxlbWVudCBmcm9tIHRoZSBET01cblx0ZnVuY3Rpb24gcmVtb3ZlQ29udGFpbmVyKCkge1xuXHRcdC8vIHJlbW92ZSBjb250YWluZXIgZnJvbSBET00gJiBjbGVhciBpbmxpbmUgc3R5bGVcblx0XHRkb2MuYm9keVtyZW1vdmVFbF0oY29udGFpbmVyKVxuXHRcdGNvbnRhaW5lcltyZW1vdmVFbF0oZGlzcGxheUVsZW1lbnQpXG5cdFx0Y2hhbmdlQ1NTKGNvbnRhaW5lciwgJycpXG5cblx0XHQvLyBjbGVhciBzcmMgb2YgZGlzcGxheUVsZW1lbnQgKG9yIGlmcmFtZSBpZiBkaXNwbGF5IGVsIGlzIGlmcmFtZSBjb250YWluZXIpXG5cdFx0OyhkaXNwbGF5RWxlbWVudCA9PT0gaWZyYW1lQ29udGFpbmVyXG5cdFx0XHQ/IGlmcmFtZVNpdGVWaWRcblx0XHRcdDogZGlzcGxheUVsZW1lbnRcblx0XHQpLnJlbW92ZUF0dHJpYnV0ZSgnc3JjJylcblxuXHRcdC8vIHJlbW92ZSBjYXB0aW9uXG5cdFx0dG9nZ2xlQ2FwdGlvbihmYWxzZSlcblxuXHRcdGlmIChnYWxsZXJ5T3Blbikge1xuXHRcdFx0Ly8gcmVtb3ZlIGFsbCBnYWxsZXJ5IHN0dWZmXG5cdFx0XHR2YXIgaW1hZ2VzID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJ2ltZycpXG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGltYWdlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRjb250YWluZXJbcmVtb3ZlRWxdKGltYWdlc1tpXSlcblx0XHRcdH1cblx0XHRcdGlzTG9hZGluZyAmJiBjb250YWluZXJbcmVtb3ZlRWxdKGxvYWRpbmdJY29uKVxuXHRcdFx0Y29udGFpbmVyW3JlbW92ZUVsXShnYWxsZXJ5Q291bnRlcilcblx0XHRcdGdhbGxlcnlPcGVuID0gZ2FsbGVyeUVscyA9IGZhbHNlXG5cdFx0XHRwcmVsb2FkZWRJbWFnZXMgPSB7fVxuXHRcdFx0c3VwcG9ydHNUb3VjaCB8fCBjb250YWluZXJbcmVtb3ZlRWxdKHJpZ2h0QXJyb3dCdG4pXG5cdFx0XHRzdXBwb3J0c1RvdWNoIHx8IGNvbnRhaW5lcltyZW1vdmVFbF0obGVmdEFycm93QnRuKVxuXHRcdFx0Ly8gaW4gY2FzZSBkaXNwbGF5aW1hZ2UgY2hhbmdlZCwgd2UgbmVlZCB0byB1cGRhdGUgZXZlbnQgbGlzdGVuZXJzXG5cdFx0XHRkaXNwbGF5SW1hZ2Uub25sb2FkID0gb3BlblxuXHRcdFx0ZGlzcGxheUltYWdlLm9uZXJyb3IgPSBvcGVuLmJpbmQobnVsbCwgJ2ltYWdlJylcblx0XHR9XG5cblx0XHQvLyBydW4gY2xvc2UgY2FsbGJhY2tcblx0XHRvcHRzLm9uQ2xvc2UgJiYgb3B0cy5vbkNsb3NlKClcblxuXHRcdGlzQ2xvc2luZyA9IGlzTG9hZGluZyA9IGZhbHNlXG5cdH1cblxuXHQvLyBzdHlsZSBoZWxwZXIgZnVuY3Rpb25zXG5cdGZ1bmN0aW9uIGNoYW5nZUNTUyhlbGVtZW50LCBuZXdTdHlsZSkge1xuXHRcdGVsZW1lbnQuc3R5bGUuY3NzVGV4dCA9IG5ld1N0eWxlXG5cdH1cbn0pKClcbiIsImltcG9ydCAnLi9zY3JlZW5zL21haW4vbWFpbic7XHJcbmltcG9ydCAnLi9zY3JlZW5zL2Fib3V0VVMvYWJvdXRVcyc7XHJcbmltcG9ydCAnLi9zY3JlZW5zL2xpc3QvbGlzdCc7XHJcbiIsImV4cG9ydCBkZWZhdWx0IGBcclxuPGRpdiBjbGFzcz1cImxpc3RzLWNvbnRhaW5lclwiPlxyXG4gIDxpbWcgc3JjPScuL2Fzc2V0cy9kZXZlbG9wZXIvZGV2cy5wbmcnIGNsYXNzPSdsb2dvdHlwZSc+XHJcbiAgPG1haW4gY2xhc3MgPSAndXNlci1jb250YWluZXInPlxyXG4gICAgPGEgY2xhc3MgPSBcImNsb3NlXCI+ICYjMTAwMDY7PC9hPlxyXG4gICAgPHNlY3Rpb24gY2xhc3M9XCJ1c2VyLWNvbnRlbnRcIj5cclxuICAgICAgICA8aDM+TmljayBMZXZrb3ZpY2g8L2gzPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ1c2VyLWNhcmRcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3MgPSBcInVzZXItZm90b1wiPjwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzcyA9IFwidXNlci1pbmZvXCI+XHJcbiAgICAgICAgICAgIDxoND5KdW5pb3IgRnJvbnQtZW5kIERldmVsb3BlcjwvaDQ+XHJcbiAgICAgICAgICAgIDxwIGNsYXNzID0gXCJ1c2VyLXRleHRcIj5Mb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdGV0dXIgYWRpcGlzaWNpbmcgZWxpdCwgc2VkIGRvIGVpdXNtb2QgdGVtcG9yIGluY2lkaWR1bnTCuzwvcD5cclxuICAgICAgICAgICAgPHAgY2xhc3MgPSBcInVzZXItc29jaWFsXCI+XHJcbiAgICAgICAgICAgICAgPGEgaHJlZj1cIlwiIGNsYXNzPVwibGluay1zb2NpYWxcIj48c3Bhbj48L3NwYW4+PC9hPlxyXG4gICAgICAgICAgICAgIDxhIGhyZWY9XCJcIiBjbGFzcz1cImxpbmstc29jaWFsXCI+PHNwYW4+PC9zcGFuPjwvYT5cclxuICAgICAgICAgICAgICA8YSBocmVmPVwiXCIgY2xhc3M9XCJsaW5rLXNvY2lhbFwiPjxzcGFuPjwvc3Bhbj48L2E+XHJcbiAgICAgICAgICAgICAgPGEgaHJlZj1cIlwiIGNsYXNzPVwibGluay1zb2NpYWxcIj48c3Bhbj48L3NwYW4+PC9hPlxyXG4gICAgICAgICAgICAgIDxhIGhyZWY9XCJcIiBjbGFzcz1cImxpbmstc29jaWFsXCI+PHNwYW4+PC9zcGFuPjwvYT5cclxuICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvc2VjdGlvbj5cclxuICAgICAgPHNlY3Rpb24gY2xhc3M9XCJ1c2VyLWNvbnRlbnRcIj5cclxuICAgICAgICA8aDM+S2F0c2lhcnluYSBNYWthcmVua2E8L2gzPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ1c2VyLWNhcmRcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3MgPSBcInVzZXItZm90b1wiPjwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzcyA9IFwidXNlci1pbmZvXCI+XHJcbiAgICAgICAgICAgIDxoND5KdW5pb3IgRnJvbnQtZW5kIERldmVsb3BlcjwvaDQ+XHJcbiAgICAgICAgICAgIDxwIGNsYXNzID0gXCJ1c2VyLXRleHRcIj5Mb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdGV0dXIgYWRpcGlzaWNpbmcgZWxpdCwgc2VkIGRvIGVpdXNtb2QgdGVtcG9yIGluY2lkaWR1bnTCuzwvcD5cclxuICAgICAgICAgICAgPHAgY2xhc3MgPSBcInVzZXItc29jaWFsXCI+XHJcbiAgICAgICAgICAgICAgPGEgaHJlZj1cIlwiIGNsYXNzPVwibGluay1zb2NpYWxcIj48c3Bhbj48L3NwYW4+PC9hPlxyXG4gICAgICAgICAgICAgIDxhIGhyZWY9XCJcIiBjbGFzcz1cImxpbmstc29jaWFsXCI+PHNwYW4+PC9zcGFuPjwvYT5cclxuICAgICAgICAgICAgICA8YSBocmVmPVwiXCIgY2xhc3M9XCJsaW5rLXNvY2lhbFwiPjxzcGFuPjwvc3Bhbj48L2E+XHJcbiAgICAgICAgICAgICAgPGEgaHJlZj1cIlwiIGNsYXNzPVwibGluay1zb2NpYWxcIj48c3Bhbj48L3NwYW4+PC9hPlxyXG4gICAgICAgICAgICAgIDxhIGhyZWY9XCJcIiBjbGFzcz1cImxpbmstc29jaWFsXCI+PHNwYW4+PC9zcGFuPjwvYT5cclxuICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvc2VjdGlvbj5cclxuICAgICAgPHNlY3Rpb24gY2xhc3M9XCJ1c2VyLWNvbnRlbnRcIj5cclxuICAgICAgICA8aDM+S2lyeWwgS2lyZXlldTwvaDM+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInVzZXItY2FyZFwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcyA9IFwidXNlci1mb3RvXCI+PC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzID0gXCJ1c2VyLWluZm9cIj5cclxuICAgICAgICAgICAgPGg0Pkp1bmlvciBGcm9udC1lbmQgRGV2ZWxvcGVyPC9oND5cclxuICAgICAgICAgICAgPHAgY2xhc3MgPSBcInVzZXItdGV4dFwiPkxvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LCBzZWQgZG8gZWl1c21vZCB0ZW1wb3IgaW5jaWRpZHVudMK7PC9wPlxyXG4gICAgICAgICAgICA8cCBjbGFzcyA9IFwidXNlci1zb2NpYWxcIj5cclxuICAgICAgICAgICAgICA8YSBocmVmPVwiXCIgY2xhc3M9XCJsaW5rLXNvY2lhbFwiPjxzcGFuPjwvc3Bhbj48L2E+XHJcbiAgICAgICAgICAgICAgPGEgaHJlZj1cIlwiIGNsYXNzPVwibGluay1zb2NpYWxcIj48c3Bhbj48L3NwYW4+PC9hPlxyXG4gICAgICAgICAgICAgIDxhIGhyZWY9XCJcIiBjbGFzcz1cImxpbmstc29jaWFsXCI+PHNwYW4+PC9zcGFuPjwvYT5cclxuICAgICAgICAgICAgICA8YSBocmVmPVwiXCIgY2xhc3M9XCJsaW5rLXNvY2lhbFwiPjxzcGFuPjwvc3Bhbj48L2E+XHJcbiAgICAgICAgICAgICAgPGEgaHJlZj1cIlwiIGNsYXNzPVwibGluay1zb2NpYWxcIj48c3Bhbj48L3NwYW4+PC9hPlxyXG4gICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9zZWN0aW9uPlxyXG4gIDwvbWFpbj5cclxuPC9kaXY+XHJcbmAiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpbiIsImltcG9ydCB7ICQkLCBhZGRDbGFzcywgaW5uZXIsIHNsZWVwIH0gZnJvbSAnLi4vLi4vdXRpbHMnO1xyXG5pbXBvcnQgdGVtcGxhdGUgZnJvbSAnLi9hYm91dC50ZW1wbGF0ZSc7XHJcbmltcG9ydCAnLi9hYm91dFVzLmNzcyc7XHJcblxyXG4kJCgnYm9keScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XHJcbiAgY29uc3QgZWwgPSBlLnRhcmdldDtcclxuICBjb25zdCBlbENsYXNzID0gZWwuZ2V0QXR0cmlidXRlKCdjbGFzcycpO1xyXG4gIGlmIChlbENsYXNzID09PSAnYWJvdXRVcycpIHtcclxuICAgIGFkZENsYXNzKCQkKCcubG9nbycpLCAnbG9nby1hbmltLXRvLXRvcCcpO1xyXG4gICAgc2xlZXAoMjAwKS50aGVuKCgpID0+IHtcclxuICAgICAgJCQoJ2JvZHknKS5pbm5lckhUTUwgPSAnJztcclxuICAgICAgaW5uZXIoJCQoJ2JvZHknKSwgdGVtcGxhdGUpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59KTsiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpbiIsImltcG9ydCBCaWdQaWN0dXJlIGZyb20gJ2JpZ3BpY3R1cmUnO1xyXG5pbXBvcnQgeyAkJCwgYWRkQ2xhc3MsIGlubmVyLCBzbGVlcCB9IGZyb20gJy4uLy4uL3V0aWxzJztcclxuaW1wb3J0IHRlbXBsYXRlIGZyb20gJy4vbGlzdC50ZW1wbGF0ZSc7XHJcbmltcG9ydCB0ZW1wbGF0ZU1haW4gZnJvbSAnLi4vbWFpbi9tYWluLnRlbXBsYXRlJztcclxuaW1wb3J0ICcuL2xpc3QuY3NzJztcclxuaW1wb3J0IHsgYWRkUG9ldHNMaW5rcyB9IGZyb20gJy4uL3BvZXRzL3BvZXRzJztcclxuXHJcbiQkKCdib2R5JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcclxuICBjb25zdCBlbCA9IGUudGFyZ2V0O1xyXG4gIGNvbnN0IGVsQ2xhc3MgPSBlbC5nZXRBdHRyaWJ1dGUoJ2NsYXNzJyk7XHJcbiAgaWYgKGVsQ2xhc3MgPT09ICdjbG9zZScpIHtcclxuICAgIGFkZENsYXNzKCQkKCcubG9nb3R5cGUnKSwgJ2xvZ28tYW5pbS10by1ib3R0b20nKTtcclxuICAgIHNsZWVwKDIwMCkudGhlbigoKSA9PiB7XHJcbiAgICAgICQkKCdib2R5JykuaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgIGlubmVyKCQkKCdib2R5JyksIHRlbXBsYXRlTWFpbik7XHJcbiAgICB9KTtcclxuICB9XHJcbiAgaWYgKGVsQ2xhc3MgPT09ICdsaXN0LXBvZXRzJyB8fCBlbENsYXNzID09PSAnbWFpbi1idXR0b24gbGVmdCcpIHtcclxuICAgIGFkZENsYXNzKCQkKCcubG9nbycpLCAnbG9nby1hbmltLXRvLXRvcCcpO1xyXG4gICAgc2xlZXAoMjAwKS50aGVuKCgpID0+IHtcclxuICAgICAgJCQoJ2JvZHknKS5pbm5lckhUTUwgPSAnJztcclxuICAgICAgaW5uZXIoJCQoJ2JvZHknKSwgdGVtcGxhdGUpO1xyXG4gICAgICBhZGRQb2V0c0xpbmtzKCk7XHJcbiAgICB9KTtcclxuICB9XHJcbiAgaWYgKGVsQ2xhc3MgPT09ICd5b3V0dWJlJykge1xyXG4gICAgQmlnUGljdHVyZSh7XHJcbiAgICAgIGVsOiBlLnRhcmdldCxcclxuICAgICAgeXRTcmM6IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgneXRzcmMnKSxcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgaWYgKGVsQ2xhc3MgPT09ICdpbWFnZV9jb250YWluZXJfaXRlbScpIHtcclxuICAgIEJpZ1BpY3R1cmUoe1xyXG4gICAgICBlbDogZS50YXJnZXQsXHJcbiAgICAgIGdhbGxlcnk6ICcjaW1hZ2VfY29udGFpbmVyJyxcclxuICAgIH0pXHJcbiAgfVxyXG59KTsiLCJleHBvcnQgZGVmYXVsdCBgXHJcbjxkaXYgY2xhc3M9XCJsaXN0cy1jb250YWluZXJcIj5cclxuICA8aW1nIHNyYz0nLi9hc3NldHMvbG9nby9sb2dvLnBuZycgY2xhc3M9XCJsb2dvdHlwZVwiPjwvZGl2PlxyXG4gIDxtYWluIGNsYXNzID0gJ2NvbnRlbnQnPlxyXG4gIDxhIGNsYXNzID0gXCJjbG9zZVwiPiAmIzEwMDA2OzwvYT5cclxuICA8c2VjdGlvbiBjbGFzcyA9ICdsaXN0Jz5cclxuICAgICAgPGgzPtCRPC9oMz5cclxuICAgICAgPHVsIGNsYXNzPVwiZmlyc3RcIj5cclxuICAgICAgICA8bGk+PGEgaHJlZj1cIiNcIiBjbGFzcz1cInBvZXRzLW5hbWVcIiBkYXRhLW5hbWU9XCJicm92a2FcIiA+0J/QtdGC0YDRg9GB0Ywg0JHRgNC+0LLQutCwPC9hPjwvbGk+XHJcbiAgICAgIDwvdWw+XHJcbiAgICA8L3NlY3Rpb24+XHJcbiAgICA8c2VjdGlvbiBjbGFzcyA9ICdsaXN0Jz5cclxuICAgICAgPGgzPtCUPC9oMz5cclxuICAgICAgPHVsIGNsYXNzPVwiZmlyc3RcIj5cclxuICAgICAgICA8bGk+PGEgaHJlZj1cIiNcIiBjbGFzcz1cInBvZXRzLW5hbWVcIiBkYXRhLW5hbWU9XCJkdW5pblwiPtCS0LjQutC10L3RgtC40Lkg0JTRg9C90LjQvS3QnNCw0YDRhtC40L3QutC10LLQuNGHPC9hPjwvbGk+XHJcbiAgICAgIDwvdWw+XHJcbiAgICA8L3NlY3Rpb24+XHJcbiAgICA8c2VjdGlvbiBjbGFzcyA9ICdsaXN0Jz5cclxuICAgICAgPGgzPtCaPC9oMz5cclxuICAgICAgPHVsIGNsYXNzPVwiZmlyc3RcIj5cclxuICAgICAgICA8bGk+PGEgaHJlZj1cIiNcIiBjbGFzcz1cInBvZXRzLW5hbWVcIiBkYXRhLW5hbWU9XCJrb3JvdGtldmljaFwiPtCS0LvQsNC00LjQvNC40YAg0JrQvtGA0L7RgtC60LXQstC40Yc8L2E+PC9saT5cclxuICAgICAgICA8bGk+PGEgaHJlZj1cIiNcIiBjbGFzcz1cInBvZXRzLW5hbWVcIiBkYXRhLW5hbWU9XCJrb2xhc1wiPtCv0LrRg9CxINCa0L7Qu9Cw0YE8L2E+PC9saT5cclxuICAgICAgICA8bGk+PGEgaHJlZj1cIiNcIiBjbGFzcz1cInBvZXRzLW5hbWVcIiBkYXRhLW5hbWU9XCJrdXBhbGFcIj7Qr9C90LrQsCDQmtGD0L/QsNC70LA8L2E+PC9saT5cclxuICAgICAgPC91bD5cclxuICAgIDwvc2VjdGlvbj5cclxuICAgIDxzZWN0aW9uIGNsYXNzID0gJ2xpc3QnPlxyXG4gICAgPGgzPtCbPC9oMz5cclxuICAgIDx1bCBjbGFzcz1cImZpcnN0XCI+XHJcbiAgICAgIDxsaT48YSBocmVmPVwiI1wiIGNsYXNzPVwicG9ldHMtbmFtZVwiIGRhdGEtbmFtZT1cImx1Y2hpbmFcIj7Qr9C90LrQsCDQm9GD0YfQuNC90LA8L2E+PC9saT5cclxuICAgIDwvdWw+XHJcbiAgICA8L3NlY3Rpb24+XHJcbiAgICA8c2VjdGlvbiBjbGFzcyA9ICdsaXN0Jz5cclxuICAgICAgPGgzPtCiPC9oMz5cclxuICAgICAgPHVsIGNsYXNzPVwiZmlyc3RcIj5cclxuICAgICAgICA8bGk+PGEgaHJlZj1cIiNcIiBjbGFzcz1cInBvZXRzLW5hbWVcIiBkYXRhLW5hbWU9XCJ0YW5rXCI+0JzQsNC60YHQuNC8INCi0LDQvdC6PC9hPjwvbGk+XHJcbiAgICAgIDwvdWw+XHJcbiAgICA8L3NlY3Rpb24+XHJcbiAgPC9tYWluPlxyXG48L2Rpdj5cclxuYCIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luIiwiaW1wb3J0IHsgJCQsIGlubmVyLCByZW1vdmUsIHNsZWVwIH0gZnJvbSAnLi4vLi4vdXRpbHMnO1xyXG5pbXBvcnQgdGVtcGxhdGUgZnJvbSAnLi9tYWluLnRlbXBsYXRlJztcclxuaW1wb3J0ICcuL21haW4uY3NzJztcclxuXHJcbmNvbnN0IHBvZXRzU2VhcmNoID0gW1sn0J/QtdGC0YDRg9GB0Ywg0JHRgNC+0LLQutCwJywgJ2Jyb3ZrYSddLCBbJ9CS0LjQutC10L3RgtC40Lkg0JTRg9C90LjQvS3QnNCw0YDRhtC40L3QutC10LLQuNGHJywgJ2R1bmluJ10sIFsn0JLQu9Cw0LTQuNC80LjRgCDQmtC+0YDQvtGC0LrQtdCy0LjRhycsICdrb3JvdGtldmljaCddLCBbJ9Cv0LrRg9CxINCa0L7Qu9Cw0YEnLCAna29sYXMnXSwgWyfQr9C90LrQsCDQmtGD0L/QsNC70LAnLCAna3VwYWxhJ10sIFsn0K/QvdC60LAg0JvRg9GH0LjQvdCwJywgJ2x1Y2hpbmEnXSwgWyfQnNCw0LrRgdC40Lwg0KLQsNC90LonLCAndGFuayddXVxyXG5cclxuaW5uZXIoJCQoJ2JvZHknKSwgdGVtcGxhdGUpO1xyXG5cclxuY29uc3QgcmVwZWF0ID0gZnVuY3Rpb24gcmVwZWF0KCkge1xyXG4gIHNsZWVwKDIwMCkudGhlbigoKSA9PiB7XHJcbiAgJCQoJy5hdXRvY29tcGxpdGUgdWwnKS5pbm5lckhUTUwgPSAnJztcclxuICBwb2V0c1NlYXJjaC5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgaWYgKGVsZW1lbnRbMF0udG9VcHBlckNhc2UoKS5pbmNsdWRlcygkJCgnLnNlYXJjaC1zdHJpbmcnKS52YWx1ZS50b1VwcGVyQ2FzZSgpKSkge1xyXG4gICAgICBpbm5lcigkJCgnLmF1dG9jb21wbGl0ZSB1bCcpLCBgPGxpPjxhIGRhdGEtbmFtZT0nJHtlbGVtZW50WzFdfSc+JHtlbGVtZW50WzBdfTwvYT48L2xpPmApXHJcbiAgICB9XHJcbiAgfSk7XHJcbiAgfSk7XHJcbn1cclxuXHJcbmxldCBjaGVja2luZ0ludGVydmFsID0gbnVsbDtcclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PiB7XHJcbiAgaWYgKGV2ZW50LnRhcmdldCA9PT0gJCQoJy5zZWFyY2gtc3RyaW5nJykpIHtcclxuICAgICQkKCcuc2VhcmNoLXBpYycpLnN0eWxlLm9wYWNpdHkgPSAnMSc7XHJcbiAgICAkJCgnLnNlYXJjaC1waWMnKS5zdHlsZS56SW5kZXggPSAnMCc7XHJcbiAgICBzbGVlcCg4MDApLnRoZW4oKCkgPT4ge1xyXG4gICAgICBjaGVja2luZ0ludGVydmFsID0gc2V0SW50ZXJ2YWwocmVwZWF0LCAxMDApO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59KTtcclxubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2N1cnJMYW5nJywgJ2VuZycpO1xyXG5cclxuXHJcbiQkKCcuc2VhcmNoLXN0cmluZycpLm9uYmx1ciA9ICgpID0+IHtcclxuICAkJCgnLnNlYXJjaC1waWMnKS5zdHlsZS56SW5kZXggPSAnLTgnO1xyXG4gICQkKCcuc2VhcmNoLXBpYycpLnN0eWxlLm9wYWNpdHkgPSAnMCc7XHJcbiAgJCQoJy5zZWFyY2gtc3RyaW5nJykudmFsdWUgPSAnJztcclxuICBjbGVhckludGVydmFsKGNoZWNraW5nSW50ZXJ2YWwpO1xyXG59XHJcblxyXG4kJCgnLmFjdGl2ZS1sYW5nJykub25jbGljayA9ICgpID0+IHtcclxuICAkJCgnLmxhbmd1YWdlcycpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG59O1xyXG5cclxuJCQoJy5lbmcnKS5vbmNsaWNrID0gZXZlbnQgPT4ge1xyXG4gIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcclxuICByZW1vdmUoJCQoJy5sYW5ndWFnZXMnKSwgJCQoJy5lbmcnKSk7XHJcbiAgJCQoJy5sYW5ndWFnZXMnKS5pbnNlcnRCZWZvcmUodGFyZ2V0LCAkJCgnLmxhbmd1YWdlcyBpbWcnKSk7XHJcbiAgJCQoJy5hY3RpdmUtbGFuZycpLnNyYyA9ICcuL2Fzc2V0cy9FTkcucG5nJztcclxuICAkJCgnLmxhbmd1YWdlcycpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2N1cnJMYW5nJywgJ2VuZycpO1xyXG59O1xyXG5cclxuJCQoJy5iZWwnKS5vbmNsaWNrID0gZXZlbnQgPT4ge1xyXG4gIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcclxuICByZW1vdmUoJCQoJy5sYW5ndWFnZXMnKSwgJCQoJy5iZWwnKSk7XHJcbiAgJCQoJy5sYW5ndWFnZXMnKS5pbnNlcnRCZWZvcmUodGFyZ2V0LCAkJCgnLmxhbmd1YWdlcyBpbWcnKSk7XHJcbiAgJCQoJy5hY3RpdmUtbGFuZycpLnNyYyA9ICcuL2Fzc2V0cy9CRUwucG5nJztcclxuICAkJCgnLmxhbmd1YWdlcycpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2N1cnJMYW5nJywgJ2JlbCcpO1xyXG59O1xyXG5cclxuJCQoJy5ydXMnKS5vbmNsaWNrID0gZXZlbnQgPT4ge1xyXG4gIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcclxuICByZW1vdmUoJCQoJy5sYW5ndWFnZXMnKSwgJCQoJy5ydXMnKSk7XHJcbiAgJCQoJy5sYW5ndWFnZXMnKS5pbnNlcnRCZWZvcmUodGFyZ2V0LCAkJCgnLmxhbmd1YWdlcyBpbWcnKSk7XHJcbiAgJCQoJy5hY3RpdmUtbGFuZycpLnNyYyA9ICcuL2Fzc2V0cy9SVVMucG5nJztcclxuICAkJCgnLmxhbmd1YWdlcycpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2N1cnJMYW5nJywgJ3J1cycpO1xyXG59O1xyXG4kJCgnLmxhbmd1YWdlcycpLm9uY2xpY2sgPSBldmVudCA9PiB7XHJcbiAgaWYgKGV2ZW50LnRhcmdldC5zcmMgIT09ICQkKCcuYWN0aXZlLWxhbmcnKS5zcmMpIHtcclxuICAgIHJlbW92ZSgkJCgnLmxhbmd1YWdlcycpLCBldmVudC50YXJnZXQpO1xyXG4gICAgJCQoJy5sYW5ndWFnZXMnKS5pbnNlcnRCZWZvcmUoZXZlbnQudGFyZ2V0LCAkJCgnLmxhbmd1YWdlcyBpbWcnKSk7XHJcbiAgICAkJCgnLmFjdGl2ZS1sYW5nJykuc3JjID0gZXZlbnQudGFyZ2V0LnNyYztcclxuICAgICQkKCcubGFuZ3VhZ2VzJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICB9IGVsc2UgJCQoJy5sYW5ndWFnZXMnKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG59O1xyXG4iLCJleHBvcnQgZGVmYXVsdCBgXHJcbiAgPGgxPlBvZXRzIG9mIEJlbGFydXM8L2gxPlxyXG4gIDxzZWN0aW9uIGNsYXNzPVwiZmlyc3QtcGFnZVwiPlxyXG4gIDxpbWcgc3JjPVwiLi9hc3NldHMvbGFuZy9FTkcucG5nXCIgYWx0PVwiTGFuZ3VhZ2VcIiBjbGFzcz1cImFjdGl2ZS1sYW5nXCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJsYW5ndWFnZXNcIj5cclxuICAgICAgICA8aW1nIHNyYz1cIi4vYXNzZXRzL2xhbmcvRU5HLnBuZ1wiIGFsdD1cIkVuZ2xpc2ggbGFuZ3VhZ2VcIiBjbGFzcz1cImVuZ1wiPlxyXG4gICAgICAgIDxpbWcgc3JjPVwiLi9hc3NldHMvbGFuZy9CRUwucG5nXCIgYWx0PVwiQmVsYXJ1c3NpYW4gbGFuZ3VhZ2VcIiBjbGFzcz1cImJlbFwiPlxyXG4gICAgICAgIDxpbWcgc3JjPVwiLi9hc3NldHMvbGFuZy9SVVMucG5nXCIgYWx0PVwiUnVzc2lhbiBsYW5ndWFnZVwiIGNsYXNzPVwicnVzXCI+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8bmF2PlxyXG4gICAgICAgICAgPGEgY2xhc3M9J2xpc3QtcG9ldHMnPkxpc3Qgb2YgcG9ldHM8L2E+XHJcbiAgICAgICAgICA8YSBocmVmPVwiI2Fib3V0LXVzXCI+QWJvdXQgVXM8L2E+XHJcbiAgICAgICAgICA8YSBocmVmPVwiI2F1dGhvci1vZi10aGUtZGF5XCI+QXV0aG9yIG9mIHRoZSBEYXk8L2E+XHJcbiAgICAgICAgICA8YSBjbGFzcz1cImFib3V0VXNcIj5Db250YWN0czwvYT5cclxuICAgICAgICA8L25hdj5cclxuICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cclxuICAgICAgPGltZyBzcmM9XCIuL2Fzc2V0cy9sb2dvL2xvZ28ucG5nXCIgYWx0PVwiUG9ldHMgb2YgQmVsYXJ1c1wiIGNsYXNzPVwibG9nb1wiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiYnV0dG9ucy13cmFwcGVyXCI+XHJcbiAgICAgICAgPGJ1dHRvbiBjbGFzcz0nbWFpbi1idXR0b24gbGVmdCc+TGlzdCBvZiBwb2V0czwvYnV0dG9uPlxyXG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPSdtYWluLWJ1dHRvbiBzZWFyY2gtc3RyaW5nJyBwbGFjZWhvbGRlcj1cIlNlYXJjaFwiPlxyXG4gICAgICAgIDxpbWcgc3JjPVwiLi9hc3NldHMvc2VhcmNoLnBuZ1wiIGFsdD1cInNlYXJjaFwiIGNsYXNzPVwic2VhcmNoLXBpY1wiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJhdXRvY29tcGxpdGVcIj5cclxuICAgICAgICAgIDx1bD48L3VsPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIDwvc2VjdGlvbj5cclxuICA8c2VjdGlvbiBjbGFzcz1cInNlY29uZC1wYWdlXCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJiYWNrZy1kZWNvclwiPjxpbWcgc3JjPVwiLi9hc3NldHMvYmFja2dyb3VuZHMvZGVjb3IucG5nXCI+PGltZyBzcmM9XCIuL2Fzc2V0cy9iYWNrZ3JvdW5kcy9kZWNvci5wbmdcIj48L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzcz1cImFib3V0LXVzXCI+XHJcbiAgICAgICAgPGgyIGlkPVwiYWJvdXQtdXNcIj5BYm91dCBVczwvaDI+XHJcbiAgICAgICAgPHA+TG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2NpbmcgZWxpdCwgc2VkIGRvIGVpdXNtb2QgdGVtcG9yIGluY2lkaWR1bnQgdXQgbGFib3JlIGV0IGRvbG9yZSBtYWduYSBhbGlxdWEuXHJcbiAgICAgICAgICBRdWlzIGlwc3VtIHN1c3BlbmRpc3NlIHVsdHJpY2VzIGdyYXZpZGEuIFJpc3VzIGNvbW1vZG8gdml2ZXJyYSBtYWVjZW5hcyBhY2N1bXNhbiBsYWN1cyB2ZWwgZmFjaWxpc2lzLiBMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCxcclxuICAgICAgICAgIGNvbnNlY3RldHVyIGFkaXBpc2ljaW5nIGVsaXQsIHNlZCBkbyBlaXVzbW9kIHRlbXBvciBpbmNpZGlkdW50IHV0IGxhYm9yZSBldCBkb2xvcmUgbWFnbmEgYWxpcXVhLiBVdCBlbmltIGFkIG1pbmltIHZlbmlhbSxcclxuICAgICAgICAgIHF1aXMgbm9zdHJ1ZCBleGVyY2l0YXRpb24gdWxsYW1jbyBsYWJvcmlzIG5pc2kgdXQgYWxpcXVpcCBleCBlYSBjb21tb2RvIGNvbnNlcXVhdC4gRHVpcyBhdXRlIGlydXJlIGRvbG9yIGluIHJlcHJlaGVuZGVyaXQgaW4gdm9sdXB0YXRlXHJcbiAgICAgICAgICB2ZWxpdCBlc3NlIGNpbGx1bSBkb2xvcmUgZXUgZnVnaWF0IG51bGxhIHBhcmlhdHVyLiBFeGNlcHRldXIgc2ludCBvY2NhZWNhdCBjdXBpZGF0YXQgbm9uIHByb2lkZW50LCBzdW50IGluIGN1bHBhIHF1aSBvZmZpY2lhIGRlc2VydW50XHJcbiAgICAgICAgICBtb2xsaXQgYW5pbSBpZCBlc3QgbGFib3J1bS4gU2VkIHV0IHBlcnNwaWNpYXRpcyB1bmRlIG9tbmlzIGlzdGUgbmF0dXMgZXJyb3Igc2l0IHZvbHVwdGF0ZW0gYWNjdXNhbnRpdW0uPC9wPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzcz1cImF1dGhvci1vZi10aGUtZGF5XCI+XHJcbiAgICAgICAgPGgyIGlkPVwiYXV0aG9yLW9mLXRoZS1kYXlcIj5BdXRob3Igb2YgdGhlIERheTwvaDI+XHJcbiAgICAgICAgPGltZyBzcmM9XCIuL2Fzc2V0cy9hdXRob3Itb2YtdGhlLWRheS5wbmdcIiBhbHQ9XCJKYW4gQmFyc3pjemV3c2tpXCI+XHJcbiAgICAgICAgPGJsb2NrcXVvdGU+wqvQp9Cw0LvQsNCy0LXQuiwg0Y/QutGWINC90Y/Qt9C80LXQvdC90LAg0ZbQtNC30LUg0LTQsCDQvNGN0YLRiywg0L3QtSDRgtC+0LvRjNC60ZYg0LfRj9C80LvRjiwg0LDQu9C1INGWINCw0YLQvNCw0YHRhNC10YDRgyDQvNC+0LbQsCDQt9C80Y/QvdGW0YbRjMK7PC9ibG9ja3F1b3RlPlxyXG4gICAgICAgIDxjaXRlPjxiPkphbiBCYXJ6Y3pld3NraTwvYj48YnI+IE5vYmxlbWFuIFphd2FsbmlhLCBvciBCZWxhcnVzIGluIEZhbnRhc3RpYyBTdG9yaWVzPC9jaXRlPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIDwvc2VjdGlvbj5cclxuICA8Zm9vdGVyPlxyXG4gICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxyXG4gICAgICA8aHI+XHJcbiAgICAgIDxpbWcgc3JjPVwiLi9hc3NldHMvZm9vdGVyL2xvZ28tcnNzY2hvb2wtNC5zdmdcIiBhbHQ9XCJ0aGUgUm9sbGluZyBTY29wZXMgU2Nob29sXCIgY2xhc3M9XCJSU1MtbG9nb1wiIGhlaWdodD1cIjg3XCI+XHJcbiAgICAgIDxpbWcgc3JjPVwiLi9hc3NldHMvZm9vdGVyL2xvZ29fcnNfdGV4dC5zdmdcIiBhbHQ9XCJ0aGUgUm9sbGluZyBTY29wZXNcIiBjbGFzcz1cIlJTLWxvZ29cIiBoZWlnaHQ9XCI4N1wiPlxyXG4gICAgICA8cD5cclxuICAgICAgICA8Yj5tYWRlIGJ5PC9iPjxicj5cclxuICAgICAgICBOaWNrIExldmtvdmljaDxicj5cclxuICAgICAgICBLYXRzaWFyeW5hIE1ha2FyZW5rYTxicj5cclxuICAgICAgICBLaXJ5bCBLaXJleWV1PGJyPjxicj5cclxuICAgICAgICBNaW5zaywgMjAxOVxyXG4gICAgICA8L3A+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Zvb3Rlcj5cclxuYCIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luIiwiaW1wb3J0IHsgJCQsIGlubmVyLCByZW1vdmUgfSBmcm9tICcuLi8uLi91dGlscyc7XHJcbmltcG9ydCBwb2V0cyBmcm9tIFwiLi9wb2V0cy5qc29uXCI7XHJcbmltcG9ydCB7IGdldFRlbXBsYXRlICB9IGZyb20gJy4vcG9ldHMudGVtcGxhdGUnO1xyXG5pbXBvcnQgdGVtcGxhdGVNYWluIGZyb20gJy4uL21haW4vbWFpbi50ZW1wbGF0ZSc7XHJcbmltcG9ydCAnLi9wb2V0cy5jc3MnO1xyXG5cclxuJCQoJ2JvZHknKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xyXG4gIGNvbnN0IGVsID0gZS50YXJnZXQ7XHJcbiAgY29uc3QgZWxDbGFzcyA9IGVsLmdldEF0dHJpYnV0ZSgnY2xhc3MnKTtcclxuICBpZiAoZWxDbGFzcyA9PT0gJ2hvbWUnKSB7XHJcbiAgICAkJCgnYm9keScpLmlubmVySFRNTCA9ICcnO1xyXG4gICAgaW5uZXIoJCQoJ2JvZHknKSwgdGVtcGxhdGVNYWluKTtcclxuICB9XHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gc2hvd1BvZXQobmFtZSl7XHJcbiAgJCQoJ2JvZHknKS5pbm5lckhUTUwgPSBnZXRUZW1wbGF0ZShuYW1lKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFkZFBvZXRzTGlua3MoKSB7XHJcbiAgJCQoJy5jb250ZW50JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge3Nob3dQb2V0KGUudGFyZ2V0LmRhdGFzZXQubmFtZSl9KVxyXG59IiwiaW1wb3J0IHBvZXRzIGZyb20gXCIuL3BvZXRzLmpzb25cIjtcclxuXHJcbmV4cG9ydCBjb25zdCBnZXRUZW1wbGF0ZSA9IGZ1bmN0aW9uIGdldFRlbXBsYXRlKHBvZXQpIHtcclxuICBsZXQgbGFuZyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyTGFuZycpIHx8ICdydXMnO1xyXG4gIHJldHVybiBgPG5hdiBjbGFzcz1cImhlYWRlcl9fbWVudS1jb250YWluZXJcIj5cclxuICA8dWwgY2xhc3M9XCJoZWFkZXJfX21lbnVcIj5cclxuICAgIDxsaT4gPGEgY2xhc3M9XCJob21lXCI+ICR7cG9ldHNbcG9ldF0ubWVudVtsYW5nXVswXX0gIDwvYT4gPC9saT5cclxuICAgIDxsaT4gPGEgaHJlZj1cIiNiaW9ncmFwaHlcIj4gJHtwb2V0c1twb2V0XS5tZW51W2xhbmddWzFdfSAgPC9hPiA8L2xpPlxyXG4gICAgPGxpPiA8YSBocmVmPVwiI2dhbGxlcnlcIj4gJHtwb2V0c1twb2V0XS5tZW51W2xhbmddWzJdfTwvYT4gPC9saT5cclxuICAgIDxsaT4gPGEgaHJlZj1cIiN3b3Jrc1wiPiAke3BvZXRzW3BvZXRdLm1lbnVbbGFuZ11bM119PC9hPiA8L2xpPlxyXG4gICAgPGxpPiA8YSBocmVmPVwiI3ZpZGVvXCI+ICR7cG9ldHNbcG9ldF0ubWVudVtsYW5nXVs0XX08L2E+IDwvbGk+XHJcbiAgPC91bD5cclxuPC9uYXY+XHJcblxyXG48aGVhZGVyIGNsYXNzPVwiaGVhZGVyX19wb2V0XCI+XHJcbiAgPGRpdiBjbGFzcz1cImhlYWRlcl9fcG9ldC1pbmZvcm1cIj5cclxuICA8ZGl2IGNsYXNzPVwiaGVhZGVyX19waG90b1wiPlxyXG4gIDxpbWcgc3JjPVwiYXNzZXRzLyR7cG9ldH0vJHtwb2V0c1twb2V0XS5waG90b1swXX1cIj5cclxuICA8L2Rpdj5cclxuICA8c3BhbiBjbGFzcz1cImhlYWRlcl9fcG9ldC1uYW1lXCI+JHtwb2V0c1twb2V0XS5uYW1lW2xhbmddfTwvc3Bhbj5cclxuICA8c3BhbiBjbGFzcz1cImhlYWRlcl9fcG9ldC1xdW90ZVwiPlxyXG4gICAgXCIke3BvZXRzW3BvZXRdLnF1b3RlW2xhbmddfVwiXHJcbiAgPC9zcGFuPlxyXG4gIDwvZGl2PlxyXG48L2hlYWRlcj5cclxuXHJcbjxtYWluPlxyXG4gIDxzZWN0aW9uIGNsYXNzPVwibWFpbl9fdGltZWxpbmVcIj4gPGEgbmFtZT1cImJpb2dyYXBoeVwiPjwvYT5cclxuICA8ZGl2IGNsYXNzPW1haW5fX3RpbWVsaW5lLWNvbnRhaW5lcj5cclxuICAgICAgPGRpdiBjbGFzcz1cIm1haW5fX3RpbWVsaW5lLWJsb2NrXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidGltZWxpbmUtYmxvY2steWVhclwiPiR7cG9ldHNbcG9ldF0uYmlvZ3JhcGh5LmZpcnN0RGF0YX08L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0aW1lbGluZS1ibG9jay10ZXh0XCI+XHJcbiAgICAgICAgICAke3BvZXRzW3BvZXRdLmJpb2dyYXBoeS5maXJzdFRleHRbbGFuZ119XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0aW1lbGluZS1ibG9jay1lbWJsZW1cIj5cclxuICAgICAgICAgICAgICA8aW1nIHNyYz1cImFzc2V0cy9lbWJsZW1fdmlsbGFnZS5wbmdcIj4gPC9pbWc+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJtYWluX190aW1lbGluZS1ibG9ja1wiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cInRpbWVsaW5lLWJsb2NrLXllYXJcIj4ke3BvZXRzW3BvZXRdLmJpb2dyYXBoeS5zZWNvbmREYXRhfTwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cInRpbWVsaW5lLWJsb2NrLXRleHRcIj5cclxuICAgICAgICAgICR7cG9ldHNbcG9ldF0uYmlvZ3JhcGh5LnNlY29uZFRleHRbbGFuZ119XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0aW1lbGluZS1ibG9jay1lbWJsZW1cIj5cclxuICAgICAgICAgICAgICA8aW1nIHNyYz1cImFzc2V0cy9lbWJsZW1fZWR1Y2F0aW9uLnBuZ1wiPiA8L2ltZz5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzcz1cIm1haW5fX3RpbWVsaW5lLWJsb2NrXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidGltZWxpbmUtYmxvY2steWVhclwiPiR7cG9ldHNbcG9ldF0uYmlvZ3JhcGh5LnRoaXJkRGF0YX08L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0aW1lbGluZS1ibG9jay10ZXh0XCI+XHJcbiAgICAgICAgICAke3BvZXRzW3BvZXRdLmJpb2dyYXBoeS50aGlyZFRleHRbbGFuZ119XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0aW1lbGluZS1ibG9jay1lbWJsZW0gdGhyZWVcIj5cclxuICAgICAgICAgICAgICA8aW1nIHNyYz1cImFzc2V0cy9lbWJsZW1fd29yay5wbmdcIj4gPC9pbWc+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJtYWluX190aW1lbGluZS1ibG9ja1wiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cInRpbWVsaW5lLWJsb2NrLXllYXJcIj4ke3BvZXRzW3BvZXRdLmJpb2dyYXBoeS5mb3VydGhEYXRhfTwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cInRpbWVsaW5lLWJsb2NrLXRleHRcIj5cclxuICAgICAgICAgICR7cG9ldHNbcG9ldF0uYmlvZ3JhcGh5LmZvdXJ0aFRleHRbbGFuZ119XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0aW1lbGluZS1ibG9jay1lbWJsZW1cIj5cclxuICAgICAgICAgICAgICA8aW1nIHNyYz1cImFzc2V0cy9lbWJsZW1fYXdhcmRzLnBuZ1wiPiA8L2ltZz5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzcz1cIm1haW5fX3RpbWVsaW5lLWJsb2NrXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidGltZWxpbmUtYmxvY2steWVhclwiPiR7cG9ldHNbcG9ldF0uYmlvZ3JhcGh5LmZpdmV0aERhdGF9PC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidGltZWxpbmUtYmxvY2stdGV4dFwiPlxyXG4gICAgICAgICAgJHtwb2V0c1twb2V0XS5iaW9ncmFwaHkuZml2ZXRoVGV4dFtsYW5nXX1cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0aW1lbGluZS1ibG9jay1lbWJsZW1cIj5cclxuICAgICAgICAgICAgICA8aW1nIHNyYz1cImFzc2V0cy9lbWJsZW1fZmFtaWx5LnBuZ1wiPiA8L2ltZz5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuICA8L3NlY3Rpb24+XHJcblxyXG4gIDxhIG5hbWU9XCJnYWxsZXJ5XCI+PC9hPlxyXG4gIDxzZWN0aW9uIGlkPVwiaW1hZ2VfY29udGFpbmVyXCIgY2xhc3M9XCJpbWFnZV9jb250YWluZXJcIj5cclxuICAgIDxpbWcgc3JjPVwiYXNzZXRzLyR7cG9ldH0vJHtwb2V0c1twb2V0XS5pbWFnZXNbMF19XCIgZGF0YS1icD1cImFzc2V0cy8ke3BvZXR9LyR7cG9ldHNbcG9ldF0uaW1hZ2VzWzBdfVwiIGNsYXNzPVwiaW1hZ2VfY29udGFpbmVyX2l0ZW1cIj5cclxuXHJcbiAgICA8aW1nIHNyYz1cImFzc2V0cy8ke3BvZXR9LyR7cG9ldHNbcG9ldF0uaW1hZ2VzWzFdfVwiIGRhdGEtYnA9XCJhc3NldHMvJHtwb2V0fS8ke3BvZXRzW3BvZXRdLmltYWdlc1sxXX1cIiBjbGFzcz1cImltYWdlX2NvbnRhaW5lcl9pdGVtXCI+XHJcblxyXG4gIDxpbWcgc3JjPVwiYXNzZXRzLyR7cG9ldH0vJHtwb2V0c1twb2V0XS5pbWFnZXNbMl19XCIgZGF0YS1icD1cImFzc2V0cy8ke3BvZXR9LyR7cG9ldHNbcG9ldF0uaW1hZ2VzWzJdfVwiIGNsYXNzPVwiaW1hZ2VfY29udGFpbmVyX2l0ZW1cIj5cclxuXHJcbiAgPGltZyBzcmM9XCJhc3NldHMvJHtwb2V0fS8ke3BvZXRzW3BvZXRdLmltYWdlc1szXX1cIiBkYXRhLWJwPVwiYXNzZXRzLyR7cG9ldH0vJHtwb2V0c1twb2V0XS5pbWFnZXNbM119XCIgY2xhc3M9XCJpbWFnZV9jb250YWluZXJfaXRlbVwiPlxyXG5cclxuICA8aW1nIHNyYz1cImFzc2V0cy8ke3BvZXR9LyR7cG9ldHNbcG9ldF0uaW1hZ2VzWzRdfVwiIGRhdGEtYnA9XCJhc3NldHMvJHtwb2V0fS8ke3BvZXRzW3BvZXRdLmltYWdlc1s0XX1cIiBjbGFzcz1cImltYWdlX2NvbnRhaW5lcl9pdGVtXCI+XHJcblxyXG4gIDxpbWcgc3JjPVwiYXNzZXRzLyR7cG9ldH0vJHtwb2V0c1twb2V0XS5pbWFnZXNbNV19XCIgZGF0YS1icD1cImFzc2V0cy8ke3BvZXR9LyR7cG9ldHNbcG9ldF0uaW1hZ2VzWzVdfVwiIGNsYXNzPVwiaW1hZ2VfY29udGFpbmVyX2l0ZW1cIj5cclxuXHJcbiAgPGltZyBzcmM9XCJhc3NldHMvJHtwb2V0fS8ke3BvZXRzW3BvZXRdLmltYWdlc1s2XX1cIiBkYXRhLWJwPVwiYXNzZXRzLyR7cG9ldH0vJHtwb2V0c1twb2V0XS5pbWFnZXNbNl19XCIgY2xhc3M9XCJpbWFnZV9jb250YWluZXJfaXRlbVwiPlxyXG5cclxuICA8aW1nIHNyYz1cImFzc2V0cy8ke3BvZXR9LyR7cG9ldHNbcG9ldF0uaW1hZ2VzWzddfVwiIGRhdGEtYnA9XCJhc3NldHMvJHtwb2V0fS8ke3BvZXRzW3BvZXRdLmltYWdlc1s3XX1cIiBjbGFzcz1cImltYWdlX2NvbnRhaW5lcl9pdGVtXCI+XHJcblxyXG4gIDxpbWcgc3JjPVwiYXNzZXRzLyR7cG9ldH0vJHtwb2V0c1twb2V0XS5pbWFnZXNbOF19XCIgZGF0YS1icD1cImFzc2V0cy8ke3BvZXR9LyR7cG9ldHNbcG9ldF0uaW1hZ2VzWzhdfVwiIGNsYXNzPVwiaW1hZ2VfY29udGFpbmVyX2l0ZW1cIj5cclxuXHJcbiAgPGltZyBzcmM9XCJhc3NldHMvJHtwb2V0fS8ke3BvZXRzW3BvZXRdLmltYWdlc1s5XX1cIiBkYXRhLWJwPVwiYXNzZXRzLyR7cG9ldH0vJHtwb2V0c1twb2V0XS5pbWFnZXNbOV19XCIgY2xhc3M9XCJpbWFnZV9jb250YWluZXJfaXRlbVwiPlxyXG5cclxuICA8L3NlY3Rpb24+XHJcblxyXG4gIDxzZWN0aW9uIGNsYXNzPVwibWFpbl9fYm9va3NcIj5cclxuICAgIDxhIG5hbWU9XCJ3b3Jrc1wiPjwvYT5cclxuICAgIDxkaXY+XHJcbiAgICAke3BvZXRzW3BvZXRdLndvcmtzLmZpcnN0QmxvY2t9XHJcbiAgICA8L2Rpdj5cclxuXHJcbiAgICA8ZGl2PlxyXG4gICAgJHtwb2V0c1twb2V0XS53b3Jrcy5zZWNvbmRCbG9ja31cclxuICAgIDwvZGl2PlxyXG5cclxuICAgIDxkaXY+XHJcbiAgICAke3BvZXRzW3BvZXRdLndvcmtzLnRoaXJkQmxvY2t9XHJcbiAgICA8L2Rpdj5cclxuXHJcbiAgICA8ZGl2PlxyXG4gICAgJHtwb2V0c1twb2V0XS53b3Jrcy5mb3VydGhCbG9ja31cclxuICAgIDwvZGl2PlxyXG4gICAgPC9zZWN0aW9uPlxyXG5cclxuICA8c2VjdGlvbiBjbGFzcz1cIm1haW5fX3ZpZGVvXCI+XHJcbiAgPGEgbmFtZT1cInZpZGVvXCI+PC9hPlxyXG4gICAgPGltZyBjbGFzcz1cInlvdXR1YmVcIiBzcmM9XCJhc3NldHMvdmlkZW8ucG5nXCIgeXRzcmM9XCIke3BvZXRzW3BvZXRdLnZpZGVvfVwiPlxyXG5cclxuICA8L3NlY3Rpb24+XHJcblxyXG4gIDxzZWN0aW9uIGNsYXNzPVwibWFpbl9fbWFwXCI+XHJcbiAgPGRpdiBjbGFzcz1cIm1hcG91dGVyXCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJnbWFwX2NhbnZhc1wiPlxyXG4gICAgICAgICAgPGlmcmFtZSBoZWlnaHQ9XCI1MDBcIiBpZD1cImdtYXBfY2FudmFzXCIgc3JjPVwiICR7cG9ldHNbcG9ldF0ubWFwfVwiPjwvaWZyYW1lPlxyXG4gICAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuICA8L3NlY3Rpb24+XHJcblxyXG4gIDxkaXYgY2xhc3M9XCJtb2RhbFwiPlxyXG4gIDwvZGl2PlxyXG5cclxuPC9tYWluPmBcclxufVxyXG4iLCJleHBvcnQgY29uc3QgJCQgPSBlbCA9PiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGVsKTtcclxuZXhwb3J0IGNvbnN0IGFkZEF0dHIgPSAoZWwsIGF0dHJzKSA9PiB7XHJcbiAgZm9yIChjb25zdCBuYW1lIGluIGF0dHJzKSB7XHJcbiAgICBlbC5zZXRBdHRyaWJ1dGUobmFtZSwgYXR0cnNbbmFtZV0pO1xyXG4gIH1cclxufTtcclxuZXhwb3J0IGNvbnN0IGFkZENsYXNzID0gKGVsLCBjbGFzc05hbWUpID0+IChlbC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSksIGVsKTtcclxuZXhwb3J0IGNvbnN0IGFwcGVuZCA9IChwYXJlbnQsIGNoaWxkKSA9PiAocGFyZW50LmFwcGVuZENoaWxkKGNoaWxkKSwgcGFyZW50KTtcclxuZXhwb3J0IGNvbnN0IGNyZWF0ZSA9IGVsID0+IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWwpO1xyXG5leHBvcnQgY29uc3QgZ2V0QnlDbGFzcyA9IGVsID0+IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoZWwpO1xyXG5leHBvcnQgY29uc3QgaW5uZXIgPSAoZWwsIHRleHQpID0+IChlbC5pbm5lckhUTUwgKz0gdGV4dCwgZWwpO1xyXG5leHBvcnQgY29uc3QgcmVtb3ZlID0gKHBhcmVudCwgY2hpbGQpID0+IChwYXJlbnQucmVtb3ZlQ2hpbGQoY2hpbGQpLCBwYXJlbnQpO1xyXG5leHBvcnQgY29uc3Qgc2V0SWQgPSAoZWwsIG5ld0lkKSA9PiAoZWwuaWQgPSBuZXdJZCwgZWwpO1xyXG5leHBvcnQgY29uc3Qgc2xlZXAgPSBtaWxsaXNlY29uZHMgPT4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIG1pbGxpc2Vjb25kcykpXHJcbiJdLCJzb3VyY2VSb290IjoiIn0=