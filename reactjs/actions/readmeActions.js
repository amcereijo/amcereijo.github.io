import fetch from 'isomorphic-fetch';

export const REQUEST_README = 'REQUEST_README';
export const RECEIVE_README = 'RECEIVE_README';


function requestReadme(projectName) {
  return {
    type: REQUEST_README,
    projectName
  }
}

function receivePeadme(projectName, json) {
  console.log('JSON PROJECTS: ', json);
  return {
    type: RECEIVE_README,
    projectName,
    content: json,
    receivedAt: Date.now()
  }
}

function fetchReadme(profileName, projectName) {
  return dispatch => {
    dispatch(requestReadme(projectName))
    return fetch(`https://api.github.com/repos/${profileName}/${projectName}/contents/README.md?ref=master`)
      .then(req => req.json())
      .then(json => dispatch(receivePeadme(projectName, json)))
  }
}

function shouldFetchReadme(state, projectName) {
  const readme = state.readme && state.readme[projectName];
  if (!readme) {
    return true
  } else if (readme.isFetching) {
    return false
  } else {
    return readme.didInvalidate
  }
}

export function fetchReadmeIfNeeded(profileName, projectName) {
  return (dispatch, getState) => {
    if (shouldFetchReadme(getState(), projectName)) {
      return dispatch(fetchReadme(profileName, projectName))
    }
  }
}