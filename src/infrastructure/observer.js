let subscriptions = {
  'loginUser': [],
  'logoutUser': [],
  'notification': []
};

export default {
  events: {
    loginUser: 'loginUser',
    logoutUser: 'logoutUser',
    notification: 'notification'
  },
  subscribe: (eventName, fn) =>
    subscriptions[eventName].push(fn),
  trigger: (eventName, data) =>
    subscriptions[eventName].forEach(fn => fn(data))
};
