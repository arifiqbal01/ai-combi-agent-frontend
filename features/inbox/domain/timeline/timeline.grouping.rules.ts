/* domain/timeline/timeline.grouping.rules.ts */

import { Message } from '../message/message.types'

import {

 resolveMessageIdentity

} from '../message/message.identity'

const GROUP_WINDOW_MS=
 5 * 60 * 1000

export function canGroupMessages(

 current:Message,

 previous:Message

){

 if(!previous)
  return false

 const currentIdentity=
  resolveMessageIdentity(current)

 const prevIdentity=
  resolveMessageIdentity(previous)

 if(

  currentIdentity.variant !==
  prevIdentity.variant

 ){
  return false
 }

 if(

  currentIdentity.direction !==
  prevIdentity.direction

 ){
  return false
 }

 const currentTime=
  new Date(
   current.meta.createdAt
  ).getTime()

 const prevTime=
  new Date(
   previous.meta.createdAt
  ).getTime()

 return (

  currentTime-prevTime

 )<=GROUP_WINDOW_MS

}

export function isSameDay(

 current:Message,

 previous:Message

){

 if(!previous)
  return false

 return (

   new Date(current.meta.createdAt)
    .toDateString()

   ===

   new Date(previous.meta.createdAt)
    .toDateString()

 )

}