import React from 'react';
import { HashLink } from 'react-router-hash-link';

function Sub({ header, icon, func, link }) {
   if (link === undefined) {
      return <Func
         func={ func }
         icon={ icon }
         header={ header }
      />

   } else {
      return <Plain
         link={ link }
         icon={ icon }
         header={ header }
      />
   }
}

// LINK WITH FUNCTIONAL COMPONENT
function Func({ header, icon, func }) { return (
   <div className="item" onClick={ func }>
      <div className='icon' id={ icon } />
      <div className='header'>{ header }</div>
   </div>
)}

// PLAIN OLD LINK
function Plain({ header, icon, link }) { return (
   <HashLink to={ link }>
      <div className="item">
         <div className='icon' id={ icon } />
         <div className='header'>{ header }</div>
      </div>
   </HashLink>
)}

export default Sub;