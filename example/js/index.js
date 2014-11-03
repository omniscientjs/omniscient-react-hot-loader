var component = require('omniscient'),
    immstruct = require('immstruct'),
    React = require("react");

var Clicks = require('./clicks').jsx;

var data = immstruct({ clicks: 0 });
data.on('swap', render);

function render () {
  React.render(
    <Clicks clicks={data.cursor('clicks')}/>,
    document.body);
}

render();
