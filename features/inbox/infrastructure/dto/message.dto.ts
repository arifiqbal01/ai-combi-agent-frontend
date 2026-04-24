/* infrastructure/dto/message.dto.ts */

export type MessageDirectionDTO =
 | 'inbound'
 | 'outbound'

export type ActorTypeDTO =
 | 'human'
 | 'ai'
 | 'system'

export type MessageAttachmentDTO={

 id:string

 file_name:string

 mime_type:string

 file_size:number

 storage_key:string

}

export type MessageDTO={

 id:string

 client_id?:string | null

 direction:MessageDirectionDTO

 /* canonical HTML */
 body:string | null

 /* text */
 body_text?:string | null

 preview?:string | null

 sender?:string | null

 actor_type?:ActorTypeDTO | null

 actor_id?:string | null

 timestamp:string

 /* NEW */
 delivery_status?:
  | 'pending'
  | 'sent'
  | 'delivered'
  | 'read'
  | 'failed'

 attachments:MessageAttachmentDTO[]

}

export type MessageResponseDTO={

 message_id:string
 client_id?:string | null

 delivery_status:
  | 'pending'
  | 'sent'
  | 'delivered'
  | 'read'
  | 'failed'

}