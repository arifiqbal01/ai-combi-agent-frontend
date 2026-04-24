'use client'

import { useState } from 'react'
import { Stack, Input, Textarea, Button } from '@/ui'

export function SimpleKnowledgeForm({
  onSubmit,
  loading,
}: {
  onSubmit: (data: { content: string }) => Promise<void>
  loading?: boolean
}) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  async function handleSubmit() {
    if (!content.trim() || loading) return

    const finalContent = title.trim()
      ? `${title.trim()}\n\n${content.trim()}`
      : content.trim()

    await onSubmit({
      content: finalContent,
    })

    setTitle('')
    setContent('')
  }

  return (
    <Stack gap="sm">
      <Input
        placeholder="Title (optional)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Textarea
        placeholder="Write knowledge..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSubmit()
          }
        }}
      />

      <Button
        loading={loading}
        disabled={!content.trim() || loading}
        onClick={handleSubmit}
      >
        Save
      </Button>
    </Stack>
  )
}