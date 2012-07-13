// ==UserScript==
// @include https://github.com/*
// ==/UserScript==


/**
 *  This file is a part of Travis+GitHub Opera extension.
 *  Licensed under the MIT License (see readme).
 *  (c) 2012 Smasty, http://smasty.net
 */


window.addEventListener('DOMContentLoaded', function(){

	insertCss();

	// Inject build status to project page
	var el = document.querySelector('.title-actions-bar h1 strong');
	if(el){
		insertBuildStatus(el, window.location.pathname.split('/').splice(0,3).join('/'), 'repo');
	}

	// Inject build status to user/organization page
	var links = document.querySelectorAll('.repo_list li h3');
	if(links.length > 0){
		for(i in links){
			if(typeof links[i] == 'object'){
				var project = '/' + links[i].querySelector('a').href.split('/').splice(3,3).join('/');
				insertBuildStatus(links[i], project, 'user');
			}
		}
	}

	// Inject build status to pull request page
	if(document.querySelectorAll('.page-pullrequest').length > 0){
		insertPullRequestStatus(document, document.querySelector('.pull-head'), 'pull');
	}

	// Inject build status to list of pull requests
	showPullRequestStatus();
	var browserControls = document.querySelectorAll('.browser.pulls .sidebar a, .browser.pulls .filterbar li');
	if(browserControls.length > 0){
		for(i in browserControls){
			if(typeof browserControls[i] == 'object'){
				browserControls[i].onclick = function(e){
					setTimeout(function(){
						showPullRequestStatus();
					}, 3000);
				};
			}
		}
	}


	/**
	 * Inserts build status badge to the given element.
	 * @param  {Element} el        Element to append badge to.
	 * @param  {String}  project   Project name (e.g. '/symfony/framework').
	 * @param  {String}  className Class to apply to badge.
	 */
	function insertBuildStatus(el, project, className){
		var img = document.createElement('img');
		img.src = 'https://secure.travis-ci.org' + project + '.png';
		img.alt = 'build status';
		img.onload = function(){
			if(!isStatusUnknown(img)){
				var link = document.createElement('a');
				link.href = 'http://travis-ci.org' + project;
				link.className = 'travis-ci ' + className;

				link.appendChild(img);
				el.appendChild(link);
			}
		}
	}

	/**
	 * Inserts CSS rules.
	 */
	function insertCss(){
		var css = document.styleSheets[0];
		css.insertRule('.travis-ci{z-index:50;position:absolute;opacity:.5;overflow:hidden}', 1);
		css.insertRule('.travis-ci:hover{opacity:1;cursor:pointer}', 1);
		css.insertRule('.travis-ci img{position:relative;left:-53px;-o-transition:all .3s}', 1);
		css.insertRule('.travis-ci:hover img{left:0}', 1);
		css.insertRule('.travis-ci.repo {margin:0 0 0 8px}', 1);
		css.insertRule('.travis-ci.user {margin:2px 0 0}', 1);
		css.insertRule('.travis-ci.pull {margin:0;top:15px;right:-90px}', 1);
		css.insertRule('.travis-ci.pull-list {margin:1px 0 0 8px;top:-1px}', 1);
		css.insertRule('.travis-ci.pull-list.pass {right:-90px}', 1);
		css.insertRule('.travis-ci.pull-list.fail {right:-83px}', 1);
	}

	/**
	 * Checks if image is "build status unknown".
	 * @param  {Element}  img
	 * @return {Boolean}
	 */
	function isStatusUnknown(img){
		// Cannot compare actual image data through canvas due to Same Origin Policy
		return img.width == 95 && img.height == 13;
	}

	/**
	 * Creates static build status image for Pull Requests.
	 * @param  {Element} status    Status link from travisbot comment.
	 * @param  {string}  className Additional class name for the badge.
	 * @return {Element|false}
	 */
	function createStatusImage(status, className){
		var failingImg = 'data:image/png;base64,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';
		var passingImg = 'data:image/png;base64,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';

		var img = document.createElement('img');
		if(status.text == 'passes'){
			img.src = passingImg;
		} else if(status.text == 'fails'){
			img.src = failingImg;
		} else{
			return false;
		}

		img.alt = 'build status';
		var link = document.createElement('a');
		link.href = status.href;
		link.target = '_blank';
		link.className = 'travis-ci ' + (status.text == 'passes' ? 'pass' : 'fail') + ' ' + className;
		link.title = 'This pull request ' + status.text;
		link.appendChild(img);

		return link;
	}

	/**
	 * Inserts build status of pull request tested by travisbot.
	 * @param  {Element} doc       Document element.
	 * @param  {Element} place     Place to put the badge.
	 * @param  {String}  className Additional class name for the badge.
	 */
	function insertPullRequestStatus(doc, place, className){
		var comments = doc.querySelectorAll('.discussion-timeline .avatar-bubble');
		if(comments.length > 0){
			var last = false;
			for(i in comments){
				if(typeof comments[i] == 'object'){
					var author = comments[i].querySelector('strong.author a');
					if(author && author.text.toLowerCase() == 'travisbot'){
						last = comments[i];
					}
				}
			}
			if(last){
				var content = last.querySelector('.content-body');
				var status = content.querySelectorAll('a')[0];
				var image = createStatusImage(status, className);
				if(image){
					place.appendChild(image);
				}
			}
		}
	}

	/**
	 * Processes pull request by URL.
	 * @param  {String}  url URL of the pull request.
	 * @param  {Element} el  Place to put the badge.
	 */
	function processPullRequest(url, el){
		var xhr = new window.XMLHttpRequest();
		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4 && xhr.status == 200){
				var doc = document.createElement('div');
				doc.innerHTML = xhr.responseText;
				//console.log(doc.querySelector('.pull-head .number a').text);
				insertPullRequestStatus(doc, el, 'pull-list');
			}
		}
		xhr.open('GET', url, true);
		xhr.send();
	}

	/**
	 * Shows build status of pull requests in the listing.
	 */
	function showPullRequestStatus(){
		var pulls = document.querySelectorAll('.browser.pulls .browser-content .listing');
		if(pulls.length > 0){
			for(i in pulls){
				if(typeof pulls[i] == 'object'){
					processPullRequest(pulls[i].querySelector('h3 a').href, pulls[i]);
				}
			}
		}
	}

}, false);
