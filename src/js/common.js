'use strict';
/* ------------------------------ */
/* Functions                      */
/* ------------------------------ */
// -- Toggle preview icon-link
function changeIconLinkPreviewing() {
  var currentWindowHeight = window.innerHeight,
      enablePreviewHeight = 700,
      iconLinkList = document.querySelector('.main-nav__icon-link-list'),
      iconLinkListHidden = 'main-nav__icon-link-list--hidden';
  if(currentWindowHeight < enablePreviewHeight) {
    iconLinkList.classList.add(iconLinkListHidden);
  } else {
    iconLinkList.classList.remove(iconLinkListHidden);
  }
}

{
  /* ------------------------------ */
  /* First Preview Settings         */
  /* ------------------------------ */
  // -- Wait font loading
  var waitFontLoading = 1500;
  setTimeout(function() {
    var wrapper = document.querySelector('.wrapper');
    wrapper.classList.remove('wrapper--hidden');
  }, waitFontLoading);
  // -- Get document load
  window.addEventListener('load', function() {
    changeIconLinkPreviewing();
  });

  /* ------------------------------ */
  /* User Interaction               */
  /* ------------------------------ */
  // -- Get window resize
  var resizeQueue,
      resizeWait = 300;
  window.addEventListener('resize', function() {
    clearTimeout(resizeQueue);
    setTimeout(function() {
      changeIconLinkPreviewing();
    }, resizeWait);
  });
}