/* infrastructure/dto/attachment.dto.ts */

export type UploadUrlRequestDTO={

  file_name:string

  mime_type:string

  file_size:number

  content_hash?:string

}

export type UploadUrlResponseDTO={

  upload_url:string

  storage_key:string

  file_name:string

  mime_type:string

  file_size:number

}

export type AttachmentDTO={

  id?:string

  file_name:string

  mime_type:string

  file_size:number

  storage_key:string

}

export type SendMessageParticipantDTO={

  address:string

  role:string

}

export type NewMessageRequestDTO={

  channel_account_id:string

  body:string

  subject?:string

  participants:SendMessageParticipantDTO[]

  attachments:AttachmentDTO[]

}

export type ReplyMessageRequestDTO={

  body:string

  reply_to_message_id:string

  attachments:AttachmentDTO[]

}