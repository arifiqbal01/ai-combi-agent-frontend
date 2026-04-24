import {

 Participant,

 ParticipantTransportRole,

 ParticipantIdentityRole

} from './participant.types'

export function getPrimaryParticipant(

 participants:Participant[]

):Participant | undefined{

 return participants?.[0]

}

export function getParticipantName(

 p:Participant

):string{

 return (

  p.name ||

  p.address

 )

}

/* ---------------------------
 role helpers
--------------------------- */

export function isFromParticipant(

 p:Participant

):boolean{

 return (

  p.role===

  ParticipantTransportRole.FROM

 )

}

export function isAgentParticipant(

 p:Participant

):boolean{

 return (

  p.role===

  ParticipantIdentityRole.AGENT

 )

}

export function isCustomerParticipant(

 p:Participant

):boolean{

 return (

  p.role===

  ParticipantIdentityRole.CUSTOMER

 )

}