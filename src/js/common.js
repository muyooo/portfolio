'use strict';
(function() {
  /* ------------------------------ */
  /* Functions                      */
  /* ------------------------------ */
  // -- JSON loading
  var xhr = new XMLHttpRequest(),
      worksData;
  xhr.open('GET', 'js/works.json');
  xhr.responseType = 'json';
  xhr.send();
  xhr.onload = function() {
    worksData = xhr.response.works;
    var workContents = document.querySelector('.works__contents'),
        workContentsHidden = 'works__contents--hidden';
    workContents.classList.remove(workContentsHidden);
  }
  xhr.onerror = function() {
    alert("作品情報が読み込めませんでした。");
  }
  // -- Toggle preview icon-link
  function changeIconLinkPreviewing() {
    var currentWindowHeight = window.innerHeight,
        currentWindowWidth = window.innerWidth,
        firstBreakPoint = 1280,
        enablePreviewHeight = currentWindowWidth < firstBreakPoint ? 600 : 700,
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
        worksList = document.querySelector('.works__list'),
        worksListHidden = 'works__list--hidden',
        aboutProfile = document.querySelector('.about__profile'),
        aboutProfileHidden = 'about__profile--hidden',
        aboutBackText = document.querySelector('.about__backtext'),
        aboutBackTextHidden = 'about__backtext--hidden';
    aboutBackText.classList.remove(aboutBackTextHidden);
    worksBackText.classList.remove(worksBackTextHidden);
    aboutProfile.classList.add(aboutProfileHidden);
    worksList.classList.add(worksListHidden);
    updateUrlHash(targetType);
    if(targetType == 'works') {
      about.classList.add('about--hidden');
      worksBackText.classList.add(worksBackTextHidden);
      works.classList.add(emphasisClass);
      worksList.classList.remove(worksListHidden);
    } else if(targetType == 'top') {
      updateUrlHash('');
    } else if(targetType == 'about') {
      about.classList.add(emphasisClass);
      works.classList.add('works--hidden');
      aboutBackText.classList.add(aboutBackTextHidden);
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
    var works = document.querySelectorAll('.works__work'),
        worksLen = works.length,
        worksHidden = 'works__work--hidden';
    for(var i = 0; i < worksLen; i++) {
      works[i].classList.remove(worksHidden);
    }
    var targetType = target.getAttribute('data-type');
    for(var i = 0; i < worksLen; i++) {
      var targetWork = works[i],
          targetWorkType = targetWork.getAttribute('data-type');
      if(targetType != targetWorkType && targetType != 'all') {
        targetWork.classList.add(worksHidden);
      }
    }
  }
  // -- Works preview
  function worksPreview(index) {
    // Set details
    var work = worksData[index],
        workDetail = document.querySelector('.works__detail'),
        workContents = document.querySelector('.works__contents'),
        workContentsHidden = 'works__contents--hidden',
        workTitle = document.querySelector('.works__detail__title'),
        workDescription = document.querySelector('.works__detail__description'),
        workImages = document.querySelector('.works__detail__images');
    workTitle.innerHTML = work.title;
    workDescription.innerHTML = work.description;
    // Create detail images
    var workImg = work.img,
        workImgLen = workImg.length;
    for(var i = 0; i < workImgLen; i++) {
      var worksDetailImage = document.createElement('img');
      worksDetailImage.classList.add('works__detail__image');
      worksDetailImage.alt = work.imgAlt[i];
      if(typeof(workImg[i]) == 'string') {
        // Create image
        worksDetailImage.src = workImg[i];
        workImages.appendChild(worksDetailImage);
      } else {
        worksDetailImage.src = workImg[i][0];
        worksDetailImage.classList.add('works__detail__image--link');
        // Create link
        var worksDetailLink = document.createElement('a');
        worksDetailLink.classList.add('works__detail__link');
        worksDetailLink.classList.add(workImg[i][2]);
        worksDetailLink.href = workImg[i][1];
        worksDetailLink.target = '_blank';
        worksDetailLink.rel = 'noopener noreferrer';
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
    var workDescriptions = document.querySelectorAll('.works__feature-description'),
        workDescriptionsLen = workDescriptions.length;
    for(var i = 0; i < workDescriptionsLen; i++) {
      var workDescription = work.descriptions[i];
      workDescriptions[i].innerHTML = workDescription;
    }
    // Set other descriptions
    var workOtherTitles = work.otherTitle,
        workOtherContents = work.otherContent,
        workOtherTitlesLen = workOtherTitles.length;
    for(var i = 0; i < workOtherTitlesLen; i++) {
      var targetTitle = workOtherTitles[i];
      if(targetTitle != null) {
        var targetContent = workOtherContents[i],
            worksFeatures = document.querySelector('.works__features'),
            worksFeature = document.createElement('tr'),
            worksFeatureTitle = document.createElement('th'),
            worksFeatureContent = document.createElement('td');
        worksFeature.classList.add('works__feature');
        worksFeature.classList.add('works__feature-other');
        worksFeatureTitle.classList.add('works__feature-title');
        worksFeatureTitle.innerHTML = targetTitle;
        worksFeature.appendChild(worksFeatureTitle);
        worksFeatureContent.classList.add('works__feature-description');
        worksFeatureContent.innerHTML = targetContent;
        worksFeature.appendChild(worksFeatureContent);
        worksFeatures.appendChild(worksFeature);
      }
    }
    // Hide work contents
    workContents.classList.add(workContentsHidden);
    // Preview details
    var workDetailHidden = 'works__detail--hidden';
    workDetail.classList.remove(workDetailHidden);
    // Set works-detail width
    var worksList = document.querySelector('.works__list'),
        worksListWidth = worksList.offsetWidth;
    workDetail.style.width = getRemValue(worksListWidth)
    // Set text-box width
    var workText = document.querySelector('.works__detail__text'),
        workTextWidth = workText.offsetWidth,
        workTextBox = document.querySelector('.works__detail__text-box');
    workTextBox.style.width = getRemValue(workTextWidth);
    // Set close button
    var closeWorkButton = document.querySelector('.works__close');
    closeWorkButton.style.width = getRemValue(worksListWidth);
    function closeWorkDetail() {
      workDetail.classList.add(workDetailHidden);
      workContents.classList.remove(workContentsHidden);
      // Remove detail contents
      var removeImageContents = workImages.querySelectorAll('.works__detail__image:not(.works__detail__image--link), .works__detail__image-caption, .works__detail__link'),
          removeImageContentsLen = removeImageContents.length;
      for(var i = 0; i < removeImageContentsLen; i++) {
        workImages.removeChild(removeImageContents[i]);
      }
      var worksFeatures = document.querySelector('.works__features'),
          removeOtherFeatures = worksFeatures.querySelectorAll('.works__feature-other'),
          removeOtherFeaturesLen = removeOtherFeatures.length;
      for(var i = 0; i < removeOtherFeaturesLen; i++) {
        worksFeatures.removeChild(removeOtherFeatures[i]);
      }
      updateUrlHash('works');
    }
    closeWorkButton.addEventListener('click', function() {
      closeWorkDetail();
    });
    window.addEventListener('resize', function() {
      closeWorkDetail();
    });
    // Update URL hash
    var hashNum = index + 1,
        targetHash = 'work' + ('0' + hashNum).slice(-2);
    updateUrlHash(targetHash);
  }
  // -- Return rem value
  function getRemValue(num) {
    return num / 10 + 'rem';
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
  var waitFontLoading = 1500;
  setTimeout(function() {
    var wrapper = document.querySelector('.wrapper');
    wrapper.classList.remove('wrapper--hidden');
  }, waitFontLoading);
  // -- Get document load
  window.addEventListener('load', function() {
    changeIconLinkPreviewing();
  });
  // -- ID link page transition
  var pageUrl = location.href,
      pageUrlID = pageUrl.replace(/.*\/.*\#/, ''),
      pageUrlID = pageUrlID.replace(/\?.*/, ''),
      linkButtons = document.querySelectorAll('.main-nav__link-button'),
      linkButtonsLen = linkButtons.length;
  if(pageUrlID.indexOf('work') != -1) {
    // Works transition
    var workIdNum = Number( pageUrlID.replace(/work/, '') ) - 1;
    moveNavigation(linkButtons, linkButtonsLen, linkButtons[2]);
    if(!isNaN(workIdNum)) {
      worksPreview(workIdNum);
    }
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
  for(var i = 0; i < linkButtonsLen; i++) {
    var target = linkButtons[i];
    target.addEventListener('click', function(e) {
      moveNavigation(linkButtons, linkButtonsLen, e.target);
    });
  }
  // -- Click works sort button
  var worksSortButtons = document.querySelectorAll('.works__sort'),
      worksSortButtonsLen = worksSortButtons.length;
  for(var i = 0; i < worksSortButtonsLen; i++) {
    var target = worksSortButtons[i];
    target.addEventListener('click', function(e) {
      worksSort(worksSortButtons, worksSortButtonsLen, e.target);
    });
  }
  // -- Click works preview button
  var worksPreviewButtons = document.getElementsByClassName('works__work'),
      worksPreviewButtonsLen = worksPreviewButtons.length;
  for(var i = 0; i < worksPreviewButtonsLen; i++) {
    var target = worksPreviewButtons[i];
    target.addEventListener('click', function(e) {
      var eTarget = e.target,
          worksPreviewButtonsArray = [].slice.call(worksPreviewButtons),
          targetIndex = worksPreviewButtonsArray.indexOf(eTarget) != -1 ? worksPreviewButtonsArray.indexOf(eTarget) : worksPreviewButtonsArray.indexOf(eTarget.parentNode),
          workNum = worksPreviewButtonsLen - 1 - targetIndex;
      worksPreview(workNum);
    });
  }
}());