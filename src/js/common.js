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
// -- Move Navigation
function moveNavigation(linkButtons, linkButtonsLen, target) {
  var targetType = target.getAttribute('data-type'),
      activeClass = 'main-nav__link-button--active';
  // Remove all active classes and add active class to target
  for(var i = 0; i < linkButtonsLen; i++) {
    linkButtons[i].classList.remove(activeClass);
  }
  target.classList.add(activeClass);
  // Get contents query
  var mainContentClasses = ['works', 'main-nav', 'about'],
      mainContentClassesLen = mainContentClasses.length,
      mainContentQuery = '';
  for(var i = 0; i < mainContentClassesLen; i++) {
    mainContentQuery += '.' + mainContentClasses[i];
    if(i != mainContentClassesLen - 1) {
      mainContentQuery += ',';
    }
  }
  // Get section query
  var mainContents = document.querySelectorAll(mainContentQuery),
      mainContentsLen = mainContents.length;
  for(var i = 0; i < mainContentsLen; i++) {
    var targetSection = mainContents[i],
        targetSectionClass = mainContentClasses[i];
    targetSection.className = '';
    targetSection.classList.add(targetSectionClass);
  }
  var emphasisClass = targetType + '--emphasis',
      works = mainContents[0],
      top = mainContents[1],
      about = mainContents[2],
      worksBackText = document.querySelector('.works__backtext'),
      worksBackTextHidden = 'works__backtext--hidden',
      aboutProfile = document.querySelector('.about__profile'),
      aboutProfileHidden = 'about__profile--hidden',
      aboutBackText = document.querySelector('.about__backtext'),
      aboutBackTextHidden = 'about__backtext--hidden';
  aboutBackText.classList.remove(aboutBackTextHidden);
  worksBackText.classList.remove(worksBackTextHidden);
  aboutProfile.classList.add(aboutProfileHidden);
  if(targetType == 'works') {
    about.classList.add('about--hidden');
    worksBackText.classList.add(worksBackTextHidden);
    works.classList.add(emphasisClass);
  } else if(targetType == 'top') {
    
  } else if(targetType == 'about') {
    about.classList.add(emphasisClass);
    works.classList.add('works--hidden');
    aboutBackText.classList.add(aboutBackTextHidden);
    aboutProfile.classList.remove(aboutProfileHidden);
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
  // -- Click link buttons
  var linkButtons = document.querySelectorAll('.main-nav__link-button'),
      linkButtonsLen = linkButtons.length;
  for(var i = 0; i < linkButtonsLen; i++) {
    var target = linkButtons[i];
    target.addEventListener('click', function(e) {
      moveNavigation(linkButtons, linkButtonsLen, e.target);
    });
  }
  
}