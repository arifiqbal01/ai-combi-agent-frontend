import { useState } from 'react'

import { sendMessage } from '@/features/inbox/infrastructure/api/message.api'
import { ReplyMessageParams } from '../types/conversation.actions'

import { mapAttachments } from './conversation.actions.mapper'
import { queryClient } from '@/core/providers/query-provider'

export function useReplyMessage(){

  const [replying, setReplying] = useState(false)

  async function execute({
    conversationId,
    replyToMessageId,
    body,
    attachments = [],
    clientId
  }: ReplyMessageParams){

    console.log('🟩 REPLY: start', {
      conversationId,
      replyToMessageId,
      bodyLength: body?.length,
      hasBody: !!body?.trim(),
    })

    if(!conversationId){
      console.warn('❌ REPLY blocked: missing conversationId')
      return null
    }

    if(!body?.trim()){
      console.warn('❌ REPLY blocked: empty body')
      return null
    }

    if(!replyToMessageId){
      console.warn('⚠️ REPLY without replyToMessageId → backend decides behavior')
    }

    setReplying(true)

    try{
      const payload = {
        body,
        reply_to_message_id: replyToMessageId,
        client_id: clientId || crypto.randomUUID(),
        attachments: mapAttachments(attachments)
      }

      console.log('🟩 REPLY: calling API', payload)

      const response = await sendMessage(
        conversationId,
        payload
      )

      console.log('✅ REPLY: success', response)

      await queryClient.invalidateQueries({
        queryKey: ['conversation', conversationId]
      })

      console.log('🔄 REPLY: query invalidated')

      return response
    }
    catch(err){
      console.error('❌ REPLY: API error', err)
      throw err
    }
    finally{
      setReplying(false)
      console.log('🟩 REPLY: finished')
    }
  }

  return {
    execute,
    replying
  }
}