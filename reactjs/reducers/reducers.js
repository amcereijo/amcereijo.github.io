import { combineReducers } from 'redux';
import { REQUEST_PROFILE, RECEIVE_PROFILE } from '../actions/profileActions';


function profileFn(state = {
	isFetching: false,
	didInvalidate: false,
	data: {}
}, action) {
	switch(action.type) {
		case REQUEST_PROFILE:
			return Object.assign({}, state, {
				isFetching: true,
				didInvalidate: false,
			});
		case RECEIVE_PROFILE:
			return Object.assign({}, state, {
				isFetching: false,
				didInvalidate: false,
				data: action.profile,
				lastUpdated: action.receivedAt,
			});
		default:
			return state;
	}
}

function profileForName(state = {}, action) {
	console.log('action:: ', action);
	switch(action.type) {
		case RECEIVE_PROFILE:
		case REQUEST_PROFILE:
			const dataToReturn = Object.assign({}, state,
				{ profile : profileFn(state.profileName, action) })
			return dataToReturn;
		default:
			return state;
	}
}

const rootReducer = combineReducers({
	profileForName,
});

export default rootReducer;
