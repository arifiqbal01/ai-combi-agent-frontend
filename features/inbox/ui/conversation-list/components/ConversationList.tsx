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

  const list = useMemo(
    () => items.map(mapConversationToListVM),
    [items]
  )

  useEffect(() => {
    if (!mounted) return
    if (!isReady) return
    if (loading) return
    if (selectedConversationId) return
    if (!list.length) return

    const isDesktop = window.matchMedia('(min-width: 768px)').matches
    if (!isDesktop) return

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
      flex-col
      h-full
      min-h-0
      min-w-0
    ">

      <ConversationListHeader onRefresh={refresh} />

      {/* 🔥 FORCE SCROLL HERE */}
      <div
        className="
          flex-1
          min-h-0
          overflow-y-auto
          overscroll-contain
        "
      >

        {!mounted && <ConversationListLoading />}

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