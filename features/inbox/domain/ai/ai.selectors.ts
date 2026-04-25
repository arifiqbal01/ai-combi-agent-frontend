/* domain/ai/ai.selectors.ts */

import {
  AISuggestion
} from './ai.types'

import {
  shouldDisplaySuggestion
} from './ai.rules'

/* =========================
   TYPES
========================= */

export type AISuggestionView = {
  id: string
  content: string
  confidence: number
  confidencePercent: number
  createdAt: string
}

/* =========================
   SELECTORS
========================= */

export function selectLatestSuggestion(
  suggestion: AISuggestion | null
): AISuggestionView | null {

  if (!suggestion) return null

  if (!shouldDisplaySuggestion(suggestion)) {
    return null
  }

  return {
    id: suggestion.id,
    content: suggestion.content,
    confidence: suggestion.confidence,
    confidencePercent: suggestion.confidencePercent,
    createdAt: suggestion.createdAt
  }
}

export function getSuggestionConfidence(
  suggestion: AISuggestion | null
): number {

  return suggestion?.confidencePercent ?? 0
}

export function hasSuggestion(
  suggestion: AISuggestion | null
): boolean {

  return suggestion !== null
}

export function isHighConfidence(
  suggestion: AISuggestion | null
): boolean {

  return (suggestion?.confidence ?? 0) >= 0.75
}