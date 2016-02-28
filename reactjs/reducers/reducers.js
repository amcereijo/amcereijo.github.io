import { combineReducers } from 'redux';
import profileForName from './profileReducer';

const rootReducer = combineReducers({
	profileForName,
});

export default rootReducer;
