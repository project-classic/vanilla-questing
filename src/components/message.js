import React, { useContext, useEffect } from 'react';
import { Context } from "../context";

import { sleep } from "../funcs/misc";
import '../interface/css/message.scss';

function Message() {

   // GLOBAL STATE
   const { state, dispatch } = useContext(Context);

   // TOGGLE VISIBILITY BASED ON STATE
   useEffect(() => {
      if (state.message.visible) {

         // CHANGE DISPLAY TO FLEX
         document.getElementById('message').style.display = 'flex';

         // WAIT 100MS, THEN TURN ON OPACITY
         sleep(100).then(() => {
            document.getElementById('message').style.opacity = 1;

            // SHOW THE MESSAGE FOR 3 SECONDS
            sleep(3000).then(() => {
               document.getElementById('message').style.opacity = 0;

               // WAIT 300MS FOR OPACITY TO GRADUALLY FADE
               sleep(300).then(() => {

                  // CHANGE DISPLAY TO NONE
                  document.getElementById('message').style.display = 'none';

                  // UPDATE STATE
                  dispatch({ type: 'hide-message' })
               });
            });
         });
      }
   }, [state.message.visible]);

   return (
      <div id={ 'message' }>
         <span id={ 'inner' } className={ state.message.type }>{ state.message.value }</span>
      </div>
   )
}

export default Message;