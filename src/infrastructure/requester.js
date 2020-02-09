import $ from 'jquery';

const kinveyBaseUrl = 'https://baas.kinvey.com/';
const kinveyAppKey = 'kid_ryW4ZUHmm';
const kinveyAppSecret = 'e3143407c0224dc299fd3fabfaee4c1b';
const kinveyMasterSecret = '6b2dfd1b26d64a41932055d3f84f8ae5';

// Creates the authentication header
function makeAuth (type) {
  if (type === 'master') return 'Basic ' + btoa(kinveyAppKey + ':' + kinveyMasterSecret);
  return type === 'basic'
    ? 'Basic ' + btoa(kinveyAppKey + ':' + kinveyAppSecret)
    : 'Kinvey ' + sessionStorage.getItem('authtoken');
}

// Creates request object to kinvey
function makeRequest (method, module, endpoint, auth) {
  return {
    method,
    url: kinveyBaseUrl + module + '/' + kinveyAppKey + '/' + endpoint,
    headers: {
      'Authorization': makeAuth(auth)
    }
  };
}

// Function to return GET promise
function get (module, endpoint, auth) {
  return $.ajax(makeRequest('GET', module, endpoint, auth));
}

// Function to return POST promise
function post (module, endpoint, auth, data) {
  let req = makeRequest('POST', module, endpoint, auth);
  req.data = data;
  return $.ajax(req);
}

// Function to return PUT promise
function update (module, endpoint, auth, data) {
  let req = makeRequest('PUT', module, endpoint, auth);
  req.data = data;
  return $.ajax(req);
}

// Function to return DELETE promise
function remove (module, endpoint, auth) {
  return $.ajax(makeRequest('DELETE', module, endpoint, auth));
}

export default {
  get,
  post,
  update,
  remove
};
