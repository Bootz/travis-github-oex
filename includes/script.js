// ==UserScript==
// @include https://github.com/*
// ==/UserScript==

window.addEventListener('DOMContentLoaded', function(){

	var el = window.document.querySelector('.title-actions-bar h1 strong');
	if(el){
		insertBuildStatus(el);
	}

	function insertBuildStatus(el){
	    var project = window.location.pathname.split('/').splice(0,3).join('/');

	    var img = window.document.createElement('img');
	    img.src = 'https://secure.travis-ci.org' + project + '.png';
	    img.alt = 'build status';
	    img.onload = function(){
	        document.styleSheets[0].insertRule('#travis-ci{border-radius:1px;display:inline-block;margin:0 -1px 0 8px;opacity:.9}', 1);
	        document.styleSheets[0].insertRule('#travis-ci:hover{background:rgba(0,0,0,.5);box-shadow: 0 0 3px rgba(0,0,0,.5);opacity:1;cursor:pointer}', 1);
	        document.styleSheets[0].insertRule('#travis-ci img{display:block}', 1);

	        var link = window.document.createElement('a');
	        link.href = 'http://travis-ci.org' + project;
	        link.id = 'travis-ci';

	        link.appendChild(img);
        	el.appendChild(link);
    	}
	}

}, false);
