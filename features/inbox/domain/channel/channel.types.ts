/* domain/channel/channel.types.ts */

export const ChannelType = {

 EMAIL:'email',

 WHATSAPP:'whatsapp',

 SLACK:'slack',

 INSTAGRAM:'instagram',

 SYSTEM:'system'

} as const

export type ChannelType =
 typeof ChannelType[
  keyof typeof ChannelType
 ]