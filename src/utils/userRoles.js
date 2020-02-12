
function userRoles (userRoles, availableRoles) {
    userRoles = userRoles._kmd.roles.map(e => e.roleId);
    let rolesAsNames = availableRoles.filter(element => userRoles.indexOf(element._id) !== -1);
    rolesAsNames = rolesAsNames.map(e => e.name);
    return rolesAsNames;
}

export default userRoles;
