var React = require('react');
var Chat = require('./components/Chat');

var actions = require('./actions/actions');

setInterval(actions.receivedMessage.bind(undefined, {text: 'hello'}), 1000);

React.render(
  <Chat />,
  document.getElementById('container')
);