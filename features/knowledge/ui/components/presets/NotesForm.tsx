'use client'

import { TextForm } from './TextForm'

export function NotesForm({
 onSubmit,
}: {
 onSubmit: (value: string) => Promise<void>
}) {
 return <TextForm onSubmit={onSubmit} />
}