'use client'

import { useInboxContext } from '../context/inbox-context'

export function useInboxSelection(){
  return useInboxContext()
}