import { Message }
from '../message/message.types'

import { buildTimeline }
from './timeline.service'

export function groupMessages(
 messages:Message[]
){

 return buildTimeline(
  messages
 )

}