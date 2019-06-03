import React, { useState, useContext } from 'react';
import { Context } from "../../context";
import { custom } from '../../funcs/build';

import axios from 'axios';

function ImportRoute() {

   // GLOBAL CONTEXT
   const { dispatch } = useContext(Context);

   // PICKED FACTION STATE
   const [local, set_local] = useState({
      alliance: true,
      horde: false
   })

   const toggle = (target) => {
      if (!target) {
         set_local({
            alliance: !local.alliance,
            horde: !local.horde,
         })
      }
   }

   // PARSE SELECTED FILE
   const parse_file = (event) => {
      event.persist();

      // FIND THE FILE
      var content = event.target.files[0];

      // INSTANTIATE THE READER
      var reader = new FileReader();

      // GENERATE A FETCHABLE URL, THEM FETCH IT
      reader.onload = () => {
         axios.get(reader.result).then(response => {

            // CHECK CONTENT TYPE
            const type = typeof response.data;

            // IF ITS A PROPERLY FORMATTED OBJECT
            if (type !== 'string' && Object.keys(response.data).length) {

               // SET BUILD
               dispatch({
                  type: 'load',
                  payload: custom({
                     build: response.data,
                     faction: local.alliance ? 'alliance' : 'horde'
                  })
               })

               // SET LOADED PROFILE TO NULL
               dispatch({
                  type: 'loaded',
                  payload: null
               })

               // SHOW MESSAGE
               dispatch({
                  type: 'show-message',
                  payload: {
                     type: 'good',
                     value: 'ROUTE IMPORTED SUCCESSFULLY'
                  }
               })

               // HIDE PROMPT
               dispatch({ type: 'hide-prompt' });

            // OTHERWISE, LOADING NOTHING & SHOW ERROR MESSAGE
            } else {
               
               // SHOW MESSAGE
               dispatch({
                  type: 'show-message',
                  payload: {
                     type: 'bad',
                     value: 'ROUTE IMPORT FAILED DUE TO TYPOS'
                  }
               })

               // HIDE PROMPT
               dispatch({ type: 'hide-prompt' });
            }

            // IRREGARDLESS, CLEAR THE INPUT FIELD
            event.target.value = null;
         })
      }

      // TRIGGER THE READER
      reader.readAsDataURL(content);
   }

   // TOGGLE FACTION
   const picker = (faction) => {
      if (faction) { return 'selected'; }
   }

   return (
      <>
         <div id={ 'header' }>Import Route</div>
         <div id={ 'import' }>
            <div id={ 'factions' }>
               <div className={ 'tab' } id={ picker(local.alliance) } onClick={() => { toggle(local.alliance) }}>Alliance</div>
               <div className={ 'tab' } id={ picker(local.horde) } onClick={() => { toggle(local.horde) }}>Horde</div>
            </div>
            <div id={ 'container' }>
               <input
                  id={ 'route' }
                  type={ 'file' }
                  onChange={ parse_file }
               />
               <div id={ 'label' }>Select or Drop a route File</div>
            </div>
         </div>
      </>
   )
}

export default ImportRoute;