import React from 'react';
import { Redirect } from 'react-router-dom';

function Target({ match }) {

   // MAKE PARAMS GLOBALLY AVAILABLE
   window.request = match.params;

   // REDIRECT TO ROOT
   return <Redirect to={ '/' } />
}

export default Target;