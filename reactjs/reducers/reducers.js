import { combineReducers } from 'redux';
import profileForName from './profileReducer';
import projectsForName from './projectsReduder';

const rootReducer = combineReducers({
	profileForName,
	projectsForName
});

export default rootReducer;
