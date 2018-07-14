import requester from '../infrastructure/requester';

function loadAllPosts () {
  return requester.get('appdata', 'posts', 'kinvey');
}
// name, area, municipality, region, postCode, city, neighborhood, number, apartmentBuilding, entrance
function createPost (data) {
  let postObj = {
    ...data
  };

  return requester.post('appdata', 'coOwnership', 'kinvey', postObj);
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
  loadAllPosts,
  createPost,
  editPost,
  deletePost,
  loadOwnPosts,
  loadPostById
};
