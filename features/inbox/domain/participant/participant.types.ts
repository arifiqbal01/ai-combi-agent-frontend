export const ParticipantTransportRole = {

 FROM:'from',

 TO:'to',

 CC:'cc',

 BCC:'bcc'

} as const

export type ParticipantTransportRole =
 typeof ParticipantTransportRole[
  keyof typeof ParticipantTransportRole
 ]

export const ParticipantIdentityRole = {

 AGENT:'agent',

 CUSTOMER:'customer'

} as const

export type ParticipantIdentityRole =
 typeof ParticipantIdentityRole[
  keyof typeof ParticipantIdentityRole
 ]

export type ParticipantRole =

 | ParticipantTransportRole

 | ParticipantIdentityRole

export type Participant={

 address:string

 role:ParticipantRole

 name?:string

}