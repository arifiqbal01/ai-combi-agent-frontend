import { useState } from 'react'

import { sendMessage } from '@/features/inbox/infrastructure/api/message.api'
import { SendMessageParams } from '../types/conversation.actions'

import { mapAttachments } from './conversation.actions.mapper'
import { queryClient } from '@/core/providers/query-provider'

export function useSendMessage(){

  const [sending, setSending] = useState(false)

  async function execute({
    conversationId,
    body,
    subject,
    channelAccountId,
    participants = [],
    attachments = [],
    clientId
  }: SendMessageParams){

    console.log('🟦 SEND: start', {
      conversationId,
      bodyLength: body?.length,
      hasBody: !!body?.trim(),
    })

    if(!conversationId){
      console.warn('❌ SEND blocked: missing conversationId')
      return null
    }

    if(!body?.trim()){
      console.warn('❌ SEND blocked: empty body')
      return null
    }

    setSending(true)

    try{
      const payload = {
        channel_account_id: channelAccountId,
        body,
        subject,
        participants,
        client_id: clientId || crypto.randomUUID(),
        attachments: mapAttachments(attachments)
      }

      console.log('🟦 SEND: calling API', payload)

      const response = await sendMessage(
        conversationId,
        payload
      )

      console.log('✅ SEND: success', response)

      await queryClient.invalidateQueries({
        queryKey: ['conversation', conversationId]
      })

      console.log('🔄 SEND: query invalidated')

      return response
    }
    catch(err){
      console.error('❌ SEND: API error', err)
      throw err
    }
    finally{
      setSending(false)
      console.log('🟦 SEND: finished')
    }
  }

  return {
    execute,
    sending
  }
}