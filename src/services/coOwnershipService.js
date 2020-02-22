import requester from '../infrastructure/requester';

function loadAllCoOwnerships () {
  return requester.get('appdata', 'coOwnerships', 'kinvey');
}

function createCoOwnership (data) {
  let postObj = {
    ...data
  };

  return requester.post('appdata', 'coOwnerships', 'kinvey', postObj);
}

function editPost (data, id) {
  let updatedPostObj = {
    ...data
  };

  return requester.update('appdata', `coOwnerships/${id}`, 'kinvey', updatedPostObj);
}

function deletePost (postId) {
  return requester.remove('appdata', `coOwnerships/${postId}`, 'kinvey');
}

function loadOwnPosts (userId) {
  let endpoint = `coOwnerships?query={"_acl.creator":"${userId}"}`;

  return requester.get('appdata', endpoint, 'kinvey');
}

function loadPostById (postId) {
  let endpoint = `coOwnerships/${postId}`;

  return requester.get('appdata', endpoint, 'kinvey');
}

export default {
  loadAllCoOwnerships,
  createCoOwnership,
  editPost,
  deletePost,
  loadOwnPosts,
  loadPostById
};
