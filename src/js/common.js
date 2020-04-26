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
  if(targetType == 'works') {
    about.classList.add('about--hidden');
    worksBackText.classList.add(worksBackTextHidden);

    works.classList.add(emphasisClass);
    worksList.classList.remove(worksListHidden);
  } else if(targetType == 'top') {
    
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
  var worksData = [
    {
      title: 'スプラトゥーンの名刺',
      description: 'スプラトゥーン仲間を募集するために作った名刺。',
      img: ['image/works_01_img01.jpg'],
      imgCaption: [''],
      imgAlt: ['スプラトゥーンの名刺'],
      descriptions: [
        'Illustrator ／ Photoshop',
        '2019/04'
      ],
      otherTitle: '',
      otherContent: ''
    },
    {
      title: 'むょーのロゴ',
      description: 'むょーという語感の柔らかさを表現したロゴ。',
      img: ['image/works_02_img01.jpg'],
      imgCaption: [''],
      imgAlt: ['むょーロゴ'],
      descriptions: [
        'Illustrator',
        '2019/07'
      ],
      otherTitle: '',
      otherContent: ''
    },
    {
      title: 'スプラトゥーンの動画',
      description: '編集にこだわったスプラトゥーン2の動画。',
      img: [
        ['http://img.youtube.com/vi/pQUVEnf0Dww/mqdefault.jpg','https://youtu.be/pQUVEnf0Dww','works__detail__link--movie'],
        ['http://img.youtube.com/vi/Rbo54P33xOk/maxresdefault.jpg','https://youtu.be/Rbo54P33xOk','works__detail__link--movie'],
        ['http://img.youtube.com/vi/jCCkJzC_aBg/maxresdefault.jpg','https://youtu.be/jCCkJzC_aBg','works__detail__link--movie']
      ],
      imgCaption: [
        '傘4人組で行くリーグマッチ!! Part7',
        '傘4人組で行くリーグマッチ!! Part6',
        '傘4人組で行くリーグマッチ!! Part5'
      ],
      imgAlt: [
        '傘4人組で行くリーグマッチ!! Part7 のサムネ画像',
        '傘4人組で行くリーグマッチ!! Part6 のサムネ画像',
        '傘4人組で行くリーグマッチ!! Part5 のサムネ画像'
      ],
      descriptions: [
        'After Effects',
        '2019/06〜08'
      ],
      otherTitle: ['提供先'],
      otherContent: ['<a class="works__feature-link" href="https://www.youtube.com/channel/UCUSqstO8xWN9WD5OxqtvkoQ" target="_blank" rel="noreffer noopener">ねこたんチャンネル</a>']
    },
    {
      title: 'イチジクありがとうカード<span class="works__detail__title-note">(2019)</span>',
      description: 'イチジク農家がイチジク購入者に送るありがとうカード。',
      img: [
        'image/works_04_img01.jpg',
        'image/works_04_img02.jpg',
        'image/works_04_img03.jpg',
        'image/works_04_img04.jpg'
      ],
      imgCaption: ['','','','表面／裏面のデザイン'],
      imgAlt: [
        'ありがとうカードイメージ',
        '封筒からのぞくありがとうカード',
        'ありがとうカードの表裏イメージ',
        'ありがとうカードの表裏デザイン'
      ],
      descriptions: [
        'Illustrator',
        '2019/10'
      ],
      otherTitle: '',
      otherContent: ''
    },
    {
      title: '飲み会ポイント',
      description: '飲み会を断るためのWebサービス。',
      img: [
        'image/works_05_img01.jpg',
        'image/works_05_img02.jpg'
      ],
      imgCaption: [
        '開発日誌の記事ヘッダー。',
        '最初の試作。'
      ],
      imgAlt: [
        '開発日誌の記事ヘッダー。',
        '最初の試作'
      ],
      descriptions: [
        'Visual Studio Code<br>Git（ターミナル）',
        '2020/03〜開発中'
      ],
      otherTitle: ['開発物'],
      otherContent: ['<a class="works__feature-link" href="">最初の試作</a>']
    }
  ];
  // Set details
  var work = worksData[index],
      workDetail = document.querySelector('.works__detail'),
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
  closeWorkButton.addEventListener('click', function() {
    workDetail.classList.add(workDetailHidden);
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
  });
}
// -- Return rem value
function getRemValue(num) {
  return num / 10 + 'rem';
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
}