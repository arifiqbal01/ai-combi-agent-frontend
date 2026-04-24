'use client'

import { useEffect, useMemo, useState } from 'react'

import {
  useConversationList
} from '@/features/inbox/application/conversation/list/hooks'

import {
  mapConversationToListVM
} from '@/features/inbox/application/conversation/view/models/conversation.list.vm'

import {
  ConversationListItem
} from './ConversationListItem'

import {
  ConversationListHeader
} from './ConversationListHeader'

import {
  ConversationListEmpty
} from '../ui/ConversationListEmpty'

import {
  ConversationListLoading
} from '../ui/ConversationListLoading'

import { useInboxContext } from '../../context/inbox-context'

export function ConversationList() {

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const {
    items,
    loading,
    isReady,
    isEmpty,
    refresh
  } = useConversationList()

  const {
    selectedConversationId,
    selectConversation
  } = useInboxContext()

  /* view models */
  const list = useMemo(
    () => items.map(mapConversationToListVM),
    [items]
  )

  /* auto select first */
  useEffect(() => {
    if (!mounted) return
    if (!isReady) return
    if (loading) return
    if (selectedConversationId) return
    if (!list.length) return

    selectConversation(list[0].id)

  }, [
    list,
    loading,
    isReady,
    mounted,
    selectedConversationId,
    selectConversation
  ])

  return (
    <section className="
      flex
      h-full
      flex-col
      min-w-0
    ">

      <ConversationListHeader
        onRefresh={refresh}
      />

      <div className="
        flex-1
        overflow-y-auto
      ">

        {/* 🔥 HYDRATION-SAFE RENDER FLOW */}

        {!mounted && (
          <ConversationListLoading />
        )}

        {mounted && (!isReady || loading) && (
          <ConversationListLoading />
        )}

        {mounted && isReady && !loading && isEmpty && (
          <ConversationListEmpty />
        )}

        {mounted && isReady && !loading && !isEmpty && list.map(item => (
          <ConversationListItem
            key={item.id}
            item={item}
            active={item.id === selectedConversationId}
            onClick={() => selectConversation(item.id)}
          />
        ))}

      </div>

    </section>
  )
}