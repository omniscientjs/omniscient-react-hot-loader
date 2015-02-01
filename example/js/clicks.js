import React from 'react';
import component from 'omniscient';

export default component(({clicks}) =>
  <p>
    {clicks.deref()}
    -- Text is updated on save - try editing this text in your source file after starting `npm run start` --
    <button onClick={_ => clicks.update(n => n + 1)}>up</button>
  </p>
).jsx;
