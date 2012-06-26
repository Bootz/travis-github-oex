/**
 *  This file is a part of Travis+GitHub Opera extension.
 *  Licensed under the MIT License (see readme).
 *  (c) 2012 Smasty, http://smasty.net
 */


oex.listen(window, 'DOMContentLoaded', function(){

	// Inject extension properties
	oex.id('widget-title').innerHTML = 'Opera Extensions | ' + widget.name;
	oex.id('widget-name').innerHTML = widget.name + ' v' + widget.version;
	oex.id('widget-author').innerHTML = widget.author;
	oex.id('widget-description').innerHTML = widget.description;

	// Process options
	// Todo: Checkbox
	var showBtn = document.getElementById('show-button');

	oex.listen(showBtn, 'change', function(){
		widget.preferences.showBtn = parseInt(showBtn.value);
	});

	showBtn.value = widget.preferences.showBtn;


});