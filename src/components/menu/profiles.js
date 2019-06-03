import React, { useContext } from 'react';
import { Context } from "../../context";
import { specific } from '../../funcs/build';

// ALL PROFILES
function Profiles({ hide }) {

   // ROUTE STATE
   const { state, dispatch } = useContext(Context);

   // REMOVE PROFILE
   const remove = (name) => {

      // REMOVE PROFILE FROM PROFILES HASHMAP
      state.profiles.delete(name);

      // UPDATE STORAGE
      dispatch({
         type: 'update_profiles',
         payload: state.profiles
      });

      // HIDE SUBMENU
      hide();
   }

   // OPEN PROFILE
   const open = (header, details) => {
         
      // LOAD ROUTE
      dispatch({
         type: 'load',
         payload: specific(details)
      })

      // MARK PROFILE AS LOADED
      dispatch({
         type: 'loaded',
         payload: header
      })

      // SHOW MESSAGE
      dispatch({
         type: 'show-message',
         payload: {
            type: 'good',
            value: 'profile "' + header + '" loaded'
         }
      })

      // HIDE SUBMENU
      hide();
   }

   // IF PROFILES HAVE LOADED
   if (state.profiles !== null && state.profiles.size !== 0) {

      // CONVERT TO MAPPABLE ARRAY
      const profiles = Array.from(state.profiles);

      // GENERATE & RETURN SELECTORS
      return profiles.map((item, index) =>
         <Profile
            key={ index }
            header={ item[0] }
            details={ item[1] }
            remove={ remove }
            open={ open }
            state={ state }
         />
      )

   // OTHERWISE, RETURN ERROR
   } else { return <div className="dead">No Profiles Found</div> }
}

// SINGLE PROFILE
function Profile({ header, details, open, remove, state }) {
   if (state.loaded === header) { return (
      <div className={ 'item' } id={ 'loaded' }>
         <div className={ 'icon' } id={ details.race } />
         <div className={ 'header' }>
            { header }
         </div>
         <div className={ 'loaded' }>Loaded</div>
      </div>
   )} else { return (
      <div className={ 'item' }>
         <div
            className={ 'icon' }
            id={ details.race }
            onClick={() => { open(header, details) }}
         />
         <div className={ 'header' } onClick={() => { open(header, details) }}>
            { header }
         </div>
         <div
            className={ 'action' }
            id={ 'remove' }
            onClick={() => { remove(header) }}
         />
      </div>
   )}
}

export default Profiles;