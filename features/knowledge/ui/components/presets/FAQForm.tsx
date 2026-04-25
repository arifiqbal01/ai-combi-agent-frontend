'use client'

import { useState } from 'react'

import {
  Stack,
  Text,
  Input,
  Button,
  Inline,
  toast,
} from '@/ui'

type FAQ = { q: string; a: string }

export function FAQForm({
  onSubmit,
}: {
  onSubmit: (data: FAQ[]) => Promise<void>
}) {
  const [items, setItems] = useState<FAQ[]>(([
    { q: '', a: '' },
  ]))

  const [loading, setLoading] = useState(false)

  function update(index: number, key: 'q' | 'a', value: string) {
    setItems(prev =>
      prev.map((item, i) =>
        i === index
          ? { ...item, [key]: value }
          : item
      )
    )
  }

  function addItem() {
    setItems(prev => [...prev, { q: '', a: '' }])
  }

  function removeItem(index: number) {
    if (items.length === 1) return
    setItems(prev => prev.filter((_, i) => i !== index))
  }

  async function handleSubmit() {
    const valid = items.filter(
      i => i.q.trim() && i.a.trim()
    )

    if (!valid.length) {
      toast.error('Add at least one FAQ')
      return
    }

    try {
      setLoading(true)
      await onSubmit(valid)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Stack gap="sm">

      <Text weight="medium">Add FAQs</Text>

      {items.map((item, i) => (
        <Stack key={i} gap="xs" className="border rounded-md p-2">

          <Input
            placeholder="Question"
            value={item.q}
            onChange={e => update(i, 'q', e.target.value)}
          />

          <Input
            placeholder="Answer"
            value={item.a}
            onChange={e => update(i, 'a', e.target.value)}
          />

          <Inline className="justify-end">
            <Button
              size="sm" // ✅ fixed
              variant="ghost"
              onClick={() => removeItem(i)}
            >
              Remove
            </Button>
          </Inline>

        </Stack>
      ))}

      <Inline>
        <Button variant="secondary" onClick={addItem}>
          Add more
        </Button>

        <Button onClick={handleSubmit} loading={loading}>
          Save
        </Button>
      </Inline>

    </Stack>
  )
}