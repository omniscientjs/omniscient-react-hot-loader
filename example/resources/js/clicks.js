var component = require('omniscient');
var React = require('react');

module.exports = component('Clicks', function (props) {
  var self = this;
  function onClick () {
    self.props.clicks.update(clicks => clicks + 1);
  }
  return <p>{this.props.clicks.deref()} -- try changing this text after pressing 'up' a few times, the code reloads without a refresh -- <button onClick={onClick}>up</button></p>
});
