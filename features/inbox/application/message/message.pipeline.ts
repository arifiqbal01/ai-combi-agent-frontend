// features/inbox/application/message/message.pipeline.ts
import { Message } from '@/features/inbox/domain/message'

import { enhanceMessage } from './message.normalizer'

/*
 Pipeline stages (future scalable):

 normalize → structure → classify → enrich
*/

export function processMessage(
 message:Message
):Message{

 let processed=message

 /* Stage 1: normalization */

 processed = enhanceMessage(processed)

 /* Future stages */

 /*
 processed =
  detectSignature(processed)

 processed =
  detectNewsletter(processed)

 processed =
  classifyMessage(processed)
 */

 return processed

}

export function processMessages(
 messages:Message[]
){

 if(!messages?.length)
  return []

 return messages.map(
  processMessage
 )

}