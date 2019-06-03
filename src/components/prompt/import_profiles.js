import React, { useState, useContext } from 'react';
import EventListener from 'react-event-listener';

import { Context } from "../../context";

function ImportProfiles() {

   // GLOBAL STATE
   const { state, dispatch } = useContext(Context);

   // LOCAL STATE
   const [local, set_local] = useState({
      value: '',
      button: 'bad'
   })

   // AUDIT INPUT
   const audit = (event) => {

      // SHORTHAND
      const input = event.target.value;

      // ATTEMPT TO VALIDATE
      try {
         const parsed = JSON.parse(input);
         const keys = Object.keys(parsed);

         if (keys.length && keys[0].toLowerCase() === 'profiles' && parsed.profiles instanceof Array) {
            set_local({
               value: input,
               button: 'good'
            })
         } else {
            set_local({
               value: input,
               button: 'bad'
            })
         }

      // IF THE VALIDATION FAILS
      } catch {
         set_local({
            value: input,
            button: 'bad'
         })
      }
   }

   // REPLACE OLD PROFILE OBJECT
   const submit = () => {
      if (local.button === 'good') {
         dispatch({
            type: 'update_profiles',
            payload: new Map(JSON.parse(local.value).profiles)
         })
         dispatch({
            type: 'hide-prompt'
         })
         dispatch({
            type: 'loaded',
            payload: null
         })
         dispatch({
            type: 'show-message',
            payload: {
               type: 'good',
               value: 'imported profiles successfully'
            }
         })
         set_local({
            value: '',
            button: 'bad'
         })
      }
   }

   // ENTER KEY LISTENER
   const key_listener = (event) => {
      if (event.key.toLowerCase() === 'enter' && state.prompt.visible) {
         submit();
      }
   }

   return (
      <>
         <div id={ 'header' }>Import Profiles</div>
         <div id={ 'import' }>
            <EventListener
               target={ 'window' }
               onKeyDown={ key_listener }
            />
            <textarea
               id={ 'route' }
               type={ 'file' }
               onChange={ audit }
               value={ local.value }
            />
            <input
               type={ 'submit' }
               id={ local.button }
               value={ 'Replace' }
               onClick={ submit }
            />
         </div>
      </>
   )
}

export default ImportProfiles;