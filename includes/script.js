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
		css.insertRule('.travis-ci.repo{margin:0 0 0 8px}', 1);
		css.insertRule('ul.repositories a.travis-ci.user{position:relative;top:5px}', 1);
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

}, false);
