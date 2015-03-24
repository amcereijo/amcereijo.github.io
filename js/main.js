app.main = (function(){
	var $mainElement = $('main'),
		data,
		filters = {},
    elementsList;

	function init() {
		console.log('main init!!');
		$.subscribe('github/repo/data', processRepos);
		$.subscribe('github/readme/data', processReadme);
		$.subscribe('github/readme/data/filter', filterLanguage);
	}

	function processRepos(evt, results) {
		data = results.data;
		data = transformData(data);
		writeElements(data);
	    document.querySelector('.searchRepos').addEventListener('keyup', function(evt) {
	      filterData(evt.target.value);
	    });
	}

	function transformData(data) {
		return data.map(function(repo) {
			var d = new Date(repo.updated_at);
			repo.updated_at = d.toLocaleDateString() + ' at ' + d.toLocaleTimeString();
			return repo;
		});
	}

	function clickProject(evt) {
		var $panel = $(evt.target).closest('.panel'),
		projectName = $panel.data('projectname'),
		$moreStuffElement = $panel.find('.more-stuff');

		if(!$moreStuffElement.hasClass('active')) {
			//reset all show more area to hiden
			$('.more-stuff').removeClass('active').addClass('hide');
			//show clicked show more area
			$moreStuffElement.toggleClass('hide').addClass('active');
			//change icon of show less for show more
			$('.glyphicon').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
			app.github.getReadme(projectName);
		} else {
			//hide clicked show more area
			$moreStuffElement.addClass('hide').removeClass('active');
		}
		//change icon show more for show less in clicked area
		$panel.find('.glyphicon').toggleClass('glyphicon-chevron-up').toggleClass('glyphicon-chevron-down');
	}

	function processReadme(evt, result) {
		result = result.data;
		var markdownText = atob(result.content),
			activeElement = $('.more-stuff.active').find('.panel-body');
		activeElement.html(markdown.toHTML( markdownText ));
	}

	function writeElements(list) {
		list = completeWithColors(list);
		app.util.render('#project-list-template', {projects: list}, $mainElement);
	    elementsList = document.body.querySelectorAll('.panelProject');
	    for(var i=0,l=elementsList.length;i<l;i++) {
	      elementsList[i].addEventListener('click', clickProject);
	    }
	}

	function completeWithColors(list) {
		for(var i=0,l=list.length;i<l;i++) {
			list[i].color = app.util.randomColor(list[i].language);
		}
		return list;
	}

	function filterData(text) {
		console.log('flter by name: ' + text);
		if(text) {
			addFilter('name', function(value) {
				var fullName = value.full_name.toLowerCase();
				text = text.toLowerCase();
				return (fullName.indexOf(text) !== -1);
			});
		} else {
			removeFilter('name');
		}
		filter();
	}

	function filterLanguage(evt, language) {
		console.log('flter by language: ' + language);
		if(language) {
			addFilter('language', function(value) {
				var elementLanguage = (value.language?value.language:'Other').toLowerCase();
				language = language.toLowerCase();
				return (elementLanguage === language);
			});
		} else {
			removeFilter('language');
		}
		filter();
	}

	function addFilter(name, filterFunction) {
		filters[name] = filterFunction;
	}

	function removeFilter(name) {
		delete filters[name];
	}

	function filter() {
		var actualElement,
			hidden,
			i,
			dataLength = data.length;
		for(i=0;i<dataLength;i++) {
			actualElement = data[i];
			hidden = false;
			for(var key in filters) {
				if(!hidden && !filters[key](actualElement)) {
					hidden = true;
				}
			}
			classToElement(elementsList[i], 'hide', hidden);
		}
	}

  	function classToElement(element, className, add) {
	    var classes = element.getAttribute('class').split(" "),
	    	index = classes.indexOf(className);
		if(add && index<0) {
			classes.push(className);
		} else if(!add && index>=0) {
			classes.splice(index, 1);
		}
		element.setAttribute('class', classes.join(' '));
  	}

  return {
    init: init
  };

})();
app.main.init();