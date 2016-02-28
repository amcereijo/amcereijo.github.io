import fetch from 'isomorphic-fetch';

export const REQUEST_PROFILE = 'REQUEST_PROFILE';
export const RECEIVE_PROFILE = 'RECEIVE_PROFILE';


function requestProfile(profileName) {
  return {
    type: REQUEST_PROFILE,
    profileName
  }
}

function receiveProfile(profileName, json) {
  console.log('JSON: ', json);
  return {
    type: RECEIVE_PROFILE,
    profileName,
    profile: json,
    receivedAt: Date.now()
  }
}

function fetchProfile(profileName) {
  return dispatch => {
    dispatch(requestProfile(profileName))
    return fetch(`https://api.github.com/users/${profileName}`)
      .then(req => req.json())
      .then(json => dispatch(receiveProfile(profileName, json)))
  }
}

function shouldFetchProfile(state) {
  const profile = state.profile
  if (!profile) {
    return true
  } else if (profile.isFetching) {
    return false
  } else {
    return profile.didInvalidate
  }
}

export function fetchProfileIfNeeded(profileName) {
  return (dispatch, getState) => {
    if (shouldFetchProfile(getState())) {
      return dispatch(fetchProfile(profileName))
    }
  }
}
