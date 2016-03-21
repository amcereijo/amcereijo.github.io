import fetch from 'isomorphic-fetch';

export const REQUEST_PROJECTS = 'REQUEST_PROJECTS';
export const RECEIVE_PROJECTS = 'RECEIVE_PROJECTS';
export const REQUEST_FILTER = 'REQUEST_FILTER';
export const RECEIVE_FILTER = 'RECEIVE_FILTER';

function requestProjects(profileName) {
  return {
    type: REQUEST_PROJECTS,
    profileName
  }
}

function receiveProjects(profileName, json) {
  console.log('JSON PROJECTS: ', json);
  return {
    type: RECEIVE_PROJECTS,
    profileName,
    projects: json,
    receivedAt: Date.now()
  }
}

function fetchProjects(profileName) {
  return dispatch => {
    dispatch(requestProjects(profileName))
    return fetch(`https://api.github.com/users/${profileName}/repos?per_page=100`)
      .then(req => req.json())
      .then(json => dispatch(receiveProjects(profileName, json)))
  }
}

function shouldFetchProjects(state) {
  const projects = state.projects
  if (!projects) {
    return true
  } else if (projects.isFetching) {
    return false
  } else {
    return projects.didInvalidate
  }
}

export function fetchProjectsIfNeeded(profileName) {
  return (dispatch, getState) => {
    if (shouldFetchProjects(getState())) {
      return dispatch(fetchProjects(profileName))
    }
  }
}

function requestFilterFunction(filterFunctionName, isAdd) {
  return {
    type: REQUEST_FILTER,
    filterFunctionName,
    isAdd,
  };
}

function responseFilterFunction(filterFunctions) {
  return {
    type: RECEIVE_FILTER,
    filterFunctions,
  }
}

function addRemoveFilterFunctions(state, filterFunctionName, isAdd, filterFunction) {
  return (dispatch) => {
    dispatch(requestFilterFunction(filterFunctionName, isAdd));
    const filterFunctions = state.filterFunctions || {};
    if(!isAdd && filterFunctions[filterFunctionName]) {
      delete filterFunctions[filterFunctionName];
    } else if(isAdd) {
      filterFunctions[filterFunctionName] = filterFunction;
    }
    return dispatch(responseFilterFunction(filterFunctions));
  };
}

export function filterFunction(name, filterFunction, isAdd) {
  return (dispatch, getState) => {
    return dispatch(addRemoveFilterFunctions(getState(), name, isAdd, filterFunction));
  }
}