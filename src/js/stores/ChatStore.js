var Reflux = require('reflux');

var actions = require('../actions/actions');

var ChatStore = Reflux.createStore({
  listenables: actions,

  init() {
    this._messages = [];
  },

  getInitialState() {
    return {
      messages: this._messages
    };
  },

  onReceivedMessage(message) {
    this._messages.push(message);
    this.trigger(this.getInitialState());
  }
});

module.exports = ChatStore;