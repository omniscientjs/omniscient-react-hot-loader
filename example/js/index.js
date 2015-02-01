import React from 'react';
import immstruct from 'immstruct';

import Clicks from './clicks';

var data = immstruct({ clicks: 0 });
data.on('swap', render);
render();

function render () {
  React.render(
    <Clicks clicks={data.cursor('clicks')}/>,
    document.body);
}
