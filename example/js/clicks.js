var component = require('omniscient');
var React = require('react');

module.exports = component('Clicks', function (props) {
  var self = this;
  function onClick () {
    self.props.clicks.update(clicks => clicks + 1);
  }
  return (
    <p>
      {this.props.clicks.deref()}
      -- Text is updated on save --
      <button onClick={onClick}>up</button>
    </p>
  );
});
