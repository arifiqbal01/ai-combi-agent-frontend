import { ComposerState }
from '../composer.types'

export function toggleEmoji(

 state:ComposerState

){

 return{

  ...state,

  emojiOpen:
   !state.emojiOpen

 }

}

export function toggleExpand(

 state:ComposerState

){

 return{

  ...state,

  expanded:
   !state.expanded

 }

}