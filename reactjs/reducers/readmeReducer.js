import { REQUEST_README, RECEIVE_README } from '../actions/readmeActions';

function readmeFn(state = {
	isFetching: false,
	didInvalidate: false,
	readme: {}
}, action) {
	switch(action.type) {
		case REQUEST_README:
			return Object.assign({}, state, {
				isFetching: true,
				didInvalidate: false,
			});
		case RECEIVE_README:
			return Object.assign({}, state, {
				isFetching: false,
				didInvalidate: false,
				readme: action.content,
				lastUpdated: action.receivedAt,
			});
		default:
			return state;
	}
}

function readmeForProject(state = {}, action) {
	console.log('action:: ', action);
	switch(action.type) {
		case RECEIVE_README:
		case REQUEST_README:
			const dataToReturn = Object.assign({}, state,
				{ [action.projectName] : readmeFn(state.projectName, action) })
			return dataToReturn;
		default:
			return state;
	}
}

export default readmeForProject;
