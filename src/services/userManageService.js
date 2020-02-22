import requester from '../infrastructure/requester';

// All Users.
function loadAllUsers () {
  return requester.get('user', '', 'kinvey');
}
// All Users.
function loadUser (id) {
  return requester.get('user', `?query={"_id":"${id}"}`, 'kinvey');
}

// All Roles.
function loadUsersRoles () {
  return requester.get('roles', '', 'master');
}

// All members in a specific role.
function loadRoleMembers (id) {
  return requester.get('roles', `${id}/membership`, 'master');
}

// Assign a role to member.
function assignRole (userId, roleId) {
  return requester.update('user', `${userId}/roles/${roleId}`, 'master');
}

// Revoke a role from member.
function revokeRole (userId, roleId) {
  return requester.remove('user', `${userId}/roles/${roleId}`, 'master');
}

export default {
  loadAllUsers,
  loadUser,
  loadUsersRoles,
  loadRoleMembers,
  assignRole,
  revokeRole
};
