"use strict";(function(){var xhr=new XMLHttpRequest,worksData,worksLoadFlag=false;xhr.open("GET","js/works.json");xhr.responseType="json";xhr.send();xhr.onload=function(){worksData=xhr.response.works;worksLoadFlag=true};xhr.onerror=function(){alert("作品情報が読み込めませんでした。")};var linkButtons=document.querySelectorAll(".main-nav__link-button"),linkButtonsLen=linkButtons.length;function moveNavigation(targetType){if(targetType==null){return false}clickCloseWorkDetailButton();setTimeout(function(){var activeClass="main-nav__link-button--active";for(var i=0;i<linkButtonsLen;i++){linkButtons[i].classList.remove(activeClass)}if(targetType=="works"){linkButtons[0].classList.add(activeClass)}else if(targetType=="about"){linkButtons[1].classList.add(activeClass)}var mainContentClasses=["works","main-nav","about"],mainContentClassesLen=mainContentClasses.length,mainContentQuery="";for(var i=0;i<mainContentClassesLen;i++){mainContentQuery+="."+mainContentClasses[i];if(i!=mainContentClassesLen-1){mainContentQuery+=","}}var mainContents=document.querySelectorAll(mainContentQuery),mainContentsLen=mainContents.length;for(var i=0;i<mainContentsLen;i++){var targetSection=mainContents[i],targetSectionClass=mainContentClasses[i];targetSection.className="";targetSection.classList.add(targetSectionClass)}var aboutSummary=document.querySelector(".about__summary"),aboutSummaryHidden="about__summary--hidden",worksSummary=document.querySelector(".works__summary"),worksSummaryHidden="works__summary--hidden";worksSummary.classList.remove(worksSummaryHidden);aboutSummary.classList.remove(aboutSummaryHidden);var aboutProfile=document.querySelector(".about__profile"),aboutProfileHidden="about__profile--hidden";aboutProfile.classList.add(aboutProfileHidden);var worksList=document.querySelector(".works__list"),worksListHidden="works__list--hidden";worksList.classList.add(worksListHidden);if(targetType=="top"){updateUrlHash("")}else{updateUrlHash(targetType)}var emphasisClass=targetType+"--emphasis",works=mainContents[0],about=mainContents[2];if(targetType=="works"){about.classList.add("about--hidden");worksSummary.classList.add(worksSummaryHidden);works.classList.add(emphasisClass);worksList.classList.remove(worksListHidden)}else if(targetType=="about"){about.classList.add(emphasisClass);works.classList.add("works--hidden");aboutSummary.classList.add(aboutSummaryHidden);aboutProfile.classList.remove(aboutProfileHidden)}},10)}function worksSort(worksSortButtons,worksSortButtonsLen,target){var activeClass="works__sort--active";for(var i=0;i<worksSortButtonsLen;i++){worksSortButtons[i].classList.remove(activeClass)}target.classList.add(activeClass);var works=document.querySelectorAll(".works__work:not(.works__work--empty)"),worksLen=works.length,worksHidden="works__work--hidden";for(var i=0;i<worksLen;i++){works[i].classList.remove(worksHidden)}var targetType=target.getAttribute("data-type");for(var i=0;i<worksLen;i++){var targetWork=works[i],targetWorkType=targetWork.children[0].getAttribute("data-type");if(targetWorkType.indexOf(targetType)==-1&&targetType!="all"){targetWork.classList.add(worksHidden)}}}function worksPreview(index){var work=worksData[index],workTitle=document.querySelector(".works__detail__title");workTitle.innerHTML=work.title;var workImg=work.img.main,workImgLen=workImg.length,loadedWorkImgLen=0;for(var i=0;i<workImgLen;i++){var worksDetailImage=document.createElement("img");worksDetailImage.onload=function(){loadedWorkImgLen++};worksDetailImage.classList.add("works__detail__image");if(i==0){worksDetailImage.classList.add("works__detail__image--first")}worksDetailImage.alt=work.imgAlt[i];var workImages=document.querySelector(".works__detail__images");if(typeof workImg[i]=="string"){worksDetailImage.src=workImg[i];workImages.appendChild(worksDetailImage)}else{worksDetailImage.src=workImg[i][0];worksDetailImage.classList.add("works__detail__image--link");var worksDetailLink=document.createElement("a");worksDetailLink.classList.add("works__detail__image-link");worksDetailLink.classList.add(workImg[i][2]);worksDetailLink.href=workImg[i][1];worksDetailLink.target="_blank";worksDetailLink.rel="noreferrer noopener";worksDetailLink.appendChild(worksDetailImage);workImages.appendChild(worksDetailLink)}var workCaption=work.imgCaption[i];if(workCaption){var worksDetailImageCaption=document.createElement("p");worksDetailImageCaption.classList.add("works__detail__image-caption");worksDetailImageCaption.innerHTML=workCaption;workImages.appendChild(worksDetailImageCaption)}}var workDescriptions=document.querySelectorAll(".works__detail__description"),workDescriptionsLen=workDescriptions.length;for(var i=0;i<workDescriptionsLen;i++){var targetDescription=work.description[i];if(!Array.isArray(targetDescription)){workDescriptions[i].innerHTML=targetDescription}}var processDescription=workDescriptions[2],processImg=work.img.process,processImgLen=processImg.length;for(var i=0;i<processImgLen;i++){var workProcessDescription=work.description[2][i];var processImgObj=document.createElement("img");if(processImg[i]){processImgObj.src=processImg[i];processImgObj.alt="プロセス補足イメージ";processImgObj.classList.add("works__detail__process-image")}else{processImgObj.style.display="none"}processDescription.appendChild(processImgObj);if(workProcessDescription){processDescription.innerHTML+=workProcessDescription}}var process=document.querySelector(".works__detail__process"),workProcess=work.process,workProcessLen=workProcess.length;for(var i=0;i<workProcessLen;i++){var processObj=document.createElement("li");processObj.innerHTML=workProcess[i];processObj.classList.add("works__detail__process-list");if(workProcess[i].indexOf("<a")!=-1){processObj.classList.add("works__detail__process-list--link")}if(i==workProcessLen-1){processObj.classList.add("works__detail__process-list--last")}process.appendChild(processObj)}var workContents=document.querySelector(".works__contents"),workContentsHidden="works__contents--hidden",workNav=document.querySelector(".works__nav"),workNavHidden="works__nav--hidden",workBackButton=document.querySelector(".works__back"),workBackButtonHidden="works__back--hidden";workContents.classList.add(workContentsHidden);workNav.classList.add(workNavHidden);workBackButton.classList.add(workBackButtonHidden);var worksLoading=document.querySelector(".works__loading"),worksLoadingHidden="works__loading--hidden";worksLoading.classList.remove(worksLoadingHidden);var screenLock=document.createElement("div");screenLock.style.zIndex=100;screenLock.style.position="absolute";screenLock.style.top=0;screenLock.style.left=0;screenLock.style.right=0;screenLock.style.bottom=0;document.querySelector("body").appendChild(screenLock);(function previewWorkDetail(){if(workImgLen!=loadedWorkImgLen){setTimeout(function(){previewWorkDetail()},300);return}worksLoading.classList.add(worksLoadingHidden);var workDetail=document.querySelector(".works__detail"),workDetailHidden="works__detail--hidden";workDetail.classList.remove(workDetailHidden);var closeWorkButton=document.querySelector(".works__close");function closeWorkDetail(){workDetail.classList.add(workDetailHidden);workContents.classList.remove(workContentsHidden);workNav.classList.remove(workNavHidden);workBackButton.classList.remove(workBackButtonHidden);workImages.innerHTML="";process.innerHTML="";processDescription.innerHTML="";updateUrlHash("works")}closeWorkButton.addEventListener("click",function(){closeWorkDetail()});var hashNum=index+1,targetHash="work"+("0"+hashNum).slice(-2);updateUrlHash(targetHash);document.querySelector("body").removeChild(screenLock)})()}var hashUpdated=false;function updateUrlHash(targetHash){targetHash="#"+targetHash;location.hash=targetHash;hashUpdated=true}function getPageUrlID(url){var pageUrlID=url.replace(/.*\/.*\#/,""),pageUrlID=pageUrlID.replace(/\?.*/,"");return pageUrlID}function openModal(target){var targetQuery="."+target,targetObj=document.querySelector(targetQuery),targetInvisible=target+"--invisible",targetHidden=target+"--hidden",pageUrl=location.href,orgPageUrlID=getPageUrlID(pageUrl);targetObj.classList.remove(targetHidden);setTimeout(function(){targetObj.classList.remove(targetInvisible)},50);updateUrlHash(target);var targetCloseButtonQuery=targetQuery+","+targetQuery+"__close",targetCloseButton=document.querySelector(targetCloseButtonQuery),closeTrigger=false;targetCloseButton.addEventListener("click",function(e){var targetClassText=String(e.target.classList);if(targetClassText.indexOf(target+"__")!=-1&&targetClassText.indexOf(target+"__close")==-1){return false}if(closeTrigger==true){return false}closeTrigger=true;updateUrlHash(orgPageUrlID);targetObj.classList.add(targetInvisible);var targetFadeoutTime=500;setTimeout(function(){targetObj.classList.add(targetHidden);closeTrigger=false},targetFadeoutTime)})}function clickCloseWorkDetailButton(){var closeButton=document.querySelector(".works__close");if(closeButton){closeButton.click()}}var waitFontLoadingFirst=300,waitFontLoadingSecond=700,waitFontLoadingThird=2e3,htmlClass,wfActive="wf-active",loading=document.querySelector(".loading");setTimeout(function(){htmlClass=document.querySelector("html").getAttribute("class");if(htmlClass&&htmlClass.indexOf(wfActive)!=-1){previewWrapper()}else{loading.classList.remove("loading--hidden");setTimeout(function(){htmlClass=document.querySelector("html").getAttribute("class");if(htmlClass&&htmlClass.indexOf(wfActive)!=-1){previewWrapper()}else{setTimeout(function(){previewWrapper()},waitFontLoadingThird)}},waitFontLoadingSecond)}},waitFontLoadingFirst);function previewWrapper(){var wrapper=document.querySelector(".wrapper");loading.classList.add("loading--hidden");wrapper.classList.remove("wrapper--hidden")}var pageUrl=location.href,pageUrlID=getPageUrlID(pageUrl);if(pageUrlID.indexOf("work")!=-1){var workIdNum=Number(pageUrlID.replace(/work/,""))-1;moveNavigation("works");setTimeout(function(){if(!isNaN(workIdNum)&&workIdNum!=-1){(function waitJsonLoading(){setTimeout(function(){if(worksLoadFlag){worksPreview(workIdNum)}else{waitJsonLoading()}},100)})()}},600)}else if(pageUrlID.indexOf("about")!=-1){moveNavigation("about")}else if(pageUrl.slice(-1)=="#"){var notIdUrl=pageUrl.replace(/\#/,"");location.href=notIdUrl}else if(pageUrlID.indexOf("contact")!=-1){setTimeout(function(){var contactButton=document.querySelector(".main-nav__contact");contactButton.click()},50)}else if(pageUrlID.indexOf("policy")!=-1){setTimeout(function(){var policyButton=document.querySelector(".main-nav__policy");policyButton.click()},50)}hashUpdated=false;for(var i=0;i<linkButtonsLen;i++){var target=linkButtons[i];target.addEventListener("click",function(e){var targetType=e.target.getAttribute("data-type"),targetActive=String(e.target.classList).indexOf("--active")!=-1?true:false;if(targetActive){moveNavigation("top")}else{moveNavigation(targetType)}})}var worksSummaryLink=document.querySelector(".works__summary__link"),aboutSummaryLink=document.querySelector(".about__summary__link");worksSummaryLink.addEventListener("click",function(){moveNavigation("works")});aboutSummaryLink.addEventListener("click",function(){moveNavigation("about")});var worksSortButtons=document.querySelectorAll(".works__sort-button"),worksSortButtonsLen=worksSortButtons.length;for(var i=0;i<worksSortButtonsLen;i++){var target=worksSortButtons[i];target.addEventListener("click",function(e){worksSort(worksSortButtons,worksSortButtonsLen,e.target)})}var worksPreviewButtons=document.getElementsByClassName("works__work-button"),worksPreviewButtonsLen=worksPreviewButtons.length;for(var i=0;i<worksPreviewButtonsLen;i++){var target=worksPreviewButtons[i];target.addEventListener("click",function(e){if(!worksLoadFlag){alert("作品情報の読み込みまでお待ちください。");return}var eTarget=e.target,worksPreviewButtonsArray=[].slice.call(worksPreviewButtons),targetIndex=worksPreviewButtonsArray.indexOf(eTarget)!=-1?worksPreviewButtonsArray.indexOf(eTarget):worksPreviewButtonsArray.indexOf(eTarget.parentNode),workNum=worksPreviewButtonsLen-1-targetIndex;worksPreview(workNum)})}var contentsBackButtons=document.querySelectorAll(".about__close, .works__back, .main-nav__title"),contentsBackButtonsLen=contentsBackButtons.length;for(var i=0;i<contentsBackButtonsLen;i++){contentsBackButtons[i].addEventListener("click",function(){moveNavigation("top")})}var contactButtons=document.querySelectorAll(".about__contact, .main-nav__contact"),contactButtonsLen=contactButtons.length;for(var i=0;i<contactButtonsLen;i++){contactButtons[i].addEventListener("click",function(){openModal("contact")})}var policyButton=document.querySelector(".main-nav__policy");policyButton.addEventListener("click",function(){openModal("policy")});window.addEventListener("popstate",function(){setTimeout(function(){if(hashUpdated){hashUpdated=false;return true}location.reload()},10)});var primaryWorkButtons=document.querySelectorAll(".works__summary__primary-work"),primaryWorkButtonsLen=primaryWorkButtons.length;for(var i=0;i<primaryWorkButtonsLen;i++){primaryWorkButtons[i].addEventListener("click",function(e){moveNavigation("works");var targetButton=e.target,targetWorkNum;if(String(targetButton.classList)=="works__summary__primary-work"){targetWorkNum=targetButton.getAttribute("data-num")}else{targetWorkNum=targetButton.parentNode.getAttribute("data-num")}clickCloseWorkDetailButton();worksPreview(targetWorkNum)})}})();