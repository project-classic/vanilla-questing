import React, { useContext } from 'react';
import { Context } from "../context";

import EventListener from 'react-event-listener';
import { key_listener } from '../funcs/browsing';

import '../interface/css/innerbody.scss';

import Message from '../components/message';
import Map from '../components/map';
import Panel from '../components/panel';

function Home() {
   
   // GLOBAL CONTEXT
   const { state, dispatch } = useContext(Context);

   // KEYBOARD EVENT LISTENER
   const key_event = (event) => {
      key_listener(event, state, dispatch)
   }

   // IF DATA HAS BEN LOADED
   if (state.data !== null) {
      return (
         <div id={ 'innerbody' }>
            <EventListener
               target={ document }
               onKeyDown={ key_event }
            />
            <Message />
            <div className={ 'inner' }>
               <div id={ 'map-wrapper' }>
                  <Map />
               </div>
               <div id={ 'panel-wrapper' }>
                  <Panel />
               </div>
            </div>
         </div>
      )
   
   // OTHERWISE, RETURN NOTHING
   } else { return null; }
}

export default Home;