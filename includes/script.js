// ==UserScript==
// @include https://github.com/*
// ==/UserScript==

window.addEventListener('DOMContentLoaded', function(){

	// Project page
	var el = window.document.querySelector('.title-actions-bar h1 strong');
	if(el){
		insertBuildStatus(el, window.location.pathname.split('/').splice(0,3).join('/'), '0 0 0 8px');
	}

	// User page
	var links = document.querySelectorAll('.repo_list li h3');
	for(var i = 0, len = links.length; i < len; i++){
		var project = '/' + links[i].querySelector('a').href.split('/').splice(3,3).join('/');
		console.log(project);
		insertBuildStatus(links[i], project, '2px 0 0');
	}

	function insertBuildStatus(el, project, margin){
		var img = window.document.createElement('img');
		img.src = 'https://secure.travis-ci.org' + project + '.png';
		img.alt = 'build status';
		img.onload = function(){
			document.styleSheets[0].insertRule('.travis-ci{z-index:50;position:absolute;margin:' + margin + ';opacity:.5;overflow:hidden}', 1);
			document.styleSheets[0].insertRule('.travis-ci:hover{opacity:1;cursor:pointer}', 1);
			document.styleSheets[0].insertRule('.travis-ci img{position:relative;left:-53px;-o-transition:all .3s}', 1);
			document.styleSheets[0].insertRule('.travis-ci:hover img{left:0}', 1);

			var link = window.document.createElement('a');
			link.href = 'http://travis-ci.org' + project;
			link.className = 'travis-ci';

			link.appendChild(img);
			el.appendChild(link);
		}
	}

}, false);
