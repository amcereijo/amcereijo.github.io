import { REQUEST_PROJECTS, RECEIVE_PROJECTS } from '../actions/projectsActions';
const languageColorMap = [];
const colors = [];

function _generateNewColor() {
	const letters = ['A', 'B', 'C', 'D', 'E'];
	let color = '#';
	for (let i = 0; i < 3; i++) {
  	color += letters[Math.floor(Math.random() * letters.length)];
	}
  if(colors.indexOf(color) !== -1) {
  	color = _generateNewColor();
  }
  return color;
}

function _fillColors(projects) {
	const languageColors = {};
	return projects.map((project) => {
		let color;
		const language = project.language || 'other';
		if(languageColors[language]) {
			project.languageColor = languageColors[language];
		} else {
			color = _generateNewColor();
	    colors.push(color);
	    languageColors[language] = color;
	    languageColorMap.push({name: language, color: color});
	    project.languageColor = color;
		}
		return project;
	});
}

function _mapDates(projects) {
	return projects.map((project) => {
		const d = new Date(project.updated_at);
		project.updated_at = d.toLocaleDateString() + ' at ' + d.toLocaleTimeString();
		return project;
	});
}

function _filterProjects(filterFunctions, projects){
	for(const key in filterFunctions) {
		if(filterFunctions.hasOwnFunctions(key) &&
				typeof filterFunctions[key] === 'function') {
			projects.filter((project) => {
				return filterFunctions[key](project.name);
			});
		}
	}
	// if(filterFunctions.length) {
	// 	filterFunctions.forEach((filterFunction) => {
	// 		if(typeof filterFunction === 'function') {
	// 			projects = filterFunction(projects);
	// 		}
	// 	})
	// }
	return projects;
}

function projectsFn(state = {
	isFetching: false,
	didInvalidate: false,
	projects: [],
	filterFunctions: [],
	languages: []

}, action) {
	console.log('projectsFn: ', state);
	const filterFunctions = state.filterFunctions;
	switch(action.type) {
		case REQUEST_PROJECTS:
			return Object.assign({}, state, {
				isFetching: true,
				didInvalidate: false,
			});
		case RECEIVE_PROJECTS:
			let projects = _mapDates(action.projects);
			projects = _fillColors(projects);
			projects = _filterProjects(filterFunctions, projects);
			return Object.assign({}, state, {
				isFetching: false,
				didInvalidate: false,
				projects: projects,
				languages: languageColorMap,
				lastUpdated: action.receivedAt,
			});
		default:
			return state;
	}
}

function projectsForName(state = {}, action) {
	console.log('action:: ', action);
	switch(action.type) {
		case RECEIVE_PROJECTS:
		case REQUEST_PROJECTS:
			const dataToReturn = Object.assign({}, state,
				{ projects : projectsFn(state.profileName, action) })
			return dataToReturn;
		default:
			return state;
	}
}

export default projectsForName;
