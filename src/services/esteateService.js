import requester from '../infrastructure/requester';

function loadAllEstates () {
  return requester.get('appdata', 'estates', 'kinvey');
}

function loadAllEstatesForThisCoOwnership (filter) {
  return requester.get('appdata', `estates/?query={"coOwnership":"${filter}"}`, 'kinvey');
}

function createEstate (data) {
  let postObj = {
    ...data
  };

  return requester.post('appdata', 'estates', 'kinvey', postObj);
}

function editPost (postId, author, title, description, url, imageUrl) {
  let updatedPostObj = {
    author,
    title,
    description,
    url,
    imageUrl
  };

  return requester.update('appdata', `posts/${postId}`, 'kinvey', updatedPostObj);
}

function deletePost (postId) {
  return requester.remove('appdata', `posts/${postId}`, 'kinvey');
}

function loadOwnPosts (username) {
  let endpoint = `posts?query={"author":"${username}"}`;

  return requester.get('appdata', endpoint, 'kinvey');
}

function loadPostById (postId) {
  let endpoint = `posts/${postId}`;

  return requester.get('appdata', endpoint, 'kinvey');
}

export default {
  loadAllEstates,
  loadAllEstatesForThisCoOwnership,
  createEstate,
  editPost,
  deletePost,
  loadOwnPosts,
  loadPostById
};
