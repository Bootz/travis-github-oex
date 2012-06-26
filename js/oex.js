/**
 *  This file is a part of Travis+GitHub Opera extension.
 *  Licensed under the MIT License (see readme).
 *  (c) 2012 Smasty, http://smasty.net
 */


/**
 * Extension helpers.
 * @type {Object}
 */
var oex = {

	/**
	 * Returns HTML element by given ID.
	 * @param  {Strng} id
	 * @return {Element}
	 */
	id: function(id){
		return document.getElementById(id);
	},

	/**
	 * Adds an event listener to the element.
	 * @param  {Element}   el
	 * @param  {String}    event
	 * @param  {Function}  callback
	 */
	listen: function(el, event, callback){
		el.addEventListener(event, callback, false);
	},

	/**
	 * Creates an element.
	 * @param  {String} element    Element name
	 * @param  {Object} attributes Element attributes
	 * @return {Element}
	 */
	el: function(element, attributes){
		var el = document.createElement(element);
		for(key in attributes){
			if(key == 'html'){
				el.innerHTML = attributes[key];
			} else if(key == 'data'){
				for(k in attributes[key]){
					el.dataset[k] = attributes[key][k];
				}
			} else{
				el.setAttribute(key, attributes[key]);
			}
		}
		return el;
	},

	/**
	 * localStorage encapsulation.
	 * @type {Object}
	 */
	storage: {

		/**
		 * Loads stored data or given default value.
		 * @param  {String} key
		 * @param  {mixed}  defaultValue
		 * @return {mixed}
		 */
		load: function(key, defaultValue){
			return localStorage[key] ? JSON.parse(localStorage[key]) : defaultValue;
		},

		/**
		 * Saves given data.
		 * @param  {String} key
		 * @param  {mixed}  value
		 */
		save: function(key, value){
			localStorage[key] = JSON.stringify(value);
		}

	}

};