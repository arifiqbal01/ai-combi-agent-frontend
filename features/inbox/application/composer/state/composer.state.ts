// composer.state.ts

import {
 ComposerState
}
from '../composer.types'

import {
 MessagePolicy
}
from '@/features/inbox/domain/message/message.policy'

export function createComposerState(

 policy:MessagePolicy,

 context:any

):ComposerState{

 return{

  editor:null,

  attachments:[],

  emojiOpen:false,

  expanded:false,

  sending:false,

  policy,

  context

 }

}