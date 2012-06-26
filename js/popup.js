/**
 *  This file is a part of Travis+GitHub Opera extension.
 *  Licensed under the MIT License (see readme).
 *  (c) 2012 Smasty, http://smasty.net
 */


oex.listen(window, 'DOMContentLoaded', function(){

	// Inject extension properties
	oex.id('widget-title').innerHTML = widget.name + ' - Status monitoring';


	/* ======  Show projects  ====== */
	projectList = oex.storage.load('projectList', []);
	listProjects(projectList);


	/**
	 * Creates an HTML list of monitored projects.
	 * @param  {Array} projects Array of project being monitored
	 */
	function listProjects(projects){
		var list = document.getElementById('list');
		list.innerHTML = '';

		if(projects.length == 0){
			var msg = document.createElement('li');
			msg.className = 'msg';
			msg.innerHTML = 'No projects';
			list.appendChild(msg);
		}
		else{
			for(i in projects){
				list.appendChild(createItem(projects[i], i));
			}
		}

		/**
		 * Creates a list item for given project.
		 * @param  {String} project
		 * @param  {Integer} index   Project ID in the list.
		 * @return {Element}
		 */
		function createItem(project, index){
			var projectLink = oex.el('a', {
				href: 'https://github.com/' + project,
				html: project,
				class: 'github'
			});

			var statusLink = oex.el('a', {
				href: 'http://travis-ci.org/' + project,
				class: 'status'
			});
			statusLink.appendChild(oex.el('img', {
				src: 'http://travis-ci.org/' + project + '.png',
				alt: 'build status'
			}));

			var removeLink = oex.el('a', {
				href: '#',
				data: {id: index},
				class: 'remove',
				html: '&times;',
				title: 'Remove project'
			});

			// Remove project when 'x' is clicked
			oex.listen(removeLink, 'click', function(e){
				e.preventDefault();
				console.log(this.dataset.id);
				projectList.splice(parseInt(this.dataset.id), 1);
				listProjects(projectList);

				oex.storage.save('projectList', projectList);
			});

			// Build list item for project
			var item = oex.el('li', {});
			item.appendChild(projectLink);
			item.appendChild(statusLink);
			item.appendChild(removeLink);

			return item;
		}
	}



	/* ======  Add new project  ====== */
	oex.listen(oex.id('add-toggle'), 'click', function(e){
		e.preventDefault();
		var addForm = oex.id('add-form');

		addForm.className = (addForm.className == 'show') ? '' : 'show';
	});

	oex.listen(oex.id('add-form'), 'submit', function(e){
		e.preventDefault();

		var project = oex.id('add-project');
		if(project.value != '' && project.validity.valid){
			projectList.push(project.value);
			listProjects(projectList);
			project.value = '';

			oex.storage.save('projectList', projectList);

			oex.id('add-form').className = '';
		}
	});

});