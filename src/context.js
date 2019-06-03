import React, { createContext, useReducer } from "react";
import { update, change } from "./funcs/storage";
import Prompt from './components/prompt';

// DECLARE CONTEXT
const Context = createContext();

// CONTEXT REDUCER
function reducer(state, action) {
   switch (action.type) {

      // CHANGE BLOCK
      case 'block': {

         // CHANGE STORAGE CONTENT
         change(state, action.payload);

         return {
            ...state,
            current: action.payload
         }
      }

      // LOAD PROFILE
      case 'load': {
         return {
            ...state,
            ...action.payload
         }
      }

      // SET PROFILES ON INIT LOAD
      case 'set_profiles': {
         return {
            ...state,
            profiles: action.payload
         }
      }

      // UPDATE PROFILES
      case 'update_profiles': {

         // UPDATE STORAGE
         update(action.payload);
         
         return {
            ...state,
            profiles: action.payload
         }
      }

      // SAVE RACE REQUEST DURING PROFILE CREATION
      case 'selected_race': {
         return {
            ...state,
            selected_race: action.payload
         }
      }

      // SHOW PROMPT WITH APPROPARIATE CONTENT
      case 'show-prompt': {
         return {
            ...state,
            prompt: {
               visible: true,
               type: action.payload
            }
         }
      }

      // HIDE PROMPT
      case 'hide-prompt': {
         return {
            ...state,
            prompt: {
               ...state.prompt,
               visible: false
            }
         }
      }

      // CURRENT LOADED PROFILE
      case 'loaded': {
         return {
            ...state,
            loaded: action.payload
         }
      }

      // SHOW MESSAGE
      case 'show-message': {
         return {
            ...state,
            message: {
               visible: true,
               type: action.payload.type,
               value: action.payload.value
            }
         }
      }

      // HIDE MESSAGE
      case 'hide-message': {
         return {
            ...state,
            message: {
               visible: false,
               type: undefined,
               value: undefined
            }
         }
      }

      // FALLBACK
      default: {
         console.log('Reducer Error!');
         return state;
      }
   }
}

// CONTEXT PROVIDER
function Provider({ children }) {

   // ATTACH THE REDUCER
   const [state, dispatch] = useReducer(reducer, {
      data: null,
      current: 0,
      profiles: null,
      prompt: {
         visible: true,
         type: 'loading'
      },
      selected_race: null,
      loaded: null,
      message: {
         visible: false,
         type: undefined,
         value: undefined
      }
   });

   return (
      <Context.Provider value={{ state, dispatch }}>
         <Prompt />
         <div id="wrapper">
            { children }
         </div>
      </Context.Provider>
   );
}

export {
   Context,
   Provider
}