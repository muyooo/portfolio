'use strict';
(function() {
  /* ------------------------------ */
  /* Functions                      */
  /* ------------------------------ */
  // -- JSON loading
  var xhr = new XMLHttpRequest(),
      worksData,
      worksLoadFlag = false;
  xhr.open('GET', 'js/works.json');
  xhr.responseType = 'json';
  xhr.send();
  xhr.onload = function() {
    worksData = xhr.response.works;
    worksLoadFlag = true;
  }
  xhr.onerror = function() {
    alert("作品情報が読み込めませんでした。");
  }
  // -- Move Navigation
  function moveNavigation(linkButtons, linkButtonsLen, target) {
    var targetType = target.getAttribute('data-type'),
        activeClass = 'main-nav__link-button--active';
    // Remove all active classes and add active class to target
    if(targetType == null) {
      return false;
    }
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
    // Reset contents class
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
        aboutSummary = document.querySelector('.about__summary'),
        aboutSummaryHidden = 'about__summary--hidden',
        worksList = document.querySelector('.works__list'),
        worksListHidden = 'works__list--hidden',
        aboutProfile = document.querySelector('.about__profile'),
        aboutProfileHidden = 'about__profile--hidden',
        worksSummary = document.querySelector('.works__summary'),
        worksSummaryHidden = 'works__summary--hidden';
    worksSummary.classList.remove(worksSummaryHidden);
    aboutSummary.classList.remove(aboutSummaryHidden);
    aboutProfile.classList.add(aboutProfileHidden);
    worksList.classList.add(worksListHidden);
    updateUrlHash(targetType);
    if(targetType == 'works') {
      about.classList.add('about--hidden');
      worksSummary.classList.add(worksSummaryHidden);
      works.classList.add(emphasisClass);
      worksList.classList.remove(worksListHidden);
    } else if(targetType == 'top') {
      updateUrlHash('');
    } else if(targetType == 'about') {
      about.classList.add(emphasisClass);
      works.classList.add('works--hidden');
      aboutSummary.classList.add(aboutSummaryHidden);
      aboutProfile.classList.remove(aboutProfileHidden);
    }
  }
  // -- Works sort
  function worksSort(worksSortButtons, worksSortButtonsLen, target) {
    // Change active button
    var activeClass = 'works__sort--active';
    for(var i = 0; i < worksSortButtonsLen; i++) {
      worksSortButtons[i].classList.remove(activeClass);
    }
    target.classList.add(activeClass);
    // Sort works
    var works = document.querySelectorAll('.works__work:not(.works__work--empty)'),
        worksLen = works.length,
        worksHidden = 'works__work--hidden';
    for(var i = 0; i < worksLen; i++) {
      works[i].classList.remove(worksHidden);
    }
    var targetType = target.getAttribute('data-type');
    for(var i = 0; i < worksLen; i++) {
      var targetWork = works[i],
          targetWorkType = targetWork.children[0].getAttribute('data-type');
      if(targetWorkType.indexOf(targetType) == -1 && targetType != 'all') {
        targetWork.classList.add(worksHidden);
      }
    }
  }
  // -- Works preview
  function worksPreview(index) {
    // Set detail title
    var work = worksData[index],
        workTitle = document.querySelector('.works__detail__title');
    workTitle.innerHTML = work.title;
    // Create detail images
    var workImg = work.img.main,
        workImgLen = workImg.length,
        loadedWorkImgLen = 0;
    for(var i = 0; i < workImgLen; i++) {
      var worksDetailImage = document.createElement('img');
      worksDetailImage.onload = function() {
        loadedWorkImgLen++;
      }
      worksDetailImage.classList.add('works__detail__image');
      if(i == 0) {
        worksDetailImage.classList.add('works__detail__image--first');
      }
      worksDetailImage.alt = work.imgAlt[i];
      var workImages = document.querySelector('.works__detail__images');
      if(typeof(workImg[i]) == 'string') {
        // Create image
        worksDetailImage.src = workImg[i];
        workImages.appendChild(worksDetailImage);
      } else {
        worksDetailImage.src = workImg[i][0];
        worksDetailImage.classList.add('works__detail__image--link');
        // Create link
        var worksDetailLink = document.createElement('a');
        worksDetailLink.classList.add('works__detail__image-link');
        worksDetailLink.classList.add(workImg[i][2]);
        worksDetailLink.href = workImg[i][1];
        worksDetailLink.target = '_blank';
        worksDetailLink.rel = 'noreferrer noopener';
        worksDetailLink.appendChild(worksDetailImage);
        workImages.appendChild(worksDetailLink);
      }
      // Create image caption
      var workCaption = work.imgCaption[i];
      if(workCaption) {
        var worksDetailImageCaption = document.createElement('p');
        worksDetailImageCaption.classList.add('works__detail__image-caption');
        worksDetailImageCaption.innerHTML = workCaption;
        workImages.appendChild(worksDetailImageCaption);
      }
    }
    // Set detail descriptions
    var workDescriptions = document.querySelectorAll('.works__detail__description'),
        workDescriptionsLen = workDescriptions.length;
    for (var i = 0; i < workDescriptionsLen; i++) {
      var targetDescription = work.description[i];
      if(!Array.isArray(targetDescription)) {
        workDescriptions[i].innerHTML = targetDescription;
      }
    }
    // Set process description
    var processDescription = workDescriptions[2],
        processImg = work.img.process,
        processImgLen = processImg.length;
    for (var i = 0; i < processImgLen; i++) {
      var workProcessDescription = work.description[2][i];
      var processImgObj = document.createElement('img');
      if(processImg[i]) {
        processImgObj.src = processImg[i];
        processImgObj.alt = 'プロセス補足イメージ';
        processImgObj.classList.add('works__detail__process-image');
      } else {
        processImgObj.style.display = 'none';
      }
      processDescription.appendChild(processImgObj);
      if(workProcessDescription) {
        processDescription.innerHTML += workProcessDescription;
      }
    }
    // Set process
    var process = document.querySelector('.works__detail__process'),
        workProcess = work.process,
        workProcessLen = workProcess.length;
    for (var i = 0; i < workProcessLen; i++) {
      var processObj = document.createElement('li');
      processObj.innerHTML = workProcess[i];
      processObj.classList.add('works__detail__process-list');
      if(workProcess[i].indexOf('<a') != -1) {
        processObj.classList.add('works__detail__process-list--link');
      }
      if(i == workProcessLen - 1) {
        processObj.classList.add('works__detail__process-list--last');
      }
      process.appendChild(processObj);
    }
    // Hide work contents
    var workContents = document.querySelector('.works__contents'),
        workContentsHidden = 'works__contents--hidden',
        workNav = document.querySelector('.works__nav'),
        workNavHidden = 'works__nav--hidden';
    workContents.classList.add(workContentsHidden);
    workNav.classList.add(workNavHidden);
    // Preview work loading
    var worksLoading = document.querySelector('.works__loading'),
        worksLoadingHidden = 'works__loading--hidden';
    worksLoading.classList.remove(worksLoadingHidden);
    // Lock Screen
    var screenLock = document.createElement('div');
    screenLock.style.zIndex = 100;
    screenLock.style.position = 'absolute';
    screenLock.style.top = 0;
    screenLock.style.left = 0;
    screenLock.style.right = 0;
    screenLock.style.bottom = 0;
    document.querySelector('body').appendChild(screenLock);
    // Wait work detail's image loading
    (function previewWorkDetail() {
      if(workImgLen != loadedWorkImgLen) {
        setTimeout(function() {
          previewWorkDetail();
        }, 300);
        return;
      }
      // Preview details
      worksLoading.classList.add(worksLoadingHidden);
      var workDetail = document.querySelector('.works__detail'),
          workDetailHidden = 'works__detail--hidden';
      workDetail.classList.remove(workDetailHidden);
      // Set close button
      var closeWorkButton = document.querySelector('.works__close');
      function closeWorkDetail() {
        workDetail.classList.add(workDetailHidden);
        workContents.classList.remove(workContentsHidden);
        workNav.classList.remove(workNavHidden);
        // Remove detail contents
        workImages.innerHTML = '';
        process.innerHTML = '';
        processDescription.innerHTML = '';
        // Update url hash
        updateUrlHash('works');
      }
      closeWorkButton.addEventListener('click', function() {
        closeWorkDetail();
      });
      // Update URL hash
      var hashNum = index + 1,
          targetHash = 'work' + ('0' + hashNum).slice(-2);
      updateUrlHash(targetHash);
      // unlock Screen
      document.querySelector('body').removeChild(screenLock);
    }());
  }
  // -- Update URL hash
  function updateUrlHash(targetHash) {
    targetHash = '#' + targetHash;
    location.hash = targetHash;
  }

  /* ------------------------------ */
  /* First Preview Settings         */
  /* ------------------------------ */
  // -- Wait font loading
  var waitFontLoadingFirst = 300,
      waitFontLoadingSecond = 700,
      waitFontLoadingThird = 2000,
      htmlClass,
      wfActive = 'wf-active',
      loading = document.querySelector('.loading');
  setTimeout(function() {
    htmlClass = document.querySelector('html').getAttribute('class');
    if(htmlClass && htmlClass.indexOf(wfActive) != -1) {
      previewWrapper();
    } else {
      loading.classList.remove('loading--hidden');
      setTimeout(function() {
        htmlClass = document.querySelector('html').getAttribute('class');
        if(htmlClass && htmlClass.indexOf(wfActive) != -1) {
          previewWrapper();
        } else {
          setTimeout(function() {
            previewWrapper();
          }, waitFontLoadingThird);
        }
      }, waitFontLoadingSecond);
    }
  }, waitFontLoadingFirst);
  function previewWrapper() {
    var wrapper = document.querySelector('.wrapper');
    loading.classList.add('loading--hidden');
    wrapper.classList.remove('wrapper--hidden');
  }
  // -- ID link page transition
  var pageUrl = location.href,
      pageUrlID = pageUrl.replace(/.*\/.*\#/, ''),
      pageUrlID = pageUrlID.replace(/\?.*/, ''),
      linkButtons = document.querySelectorAll('.main-nav__link-button'),
      linkButtonsLen = linkButtons.length;
  if(pageUrlID.indexOf('work') != -1) {
    // Works transition
    var workIdNum = Number( pageUrlID.replace(/work/, '') ) - 1;
    moveNavigation(linkButtons, linkButtonsLen, linkButtons[0]);
    setTimeout(function() {
      if(!isNaN(workIdNum) && workIdNum != -1) {
        (function waitJsonLoading() {
          setTimeout(function() {
            if(worksLoadFlag) {
              worksPreview(workIdNum);
            } else {
              waitJsonLoading();
            }
          }, 100);
        }());
      }
    }, 600);
  } else if(pageUrlID.indexOf('about') != -1) {
    // About transition
    moveNavigation(linkButtons, linkButtonsLen, linkButtons[1]);
  } else if(pageUrl.slice(-1) == '#') {
    var notIdUrl = pageUrl.replace(/\#/, '');
    location.href = notIdUrl;
  }

  /* ------------------------------ */
  /* User Interaction               */
  /* ------------------------------ */
  // -- Click link buttons
  for(var i = 0; i < linkButtonsLen; i++) {
    var target = linkButtons[i];
    target.addEventListener('click', function(e) {
      moveNavigation(linkButtons, linkButtonsLen, e.target);
    });
  }
  var worksSummaryLink = document.querySelector('.works__summary__link'),
      aboutSummaryLink = document.querySelector('.about__summary__link');
  worksSummaryLink.addEventListener('click', function() {
    moveNavigation(linkButtons, linkButtonsLen, linkButtons[0]);
  });
  aboutSummaryLink.addEventListener('click', function() {
    moveNavigation(linkButtons, linkButtonsLen, linkButtons[1]);
  });
  // -- Click works sort button
  var worksSortButtons = document.querySelectorAll('.works__sort-button'),
      worksSortButtonsLen = worksSortButtons.length;
  for(var i = 0; i < worksSortButtonsLen; i++) {
    var target = worksSortButtons[i];
    target.addEventListener('click', function(e) {
      worksSort(worksSortButtons, worksSortButtonsLen, e.target);
    });
  }
  // -- Click works preview button
  var worksPreviewButtons = document.getElementsByClassName('works__work-button'),
      worksPreviewButtonsLen = worksPreviewButtons.length;
  for(var i = 0; i < worksPreviewButtonsLen; i++) {
    var target = worksPreviewButtons[i];
    target.addEventListener('click', function(e) {
      if(!worksLoadFlag) {
        alert('作品情報の読み込みまでお待ちください。');
        return;
      }
      var eTarget = e.target,
          worksPreviewButtonsArray = [].slice.call(worksPreviewButtons),
          targetIndex = worksPreviewButtonsArray.indexOf(eTarget) != -1 ? worksPreviewButtonsArray.indexOf(eTarget) : worksPreviewButtonsArray.indexOf(eTarget.parentNode),
          workNum = worksPreviewButtonsLen - 1 - targetIndex;
      worksPreview(workNum);
    });
  }
  // -- Click contact button from about
  var contactButton = document.querySelector('.about__contact');
  contactButton.addEventListener('click', function() {
    moveNavigation(linkButtons, linkButtonsLen, linkButtons[2]);
  });
}());