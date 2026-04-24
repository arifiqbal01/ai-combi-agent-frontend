import { InboxConversationDetail }
from '../types'

import { InboxMessageItem }
from '../types'

export function mergeMessage(

  conversation:InboxConversationDetail,

  message:InboxMessageItem

):InboxConversationDetail{

  return{

    ...conversation,

    messages:[

      ...conversation.messages.filter(

        m=>m.id!==message.id

      ),

      message

    ]

  }

}

export function updateConversation(

  conversation:InboxConversationDetail,

  updates:Partial<InboxConversationDetail>

):InboxConversationDetail{

  return{

    ...conversation,

    ...updates

  }

}

export function updateUnread(

  conversation:InboxConversationDetail,

  unreadCount:number

):InboxConversationDetail{

  return{

    ...conversation,

    unread_count:unreadCount

  }

}