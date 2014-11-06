var React = require('react'),
    immstruct = require('immstruct'),
    component = require('omniscient');

var Clicks = require('./clicks').jsx;

var data = immstruct({ clicks: 0 });
data.on('swap', render);

function render () {
  React.render(
    <Clicks clicks={data.cursor('clicks')}/>,
    document.body);
}

render();
