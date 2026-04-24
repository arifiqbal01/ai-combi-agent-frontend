'use client'

import { useInboxContext }
from './inbox-context'

export function useInboxSelection(){

  return useInboxContext()

}