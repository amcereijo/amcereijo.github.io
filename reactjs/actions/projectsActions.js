import fetch from 'isomorphic-fetch';

export const REQUEST_PROJECTS = 'REQUEST_PROJECTS';
export const RECEIVE_PROJECTS = 'RECEIVE_PROJECTS';

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
  const filterFunctionsChange = state.filterFunctionsChange || false;
  if (!projects) {
    return true
  } else if (projects.isFetching) {
    return false
  } else if(filterFunctionsChange) {
    return true;
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