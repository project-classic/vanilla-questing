import React from 'react';
import '../interface/css/docs.scss';

import Primary from '../components/docs/primary';
import Secondary from '../components/docs/secondary';
import Paragraph from '../components/docs/paragraph';
import Table from '../components/docs/table';

function Manifesto() { return (
   <div id={ 'docs' }>
      <div id={ 'inner' }>
         <Primary header={ 'Introduction' } id={ 'intro' }>
            <Paragraph>
               Greetings! This is a web-based quest helper for Vanilla/Classic World of Warcraft. The application takes a <a href='https://github.com/wickstjo/vanilla-questing/blob/master/src/routes/alliance/human.json' target="_blank" rel="noopener noreferrer">handwritten JSON file</a> (that contains a route) and parses it to an easy to follow guide with dynamically rendered maps, directions and objective/quest logs.
            </Paragraph>
            <Paragraph>
               It was originally intended for quest routing in mind, but can be used for anything map and coordinate related and uses the same metrics that the game does. The route files were designed with flexibility and precision in mind so even large sweeping changes are easy to implement while machine auditing makes sure that every quest has an appropriate start and conclusion.
            </Paragraph>
            <Secondary header={ 'Design Philosophy' } id={ 'design' }>
               <Paragraph>
                  Leveling efficiently from start to finish involves you completing 850-900 unique quests with weird interconnected requirements and is above everything else, a marathon. Contrary to popular belief, there are plenty of quests available but they need to be completed in a rough sequence in order to unlock a sufficient amount simultaneously that then can be completed with a few efficient loops around the zone.
               </Paragraph>
               <Paragraph>
                  Whether you’re planning on playing every waking hour or not, having a thought through plan and therefore being able to schedule very contested zones like STV outside of your servers primetime will likely cut your leveling time in half.
               </Paragraph>
            </Secondary>
            <Secondary header={ 'Volatility at Low Levels' } id={ 'volatility' }>
               <Paragraph>
                  The lower level you are, the easier it is to accidentally outlevel content and royally screw yourself and have no other recourse than grinding monsters for experience. Just because a quest is available doesn’t mean it should be on your direct agenda.
               </Paragraph>
               <Paragraph>
                  Zones tend to be divided into 1-3 sectors with very different level ranges and you should wait until you have a critical mass of quests for a specific sector in order to not have to make the time consuming trip multiple times. People who fully complete the closest available zone will shoot up in levels at the start, but rest assured that they will peak before duskwood and likely stop playing entirely because they ran out of quests everywhere.
               </Paragraph>
            </Secondary>
            <Secondary header={ 'Skipping Content' } id={ 'skipping' }>
               <Paragraph>
                  Skipping quests for reasons that are in your control is a bad idea. There’s a plethora of wonky and awkward quests in Vanilla but skipping too many of them just because you don’t like them adds up over time. Quests and zones that are universally liked are always either occupied or terrorized (think pirates in Tanaris) and going there might be a complete waste of your time. On live servers you’ll run into this issue all the time and want to have a safetynet in order to not miss experience breakpoints. Attempt everything once and evaluate your situation when a problem arises.
               </Paragraph>
            </Secondary>
            <Secondary header={ 'Grouping is Fun' } id={ 'grouping' }>
               <Paragraph>
                  Being penalized while grouping used to be the norm and something only those with tons of rested experience could partake in. Quest items aren’t shared between party members so those should always be completed alone, but for kill quests I  would go as far as to even suggest partying. You’ll be clearing zones so thoroughly that the reduction in experience from kills every now and then won’t come close to the gains you’ll make from smashing through kill quests quicker.
               </Paragraph>
            </Secondary>
            <Secondary header={ 'Focusing on Reputation' } id={ 'reputation' }>
               <Paragraph>
                  Quests that award reputation have very harsh diminishing returns and should therefore be completed while you’re within level range. Starting zones grant a massive amount of reputation so players who don’t want to spend gold on runecloth should migrate to the correct factions starting area immediately. Humans gain 10% more reputation than others and have a very real chance of reaching exalted before level 40.
               </Paragraph>
               <Paragraph>
                  Every human route I’ve ran has reached exalted with Darnassus from the same quest at level 48. Running the night-elf route instead rewards you with an additional <i>9791</i> reputation and completing the four Blackfathom Deeps dungeon quests bumps that number up by another <i>1725</i> which adds up to a total of <i>11516</i> extra reputation with Darnassus. Whether that’s enough to reach exalted before level 40 depends entirely on how accurate private server values are. If you're playing on a PVE server and want to exhaust all sources of Darnassus reputation, do the quests in Stonetalon after western Ashenvale.
               </Paragraph>
            </Secondary>
         </Primary>
         <Primary header={ `Features` } id={ `features` }>
            <Paragraph>
               The entire application is written in React and hosted via Github pages. The route files are very self explanatory and you don't need to be a programmer to write one yourself. Everything is open-source and viewable from the <a href="https://github.com/wickstjo/vanilla-questing" target="_blank" rel="noopener noreferrer">github repository</a>. There are no backend components or cookies being used.
            </Paragraph>
            <Secondary header={ `Saving Your Progress` } id={ `storage` }>
               <Paragraph>
                  There is no traditional backend component like a database for storage. Everything runs locally and your profiles are saved to your <a href="https://blog.logrocket.com/the-complete-guide-to-using-localstorage-in-javascript-apps-ba44edb53a36" target="_blank" rel="noopener noreferrer">browsers localstorage</a>. The string is only a few kilobytes in size and snapshots your character progress, which the application then parses, uses and updates. Only you have access to this information.
               </Paragraph>
            </Secondary>
            <Secondary header={ `Smaller Devices` } id={ `smaller-devices` }>
               <Paragraph>
                  The application is designed to be used on a desktop but should stretch and function normally on any device with a reasonable resolution. When the resolution changes or you browse to another block, the map will automatically center around the average coordinate. I suggest dedicating half of your monitor to the application and half to youtube/twitch or whatever your preferred distraction is.
               </Paragraph>
            </Secondary>
            <Secondary header={ `Custom Routes` } id={ `custom-routes` }>
               <Paragraph>
                  Everything has been built with flexibility in mind and virtually anything that’s map related can be written and rendered. If you want to write custom mining or herbing routes and only share them with your friends then go right ahead.
               </Paragraph>
               <Paragraph>
                  Assembling all the correct quest IDs is obnoxious and has been streamlined for you so that the application appends on the correct IDs depending on which faction you pick. If something is missing, message me and I'll fix it. If your route isn't quest related, your faction makes no difference.
               </Paragraph>
            </Secondary>
            <Secondary header={ `Preloading Backgrounds` } id={ `preloading` }>
               <Paragraph>
                  Loading images of zones is the most bandwidth intense part of the ordeal. They’re around 2.5MB in size each and there’s around 45 zones in total. Google Chrome is decent at caching and remembering data that you’ve viewed before, but Firefox refuses to do it. While I look into finding a fix for Firefox, consider using Chrome and preloading everything if the “flickering” becomes annoying and your download speed isn’t absurd.
               </Paragraph>
            </Secondary>
            <Secondary header={ `Key Bindings` } id={ `bindings` }>
               <Paragraph>
                  For browsing back and forward, you can choose between using <i>A and D</i> or the <i>Arrowkeys</i>. To quickly open the reference overview, use <i>Q</i>. To close any prompt, use <i>Escape</i>. For the time being there is no way to customize these, but rest assured that the feature is coming.
               </Paragraph>
            </Secondary>
            <Secondary header={ `Graphics` } id={ `graphics` }>
               <Paragraph>
                  I'm certainly not a graphic designer but having icons and backgrounds is preferable than staring at a gray page. I would like to thank Teeb of <a href="https://barrens.chat/" target="_blank" rel="noopener noreferrer">barrens.chat</a> for extracting high quality icons from the original game and providing a <a href="https://barrens.chat/viewtopic.php?f=5&t=901" target="_blank" rel="noopener noreferrer">downloadable package</a> to use in projects like this.
               </Paragraph>
            </Secondary>
            <Secondary header={ `Reducing Pickup Time` } id={ `questie` }>
            <Paragraph>
                  It’s very hard to indicate where exactly the quests I want you to pick up are in hubs like Lakeshire that contains a multitude of both high and low level quests in close proximity. I suggest using the <a href="https://willitclassic.com/view/zN3cdlIhnmtCjOwOnH8q" target="_blank" rel="noopener noreferrer">ingame addon Questie</a> to get minimap markers in order to speed up the process of picking up and returning the correct quests with minimal downtime. Try the following questie configs:
               </Paragraph>
               <Paragraph>
                  /questie setminlevel 15<br />
                  /questie resizemap
               </Paragraph>
            </Secondary>
         </Primary>
         <Primary header={ `Contribute` } id={ `contribute` }>
            <Paragraph>
               I’m always looking to better the product. If you encounter bugs, inconsistencies or something that’s blatantly wrong, feel free to contact me via your preferred medium. If you would like to contribute, monetarily or otherwise, you can do that too. Thank you!
            </Paragraph>
            <Table data={[
               ['PayPal', 'Jfwick@gmail.com'],
               ['Discord', 'Strafir#9133'],
               ['Battle.net', 'Strafir#2132'],
               ['Reddit', 'Wickstjo'],
               ['Github', 'Wickstjo']
            ]}/>
         </Primary>
      </div>
   </div>
)}

export default Manifesto;