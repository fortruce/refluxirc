var React = require('react');
var Reflux = require('reflux');

var ChatStore = require('../stores/ChatStore');

module.exports = React.createClass({
  mixins: [Reflux.connect(ChatStore)],
  render() {
    var messages = this.state.messages.map((message) => {
      return (
        <li>{message.text}</li>
      );
    });

    return (
      <ul>{messages}</ul>
    );
  }
});