import {
 MessageAuthorType
} from './message.types'

export type MessageAuthor={

 name:string

 type:MessageAuthorType

}

/* ---------------------------
 Author classification
--------------------------- */

export function isHumanAuthor(
 author:MessageAuthor
){
 return author.type===
  MessageAuthorType.HUMAN
}

export function isAIAuthor(
 author:MessageAuthor
){
 return author.type===
  MessageAuthorType.AI
}

export function isSystemAuthor(
 author:MessageAuthor
){
 return author.type===
  MessageAuthorType.SYSTEM
}

/* ---------------------------
 Display helpers
--------------------------- */

export function getAuthorDisplayName(
 author:MessageAuthor
){

 if(author.name)
  return author.name

 if(
  author.type===
  MessageAuthorType.AI
 ){
  return 'AI'
 }

 if(
  author.type===
  MessageAuthorType.SYSTEM
 ){
  return 'System'
 }

 return 'Unknown'
}

/* ---------------------------
 Safety helpers
--------------------------- */

export function normalizeAuthor(

 author?:Partial<MessageAuthor>

):MessageAuthor{

 return{

  name:
    author?.name ||
    'Unknown',

  type:
    author?.type ||
    MessageAuthorType.HUMAN

 }

}