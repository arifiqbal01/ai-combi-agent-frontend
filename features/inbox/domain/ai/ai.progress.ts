/* =========================================================
   AI Progress + Stage UX Helper
   ========================================================= */

type Params = {
  stage?: string
  backendProgress?: number
  localProgress: number
}

/* ---------------------------
 Stage → User-safe label
--------------------------- */

export function getAIStageLabel(stage?: string): string {
  switch (stage) {
    case 'created':
      return 'Starting…'
    case 'classified':
      return 'Understanding message…'
    case 'decided':
      return 'Planning response…'
    case 'researched':
      return 'Gathering context…'
    case 'retrieved':
      return 'Fetching data…'
    case 'drafted':
      return 'Writing reply…'
    case 'guarded':
      return 'Checking safety…'
    case 'scored':
      return 'Evaluating quality…'
    case 'finalized':
      return 'Finalizing…'
    default:
      return 'Processing…'
  }
}

/* ---------------------------
 Merge backend + local progress
--------------------------- */

export function resolveAIProgress({
  backendProgress,
  localProgress
}: Params): number {

  const safeBackend = backendProgress ?? 0

  return Math.max(
    safeBackend,
    localProgress
  )
}

/* ---------------------------
 Smooth local progress increment
--------------------------- */

export function getNextLocalProgress(
  current: number
): number {

  if (current >= 90) return current

  return current + Math.random() * 4
}