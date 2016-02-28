import { REQUEST_PROJECTS, RECEIVE_PROJECTS } from '../actions/projectsActions';

function projectsFn(state = {
	isFetching: false,
	didInvalidate: false,
	projects: {}
}, action) {
	switch(action.type) {
		case REQUEST_PROJECTS:
			return Object.assign({}, state, {
				isFetching: true,
				didInvalidate: false,
			});
		case RECEIVE_PROJECTS:
			return Object.assign({}, state, {
				isFetching: false,
				didInvalidate: false,
				projects: action.projects,
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
