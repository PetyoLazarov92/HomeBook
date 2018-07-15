import requester from '../infrastructure/requester';

function loadAllHomeBooks () {
  return requester.get('appdata', 'homeBook', 'kinvey');
}

function loadHomeBookForThisCoOwnership (filter) {
  return requester.get('appdata', `homeBook/?query={"toCoOwnership":"${filter}"}`, 'kinvey');
}

function createHomeBook (data) {
  let postObj = {
    ...data
  };

  return requester.post('appdata', 'homeBook', 'kinvey', postObj);
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
  return requester.remove('appdata', `homeBook/${postId}`, 'kinvey');
}

function loadOwnPosts (username) {
  let endpoint = `posts?query={"author":"${username}"}`;

  return requester.get('appdata', endpoint, 'kinvey');
}

function loadPostById (postId) {
  let endpoint = `homeBook/${postId}`;

  return requester.get('appdata', endpoint, 'kinvey');
}

export default {
  loadAllHomeBooks,
  loadHomeBookForThisCoOwnership,
  createHomeBook,
  editPost,
  deletePost,
  loadOwnPosts,
  loadPostById
};
