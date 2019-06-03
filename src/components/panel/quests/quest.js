import React from 'react';
import { shorten } from '../../../funcs/misc';

function Quest({ quest, quests }) {

   // GENERATE ROW
   const row = () => {
      if (quest instanceof Array) {
         return <Multi
            header={ quest[0] }
            tag={ quest[1] }
            quests={ quests }
         />

      } else {
         return <Single
            header={ quest }
            quests={ quests }
         />
      }
   }

   return (
      <div className="quest">
         { row() }
      </div>
   )
}

function test(quest, quests) {
   for (var key in quests) {
      // console.log(quests[key])
      if (quests[key]["name"].toString().toLowerCase() === quest.toString().toLowerCase()) {
         console.log(key)
         return key
      }
   }

   return '0'
}

// DEFAULT BLOCK
function Single({ quests, header }) { return (
   <div><a href={ 'https://classicdb.ch/?quest=' + test(header, quests) } target='_blank' rel='noopener noreferrer'>
      { shorten(header) }
   </a></div>
)}

// MULTI HEADER BLOCK
function Multi({ quests, header, tag }) { return (
   <div className="split">
      <div><a href={ 'https://classicdb.ch/?quest=' + test(header, quests) } target='_blank' rel='noopener noreferrer'>
         { shorten(header) }
      </a></div>
      <div>{ tag }</div>
   </div>
)}

export default Quest;