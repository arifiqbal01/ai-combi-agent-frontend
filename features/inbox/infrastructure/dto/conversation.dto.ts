export type ConversationListItemDTO={

 id:string

 sender:string

 subject:string | null

 preview:string | null

 last_message_at:string

 unread_count:number

 channel_type:string

 channel_account:string

}

export type ConversationListResponseDTO={

 conversations:ConversationListItemDTO[]

 limit:number

 offset:number

 total:number | null

}

export type ConversationDetailDTO={

 id:string

 sender:string

 subject:string | null

 channel_account_id:string

 channel_type:string

 channel_account:string

 unread_count:number

 last_message_at:string

 messages:any[]

}