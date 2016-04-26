import { REQUEST_PROJECTS, RECEIVE_PROJECTS, REQUEST_FILTER, RECEIVE_FILTER } from '../actions/projectsActions';
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
	if(!languageColorMap || languageColorMap.length === 0 ) {
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
	} else {
		return projects;
	}
}

function _mapDates(projects) {
	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
		'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
	return projects.map((project) => {
		if(!project.updated_at_formated) {
			const d = new Date(project.updated_at);
			project.updated_at_formated = `${d.getUTCDate()} ${months[d.getUTCMonth()]} ${d.getUTCFullYear()} at ${d.toLocaleTimeString()}`;
		}
		return project;
	});
}

function _filterProjects(filterFunctions, projects){
	for(const key in filterFunctions) {
		console.log()
		if(filterFunctions.hasOwnProperty(key) && typeof filterFunctions[key] === 'function') {
			projects = projects.map((project) => {
				const result = filterFunctions[key](project);
				project.isVisible = result;
				return project;
			});
		}
	}
	return projects;
}

function projectsFn(state = {
	isFetching: false,
	didInvalidate: false,
	projects: [],
	filterFunctions: {},
	languages: [],

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

function filterFn(state = {
	isFetching: false,
	didInvalidate: false,
	projects: [],
	filterFunctions: {},
	languages: [],

}, action) {
	console.log('filterFn: ', state);
	const filterFunctions = action.filterFunctions;
	switch(action.type) {
		case REQUEST_FILTER:
			return Object.assign({}, state, {
				isFetching: true,
				didInvalidate: false,
				filterFunctions: filterFunctions,
			});
		case RECEIVE_FILTER:
			let projects = _mapDates(state.projects);
			projects = _fillColors(projects);
			projects = _filterProjects(filterFunctions, projects);
			return Object.assign({}, state, {
				isFetching: false,
				didInvalidate: false,
				projects: projects,
				languages: languageColorMap,
				lastUpdated: action.receivedAt,
				filterFunctions: filterFunctions,
			});
		default:
			return state;
	}
}

function projectsForName(state = {}, action) {
	console.log('action:: ', action);
	console.log('state:', state);
	switch(action.type) {
		case RECEIVE_PROJECTS:
		case REQUEST_PROJECTS:
			const dataToReturn = Object.assign({}, state,
				{ projects : projectsFn(state.profileName, action) })
			return dataToReturn;
		case REQUEST_FILTER:
		case RECEIVE_FILTER:
			return Object.assign({}, state,
				{ projects : filterFn(state.projects, action) })
			break;
		default:
			return state;
	}
}

export default projectsForName;
