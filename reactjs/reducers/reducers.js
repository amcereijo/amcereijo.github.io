import { combineReducers } from 'redux';
import profileForName from './profileReducer';
import projectsForName from './projectsReduder';
import readmeForProject from './readmeReducer';

const rootReducer = combineReducers({
	profileForName,
	projectsForName,
	readmeForProject,
});

export default rootReducer;
