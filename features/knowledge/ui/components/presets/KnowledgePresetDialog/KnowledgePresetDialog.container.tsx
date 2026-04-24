'use client'

import { useState } from 'react'
import { toast } from '@/ui'

import { useSmartKnowledge } from '@/features/knowledge/application/useSmartKnowledge'
import { KnowledgePresetDialogView } from './KnowledgePresetDialog.view'

export function useKnowledgeDialog() {
  const [open, setOpen] = useState(false)
  const [sourceId, setSourceId] = useState<string | undefined>()

  function openDialog(id?: string) {
    setSourceId(id)
    setOpen(true)
  }

  function closeDialog() {
    setOpen(false)
    setSourceId(undefined)
  }

  return {
    open,
    sourceId,
    openDialog,
    closeDialog,
  }
}

export function KnowledgePresetDialogContainer({
  open,
  onClose,
  sourceId,
}: {
  open: boolean
  onClose: () => void
  sourceId?: string
}) {
  const { addKnowledge, isAdding } = useSmartKnowledge()

  async function handleSubmit(data: {
    title?: string
    content: string
  }) {
    try {
      const finalContent = data.title
        ? `${data.title}\n\n${data.content}`
        : data.content

      await addKnowledge(finalContent, sourceId)

      toast.success('Knowledge added')
      onClose()
    } catch {
      toast.error('Failed to save')
    }
  }

  return (
    <KnowledgePresetDialogView
      open={open}
      onOpenChange={(v) => !v && onClose()}
      onSubmit={handleSubmit}
      isLoading={isAdding}
    />
  )
}