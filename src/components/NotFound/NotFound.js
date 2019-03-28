import React from 'react';
import { Message } from 'semantic-ui-react';

const notFound = () => (
  <Message negative>
    <Message.Header>SORRY</Message.Header>
    <p>we could not find that page</p>
  </Message>
);

export default notFound;
