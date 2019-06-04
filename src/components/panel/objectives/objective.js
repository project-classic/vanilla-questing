import React from 'react';
import { shorten } from '../../../funcs/misc';

function Objective({ index, quests, waypoint }) {

   // GENERATE CONTENT
   function content() {
      const types = ['ends', 'completed', 'starts', 'objectives', 'special'];
      let content = [];

      waypoint.objectives.forEach(objective => {
         content.push(process({
            questName: objective.quest,
            id: objective.id,
            type: objective.type,
            description: objective.description,
         }))
      })

      // PROCESS EACH TYPE & RECALIBRATE STATE
      // types.forEach(type => {
      //    if (waypoint[type] !== undefined) {
      //       content.push(process({
      //          data: waypoint[type],
      //          type: type,
      //       }))
      //    }
      // });

      return content;
   }

   // PROCESS CONTENT
   function process({ questName, id, type, description }) {
      // return (
      //    <div key={} className={type}>
      //       {row(questName, id, type, description)}
      //    </div>
      // )
      if (type === 'note') {
         return (
            <div className={type}>
               <div>{description}</div>
            </div>
         )
      } else {
         // DEFAULTS
         return (
            <div className={type}>
               <Single
               questName={ questName }
               id={ id }
               quests={ quests }
               />
            </div>
         )
      }

      // return data.map((header, index) =>
      //    <div key={ index } className={ type }>
      //       { row(header, type) }
      //    </div>
      // );
   }
   
   // GENERATE APPROPRIATE ROW
   const row = (questName, id, type, description) => {

      // SPECIALS
      // if (type === 'special') {
      //    if (header instanceof Array) {
      //       return <div><a href={ header[1] } target="_blank" rel="noopener noreferrer">{ header[0] }</a></div>
      //    } else {
      //       return <div>{ header }</div>
      //    }
   
      // // ARRAYS
      // } else if (header instanceof Array) {
      //    return <Multi
      //       header={ header[0] }
      //       tag={ header[1] }
      //       quests={ quests }
      //    />
   
      if (type === 'note') {
         return <div>{description}</div>
      } else {
         // DEFAULTS
         return <Single
            questNname={ questName }
            id={ id }
            quests={ quests }
         />
      }
   }

   return (
      <div className="section">
         <div className="title">
            <div>{ index + 1 }. { waypoint.header }</div>
            <div>{ waypoint.coords.x + '.' + waypoint.coords.y }</div>
         </div>
         { content() }
      </div>
   )
}

function test(quest, id, quests) {
   if (id !== null) {
      return id
   } else {
      for (var key in quests) {
         if (quests[key]["name"].toString().toLowerCase() === quest.toString().toLowerCase()) {
            return key
         }
      }
   }

   return '0'
}

// DEFAULT BLOCK
function Single({questName, id, quests}) {
   
   // if (quests[header.toString().toLowerCase()] === undefined) {
   //    console.log(header);
   // }

   console.log(questName)

   return (
      <div>
         <a href={ 'https://classicdb.ch/?quest=' + test(questName, id, quests) } target='_blank' rel='noopener noreferrer'>{ shorten(questName) }</a>
      </div>
   )
}

// MULTI HEADER BLOCK
function Multi({ quests, header, tag }) {
   
   if (quests[header.toString().toLowerCase()] === undefined) {
      console.log(header);
   }
   
   return (
      <div className="split">
         <div><a href={ 'https://classicdb.ch/?quest=' + test(header, quests) } target='_blank' rel='noopener noreferrer'>{ shorten(header) }</a></div>
         <div>{ tag }</div>
      </div>
   )
}

export default Objective;